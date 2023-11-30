import * as React from "react";
import {
    Popover, FormGroup, Button, Toaster, Position, Tooltip,
    InputGroup, Alignment, FileInput, Dialog, Checkbox, Radio, RadioGroup, Intent
} from "@blueprintjs/core";
import * as DateTimePicker from 'react-datetime';
import * as moment from 'moment';
import {calculate_from_inputs, export_to_csv, load_from_csv} from "./Requests";
import {FormEvent, RefObject} from "react";
import {Card, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core/lib/cjs";
import {NumberInput} from "./NumberInput";
import {convert_string_to_moment, check_array_for_missing_values, pad} from "./utilities";
import {DeltaScatterChart, ExponentialDeltaScatterChart} from "./DeltaScatterChart";
import {DeltaUnits, LoadedCSVInputs} from "./types/CalculationInputs";

const DEUTERIUM = "Deuterium";
const OXYGEN = "Oxygen 18";
const ELEMENTS = [DEUTERIUM, OXYGEN];

const NUM_SAMPLE_TIMES = 6;
const NUM_DELTAS = 5;
const DEFAULT_EXPONENTIAL_SAMPLES = 11;
const DEFAULT_RQ = '0.85';
const DEFAULT_FAT_FREE_MASS_FACTOR = '0.73';
const NEW_ROWS = 4;
export const DATE_LABELS = ['Background', 'Dose', 'PDA', 'PDB', 'EDA', 'EDB'];
export const SAMPLE_LABELS = [DATE_LABELS[0]].concat(DATE_LABELS.slice(2, 6));

let DATE_VALIDITY_CHECK_TIMEOUT: any;

interface RCO2_RESULTS {
    rco2_mol_day: string[],
    rco2_l_hr: string[],
    ee_kcal_day: string[],
    ee_mj_day: string[]
}

interface BODY_COMP_RESULTS {
    body_water_avg_kg: string[],
    fat_free_mass_kg: string[],
    fat_mass_kg: string[],
    body_fat_percentage: string[]
}

export interface Results {
    results: {
        calculations: {
            ndp_kg: string[],
            kd_hr: string[],
            nop_kg: string[],
            ko_hr: string[],
            body_comp: {
                plat: BODY_COMP_RESULTS,
                int: BODY_COMP_RESULTS
            }
        }
        speakman2020: {
            rco2_ee_int: RCO2_RESULTS, rco2_ee_plat: RCO2_RESULTS
        }
        error_flags: {
            plateau_2h: string[],
            plateau_18O: string[],
            ds_ratio: string[],
            ee: string[],
            ko_kd: string[]
        }
    } | null
}

interface DLWState {
    input_csv_name: string;
    loaded_csv_inputs: LoadedCSVInputs[];
    loaded_csv_index: number;
    info_overlay_open: boolean;
    clear_popup_open: boolean;
    missing_data_popup_open: boolean;

    exponential: boolean;
    num_deltas: number;
    num_sample_times: number;
    delta_units: DeltaUnits;
    deuterium_deltas: string[],
    oxygen_deltas: string[],
    datetimes: moment.Moment[],
    dose_weights: string[],
    dose_enrichments: string[],
    rq: string,
    subject_weights: string[],
    dilution_space_ratio: string;
    fat_free_mass_factor: string;
    subject_id: string;
    mixed_dose: boolean;
    excluded_samples: boolean[];

    deuterium_deltas_validated: boolean,
    oxygen_deltas_validated: boolean,
    datetimes_validated: boolean,
    dose_weights_validated: boolean,
    dose_enrichments_validated: boolean,
    subject_weights_validated: boolean,
    minimum_dates: boolean,
    minimum_deuterium_deltas: boolean,
    minimum_oxygen_deltas: boolean,

    results: Results
    new_csv_name: string
    new_csv_url: string
    current_output: string|null
}

const AppToaster = Toaster.create({className: "app-toaster", position: Position.TOP_RIGHT});

export class DLWApp extends React.Component<any, DLWState> {
    now: moment.Moment;
    scroll_anchor_ref: RefObject<HTMLDivElement>;

    constructor(props: any) {
        super(props);
        this.now = moment();
        this.scroll_anchor_ref = React.createRef();
        this.state = {
            input_csv_name: "", info_overlay_open: false, clear_popup_open: false, missing_data_popup_open: false,
            loaded_csv_inputs: [], loaded_csv_index: 0,

            delta_units: DeltaUnits.permil,
            exponential: false, num_deltas: NUM_DELTAS, num_sample_times: NUM_SAMPLE_TIMES,
            deuterium_deltas: new Array(NUM_DELTAS).fill(""), oxygen_deltas: new Array(NUM_DELTAS).fill(""),
            datetimes: new Array(NUM_SAMPLE_TIMES).fill(this.now),
            dose_weights: ["", ""], dose_enrichments: ["", ""], rq: DEFAULT_RQ,
            mixed_dose: false,
            subject_weights: ["", ""], dilution_space_ratio: "", subject_id: "",
            fat_free_mass_factor: DEFAULT_FAT_FREE_MASS_FACTOR,
            excluded_samples: new Array(NUM_DELTAS).fill(false),

            deuterium_deltas_validated: false, oxygen_deltas_validated: false, datetimes_validated: false,
            dose_weights_validated: false, dose_enrichments_validated: false, subject_weights_validated: false,

            minimum_dates: false, minimum_deuterium_deltas: false, minimum_oxygen_deltas: false,

            results: {results: null}, new_csv_name: "", new_csv_url: "", current_output: null
        };
    }

    render() {
        let deuterium_values = this.state.deuterium_deltas.filter((v, i) => v != "" && !this.state.excluded_samples[i]).length;
        let oxygen_values = this.state.oxygen_deltas.filter((v: string, i) => v != "" && !this.state.excluded_samples[i]).length;
        let samples_validated = ((this.state.deuterium_deltas_validated || this.state.minimum_deuterium_deltas)
            && (this.state.oxygen_deltas_validated || this.state.minimum_oxygen_deltas)
            && (this.state.datetimes_validated || this.state.minimum_dates));
        if (this.state.exponential) {
            samples_validated = (this.state.datetimes[0] != this.now && this.state.deuterium_deltas[0] != ""
                && this.state.oxygen_deltas[0] != "" && deuterium_values >= NUM_DELTAS && oxygen_values >= NUM_DELTAS);
        }
        let all_inputs_validated = (samples_validated && this.state.dose_weights_validated
            && this.state.dose_enrichments_validated && this.state.subject_weights_validated && this.state.subject_id
            && deuterium_values == oxygen_values);

        let deuterium_delta_inputs: JSX.Element[] = [];
        let oxygen_delta_inputs: JSX.Element[] = [];
        let collection_time_inputs: JSX.Element[] = [];
        let include_checkboxes: JSX.Element[] = [];
        let add_rows_button = <div/>;
        let load_next_csv_row_button = <div/>;
        let load_prev_csv_row_button = <div/>;

        if (this.state.loaded_csv_inputs.length > 1) {
            load_next_csv_row_button = <Button className='load-new-csv-row-button' onClick={this.load_next_csv_row}
                                               disabled={this.state.loaded_csv_index == this.state.loaded_csv_inputs.length - 1}>LOAD
                                               NEXT ROW</Button>;
            load_prev_csv_row_button = <Button className='load-new-csv-row-button' onClick={this.load_previous_csv_row}
                                               disabled={this.state.loaded_csv_index == 0}>LOAD PREVIOUS ROW</Button>;
        }
        if (!this.state.exponential) {
            let d_deltas = this.state.deuterium_deltas.slice(0, NUM_DELTAS - 2).concat(this.state.deuterium_deltas.slice(-2));
            let o_deltas = this.state.oxygen_deltas.slice(0, NUM_DELTAS - 2).concat(this.state.oxygen_deltas.slice(-2));
            let times = this.state.datetimes.slice(0, NUM_SAMPLE_TIMES - 2).concat(this.state.datetimes.slice(-2));
            for (let i = 0; i < NUM_SAMPLE_TIMES; i++) {
                collection_time_inputs.push(
                    <DateTimePicker onChange={(value) => this.handle_date_change(i, value)}
                                    inputProps={{
                                        className: 'date-input-box .bp3-input',
                                        placeholder: ' ' + DATE_LABELS[i] + ' sample date and time',
                                        value: (times[i] === this.now) ? "" : times[i].format('YYYY-MM-DD HH:mm')
                                    }}
                                    key={i} value={times[i]} dateFormat="YYYY-MM-DD" timeFormat="HH:mm"/>
                );
            }
            for (let i = 0; i < NUM_DELTAS; i++) {
                deuterium_delta_inputs.push(
                    <NumberInput placeholder={SAMPLE_LABELS[i] + " Deuterium delta"} index={i} key={i}
                                 change_function={this.handle_deuterium_delta_change} unit={this.state.delta_units}
                                 value={d_deltas[i]}/>);
                oxygen_delta_inputs.push(
                    <NumberInput placeholder={SAMPLE_LABELS[i] + ' Oxygen 18 delta'} index={i} key={i} unit={this.state.delta_units}
                                 change_function={this.handle_oxygen_delta_change} value={o_deltas[i]}/>);
            }
        } else {
            for (let i = 0; i < this.state.num_sample_times; i++) {
                let placeholder = "Sample " + (i - 1);
                if (i == 0) {
                    placeholder = "Background";
                } else if (i == 1) {
                    placeholder = "Dose";
                }
                collection_time_inputs.push(
                    <DateTimePicker onChange={(value) => this.handle_date_change(i, value)}
                                    inputProps={{
                                        className: this.state.excluded_samples[i - 1] ? 'date-input-box .bp3-input excluded' : 'date-input-box .bp3-input',
                                        placeholder: placeholder + ' sample date and time',
                                        value: (this.state.datetimes[i] === this.now) ? "" : this.state.datetimes[i].format('YYYY-MM-DD HH:mm')
                                    }}
                                    key={i} value={this.state.datetimes[i]} dateFormat="YYYY-MM-DD" timeFormat="HH:mm"/>
                );
            }
            for (let i = 0; i < this.state.num_deltas; i++) {
                let placeholder = "Sample " + i;
                if (i == 0) {
                    placeholder = "Background";
                }
                deuterium_delta_inputs.push(
                    <NumberInput placeholder={placeholder + " Deuterium delta"} index={i} key={i}
                                 change_function={this.handle_deuterium_delta_change} unit={this.state.delta_units}
                                 value={this.state.deuterium_deltas[i]} disabled={this.state.excluded_samples[i]}/>);
                oxygen_delta_inputs.push(
                    <NumberInput placeholder={placeholder + ' Oxygen 18 delta'} index={i} key={i} unit={this.state.delta_units}
                                 change_function={this.handle_oxygen_delta_change} value={this.state.oxygen_deltas[i]}
                                 disabled={this.state.excluded_samples[i]}/>);
            }
            for (let i = 1; i < this.state.num_deltas; i++) {
                include_checkboxes.push(
                    <Tooltip content='Include in exponential fit' hoverOpenDelay={700}>
                        <Checkbox checked={!this.state.excluded_samples[i]}
                                  onChange={() => {
                                      this.clear_results();
                                      let excluded_samples = this.state.excluded_samples;
                                      excluded_samples.splice(i, 1, !this.state.excluded_samples[i]);
                                      this.setState({excluded_samples: excluded_samples})
                                  }
                                  }/>
                    </Tooltip>);
            }
            add_rows_button = (
                <div className='add-rows-button'>
                    <Button icon={'add'} large={true} onClick={() => this.add_sample_rows(NEW_ROWS)}
                            minimal={true}>Add samples</Button>
                </div>);
        }
        deuterium_delta_inputs.splice(1, 0, <div className='delta-space'/>);
        oxygen_delta_inputs.splice(1, 0, <div className='delta-space'/>);

        let dose_weight_inputs: JSX.Element[] = [];
        let dose_enrichment_inputs: JSX.Element[] = [];
        for (let i = 0; i < ELEMENTS.length; i++) {
            if (!this.state.mixed_dose) {
                dose_weight_inputs.push(
                    <NumberInput placeholder={ELEMENTS[i] + ' dose weight (g)'} index={i} key={i} unit={"g"}
                                 change_function={this.handle_dose_weight_change} value={this.state.dose_weights[i]}/>);
            }
            dose_enrichment_inputs.push(
                <NumberInput placeholder={ELEMENTS[i] + ' dose enrichment (ppm)'} index={i} key={i}
                             change_function={this.handle_dose_enrichment_change}
                             value={this.state.dose_enrichments[i]} unit={"ppm"}/>);
        }
        if (this.state.mixed_dose) {
            dose_weight_inputs.push(
                <NumberInput placeholder={"Dose weight (g)"} index={0} value={this.state.dose_weights[0]} unit={"g"}
                             change_function={this.handle_dose_weight_change} key={0}/>);
        }
        let results_display: JSX.Element = <div/>;
        let export_button =
            <Button className='export-button' intent={Intent.SUCCESS} disabled={true}>EXPORT RESULTS TO CSV</Button>;
        if (this.state.results.results) {
            let csv_name = this.state.new_csv_name;
            if (csv_name.slice(-4) != '.csv') {
                csv_name += '.csv'
            }
            export_button = (
                <a href={this.state.new_csv_url} download={csv_name} className='export-button'>
                    <Button onClick={() => this.setState({current_output: null})} className='within-link'
                        intent={Intent.SUCCESS} disabled={!(this.state.new_csv_name)}>EXPORT RESULTS TO CSV</Button>
                </a>);
            let results_calculations: JSX.Element[] = [];
            let results_error_flags: JSX.Element[] = [];

            let results_speakman_int: JSX.Element[] = [];
            let results_speakman_plat: JSX.Element[] = [];

            let results_body_comp_int: JSX.Element[] = [];
            let results_body_comp_plat: JSX.Element[] = [];

            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.calculations.ndp_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.results.calculations.ndp_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.calculations.kd_hr[0] + ":"}</p>
                    <p className="result-value">{this.state.results.results.calculations.kd_hr[1]}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.calculations.nop_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.results.calculations.nop_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.calculations.ko_hr[0] + ":"}</p>
                    <p className="result-value">{this.state.results.results.calculations.ko_hr[1]}</p>
                </div>);
            
            //@ts-ignore
            function push_body_comp_results(element: JSX.Element[], result_set: BODY_COMP_RESULTS) {
                element.push(
                    <div className='result-pair'>
                        <p className="result-label">{result_set.body_water_avg_kg[0] + ":"}</p>
                        <p className="result-value">{result_set.body_water_avg_kg[1] + " kg"}</p>
                    </div>);
                element.push(
                    <div className='result-pair'>
                        <p className="result-label">{result_set.fat_free_mass_kg[0] + ":"}</p>
                        <p className="result-value">{result_set.fat_free_mass_kg[1] + " kg"}</p>
                    </div>);
                element.push(
                    <div className='result-pair'>
                        <p className="result-label">{result_set.fat_mass_kg[0] + ":"}</p>
                        <p className="result-value">{result_set.fat_mass_kg[1] + " kg"}</p>
                    </div>);
                element.push(
                    <div className='result-pair'>
                        <p className="result-label">{result_set.body_fat_percentage[0] + ":"}</p>
                        <p className="result-value">{result_set.body_fat_percentage[1] + "%"}</p>
                    </div>);
            }

            push_body_comp_results(results_body_comp_int, this.state.results.results.calculations.body_comp.int);
            push_body_comp_results(results_body_comp_plat, this.state.results.results.calculations.body_comp.plat);

            //@ts-ignore
            function push_calculated_results(element: JSX.Element[], result_set: RCO2_RESULTS) {
                element.push(
                    <div className='result-pair'>
                        <p className="result-label">{result_set.rco2_mol_day[0] + ":"}</p>
                        <p className="result-value">{result_set.rco2_mol_day[1] + " mol/day"}</p>
                    </div>);
                element.push(
                    <div className='result-pair'>
                        <p className="result-label">{result_set.rco2_l_hr[0] + ":"}</p>
                        <p className="result-value">{result_set.rco2_l_hr[1] + " L/day"}</p>
                    </div>);
                element.push(
                    <div className='result-pair'>
                        <p className="result-label">{result_set.ee_kcal_day[0] + ":"}</p>
                        <p className="result-value">{result_set.ee_kcal_day[1] + " kcal/day"}</p>
                    </div>);
                element.push(
                    <div className='result-pair'>
                        <p className="result-label">{result_set.ee_mj_day[0] + ":"}</p>
                        <p className="result-value">{result_set.ee_mj_day[1] + " MJ/day"}</p>
                    </div>);
            }

            push_calculated_results(results_speakman_int, this.state.results.results.speakman2020.rco2_ee_int);
            push_calculated_results(results_speakman_plat, this.state.results.results.speakman2020.rco2_ee_plat);

            let error_okay = "error-okay";
            let outside_error_bars = "error-not-okay";
            let error_class = "";
            if (!this.state.exponential) {
                error_class = ((parseFloat(this.state.results.results.error_flags.plateau_2h[1]) < 5 &&
                    parseFloat(this.state.results.results.error_flags.plateau_2h[1]) > -5) ? error_okay : outside_error_bars);
                results_error_flags.push(
                    <div className='result-pair'>
                        <p className="result-label">{this.state.results.results.error_flags.plateau_2h[0] + ":"}</p>
                        <p className={"result-value " + error_class}>{this.state.results.results.error_flags.plateau_2h[1]}</p>
                    </div>);
                error_class = ((parseFloat(this.state.results.results.error_flags.plateau_18O[1]) < 5 &&
                    parseFloat(this.state.results.results.error_flags.plateau_18O[1]) > -5) ? error_okay : outside_error_bars);
                results_error_flags.push(
                    <div className='result-pair'>
                        <p className="result-label">{this.state.results.results.error_flags.plateau_18O[0] + ":"}</p>
                        <p className={"result-value " + error_class}>{this.state.results.results.error_flags.plateau_18O[1]}</p>
                    </div>);
            }
            error_class = ((parseFloat(this.state.results.results.error_flags.ds_ratio[1]) < 1.070 &&
                parseFloat(this.state.results.results.error_flags.ds_ratio[1]) > 1) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.error_flags.ds_ratio[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.results.error_flags.ds_ratio[1]}</p>
                </div>);
            error_class = ((parseFloat(this.state.results.results.error_flags.ee[1]) < 10 &&
                parseFloat(this.state.results.results.error_flags.ee[1]) > -10) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.error_flags.ee[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.results.error_flags.ee[1]}</p>
                </div>);
            error_class = ((parseFloat(this.state.results.results.error_flags.ko_kd[1]) < 1.7 &&
                parseFloat(this.state.results.results.error_flags.ko_kd[1]) > 1.1) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.error_flags.ko_kd[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.results.error_flags.ko_kd[1]}</p>
                </div>);
            let chart_data_d_meas = [];
            let chart_data_o18_meas = [];
            let chart_data_dates: moment.Moment[] = [];
            let deltas_chart;
            let delta_units = this.state.delta_units.toString();
            if (delta_units == 'permil') {
                delta_units = '‰';
            }
            if (!this.state.exponential) {
                let x_counter = 0;
                let i = 0;
                while (x_counter < NUM_DELTAS) {
                    // assume that we include the same samples for deuterium and o18
                    if (this.state.deuterium_deltas[i] != "" && !this.state.excluded_samples[i]) {
                        chart_data_d_meas.push({x: x_counter, y: this.state.deuterium_deltas[i]});
                        chart_data_o18_meas.push({x: x_counter, y: this.state.oxygen_deltas[i]});
                        x_counter++;
                    }
                    i++;
                }
                deltas_chart = (
                    <DeltaScatterChart delta_units={delta_units} x_labels={SAMPLE_LABELS}
                                       x_domain={[-0.5, NUM_DELTAS - .5]}
                                       x_ticks={Array.from(Array(NUM_DELTAS).keys())}
                                       chart_data_d_meas={chart_data_d_meas} chart_data_o18_meas={chart_data_o18_meas}/>
                );
            } else {
                // first, middle and last dates, approx
                for (let i = 0; i < this.state.num_sample_times; i++) {
                    if (i === 0 || !this.state.excluded_samples[i - 1]) {
                        chart_data_dates.push(this.state.datetimes[i]);
                    }
                }
                let labels = [chart_data_dates[0].format('YYYY-MM-DD')];
                labels.push(chart_data_dates[~~(chart_data_dates.length / 2)].format('YYYY-MM-DD'));
                labels.push(chart_data_dates[chart_data_dates.length - 1].format('YYYY-MM-DD'));

                let ticks = [chart_data_dates[0].unix()];
                ticks.push(chart_data_dates[~~(chart_data_dates.length / 2)].unix());
                ticks.push(chart_data_dates[chart_data_dates.length - 1].unix());

                // background data
                chart_data_d_meas.push({
                                           x: chart_data_dates[0].unix(),
                                           y: this.state.deuterium_deltas[0]
                                       });
                chart_data_o18_meas.push({
                                             x: chart_data_dates[0].unix(),
                                             y: this.state.oxygen_deltas[0]
                                         });

                for (let i = 1; i < this.state.deuterium_deltas.length; i++) {
                    if (this.state.deuterium_deltas[i] != "" && !this.state.excluded_samples[i]) {
                        chart_data_d_meas.push({
                                                   x: this.state.datetimes[i + 1].unix(),
                                                   y: this.state.deuterium_deltas[i]
                                               });
                    }
                    if (this.state.oxygen_deltas[i] != "" && !this.state.excluded_samples[i]) {
                        chart_data_o18_meas.push({
                                                     x: this.state.datetimes[i + 1].unix(),
                                                     y: this.state.oxygen_deltas[i]
                                                 });
                    }
                }
                deltas_chart = (
                    <ExponentialDeltaScatterChart delta_units={delta_units} x_ticks={ticks} x_labels={labels}
                                                  x_domain={[chart_data_dates[0].unix() - 10000, chart_data_dates[chart_data_dates.length - 1].unix() + 10000]}
                                                  chart_data_d_meas={chart_data_d_meas}
                                                  chart_data_o18_meas={chart_data_o18_meas}/>
                );
            }
            results_display = (
                <div className='results-display' ref={this.scroll_anchor_ref}>
                    <Card className='results-card'>
                        <h1>{'Results for subject ' + this.state.subject_id}</h1>
                        <div className='result-sections'>
                            <div className='result-section'>
                                <h5 className='result-header-calc'>Calculations</h5>
                                {results_calculations}
                            </div>
                            <div className='result-section error-flags'>
                                <h5 className='result-header-error'>Error Flags</h5>
                                {results_error_flags}
                            </div>
                        </div>
                    </Card>
                    <Card className='results-card'>
                        <div className='result-sections calculation-types'>
                            <div className='s2020'>
                                <div className='calc-result'>
                                    <h5 className='result-header-calc'>Body Comp, intercept method</h5>
                                    {results_body_comp_int}
                                </div>
                                <div className='calc-result'>
                                    <h5 className='result-header-calc'>Body Comp, plateau method</h5>
                                    {results_body_comp_plat}
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className='results-card'>
                        <div className='result-sections calculation-types'>
                            <h2>Speakman (2020)</h2>
                            <div className='s2020'>
                                <div className='calc-result'>
                                    <h5 className='result-header-calc'>rCO2 and EE, intercept method</h5>
                                    {results_speakman_int}
                                </div>
                                <div className='calc-result'>
                                    <h5 className='result-header-calc'>rCO2 and EE, plateau method</h5>
                                    {results_speakman_plat}
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className='results-card'>
                        <div className='result-sections'>
                            <div className='result-section'>
                                <h5 className='chart-title'>Deuterium/18O Measured Enrichments</h5>
                                {deltas_chart}
                            </div>
                        </div>
                    </Card>
                </div>
            )
        }
        return (
            <Navbar className='dlw-nav'>
                <Dialog isOpen={this.state.info_overlay_open} canEscapeKeyClose={true} canOutsideClickClose={false}
                        hasBackdrop={true} isCloseButtonShown={true}
                        onClose={() => {
                            this.setState({info_overlay_open: false})
                        }}
                        title={'How to use the Doubly Labeled Water App'}>
                    <p className='help-paragraph'>Enter inputs manually, or upload subject inputs from a custom CSV
                        file.
                        For the CSV format that the program expects, see
                        <a href="https://github.com/jchmyz/DoublyLabeledWater#example-input-csvs"> the GitHub repo</a>.
                    </p>
                    <p className='help-paragraph'>When entering inputs manually, multiple inputs can be copied and
                        pasted simultaneously into the program. For example, select and copy multiple cells containing
                        deuterium delta values from a spreadsheet, place your cursor into the input box for the first
                        value you are copying, and paste. </p>
                    <p className='help-paragraph'>Once you have entered all of the required input values, the 'Calculate
                        Results' button will be active. Press 'Calculate Results' to calculate error flags and results
                        using the
                        Speakman (2020) equation, and view a graph showing the measured enrichments. If you change an
                        input,
                        recalculate using 'Calculate Results'. Once the results appear appropriate based on the display,
                        you
                        can save your results to a CSV file using 'Export Results to CSV'. The program provides a
                        default CSV
                        filename based on the subject ID and date, or you can customize the filename yourself.</p>
                    <p className='help-paragraph'>Exponential Fitting: The program loads in the mode which calculates
                        turnover rates using the two point method. If desired, use the ‘Exponential Fit’ checkbox to
                        switch to calculating turnover rates using an exponential fit. When calculating using an
                        exponential
                        fit, add more data rows using the ‘Add samples’ button. The checkboxes to the left of the sample
                        rows indicate whether the sample will be used in the exponential fit. Note that when using
                        the exponential fit the 2H plateau, 18O plateau, and EE Error Flags can produce strange results
                        if the first two non-background samples are not two closely-spaced post-dose samples and/or the
                        last two samples are not closely-spaced end-dose samples.</p>
                    <p className='help-paragraph'>Mixed Dose: If checked, enter 18O and 2H enrichments of the dose as
                        measured <strong>after</strong> mixing.</p>
                    <p className='help-paragraph'>RQ: If left blank, the RQ value used is 0.85.</p>
                    <p className='help-paragraph'>Population Dilution Space Ratio: If left blank, the population
                        dilution
                        space ratio value used is 1.036, as suggested in Speakman (2020).</p>
                    <p className='help-paragraph'>Fat Free Mass Factor: If left blank, the Fat Free Mass Factor value
                        used is 0.73.</p>
                    <p className='help-paragraph'>Help us improve the DLW program: please report any issues or
                        feature requests at <a href="https://github.com/jchmyz/DoublyLabeledWater/issues">our open
                            source
                            repository</a>.</p>
                </Dialog>
                <NavbarGroup align={Alignment.LEFT}>
                    <Navbar.Heading className='dlw-title'>Doubly Labeled Water</Navbar.Heading>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <NavbarHeading className='tagline'>an open source project</NavbarHeading>
                    <img src="assets/logo_cuhs.png" alt="University of Colorado Anschutz Medical Campus logo"
                         style={{'height': 30}}/>
                    <NavbarDivider/>
                    <a href="https://github.com/jchmyz/DoublyLabeledWater" target="_blank">DoublyLabeledWater on
                        GitHub</a>
                    <NavbarDivider/>
                    <Button icon={"help"} minimal={true} className='help-button'
                            onClick={() => this.setState({info_overlay_open: true})}>Help</Button>
                </NavbarGroup>
                <FormGroup className='dlw-app'>
                    <div className='subject-clear'>
                        <div>
                            <h5>Subject ID</h5>
                            <Popover isOpen={this.state.clear_popup_open} position="right"
                                     content={
                                         <div className='clear-popover'>
                                             <p className='help-paragraph'>Entering a new subject ID. Clear data
                                                 inputs?</p>
                                             <div className='popover-button-container'>
                                                 <Button className='popover-button' onClick={this.clear}>CLEAR
                                                     INPUTS</Button>
                                                 <Button className='popover-button'
                                                         onClick={() => this.setState({clear_popup_open: false})}
                                                 >KEEP INPUTS</Button>
                                             </div>
                                         </div>}>
                                <InputGroup leftIcon={(this.state.subject_id ? "tick" : "circle-arrow-right")}
                                            className={'.bp3-fill subject-id'} onChange={this.handle_subject_id_change}
                                            placeholder='ID' value={this.state.subject_id}/>
                            </Popover>
                        </div>
                        <div className='clear-buttons'>
                            <div>
                                <Button className='clear-button' onClick={this.clear}>CLEAR INPUTS</Button>
                            </div>
                            <div>
                                <Button disabled={this.state.current_output === null} title={this.state.current_output === null ? 'No output loaded' : ''}
                                className={'clear-button'} onClick={() =>this.setState({current_output: null})}>CLEAR OUTPUTS</Button>
                            </div>
                        </div>
                    </div>
                    <div className="load-files">
                        <div className='load-from-csv'>
                            <div>
                                <h5>Load input data from .csv file</h5>
                                <FileInput text={this.state.input_csv_name || "Choose input file..."}
                                        inputProps={{
                                            'accept': '.csv',
                                            'id': 'file-input'
                                        }} onInputChange={this.handle_csv_upload}/>
                            </div>
                            <div className='load-next-csv-button-div'>
                                {load_next_csv_row_button}
                                {load_prev_csv_row_button}
                            </div>
                        </div>
                        <div className='load-output-from-csv'>
                            <h5>Load existing output data from .csv file (Optional)</h5>
                            <FileInput text={"Choose output file..."}
                                        inputProps={{
                                            'accept': '.csv',
                                            'id': 'file-output'
                                        }} onInputChange={this.handle_csv_output}/>
                        </div>
                    </div>
                    <div className='exponential-checkbox'>
                        <Checkbox checked={this.state.exponential} labelElement={<h5>Exponential
                            Fit</h5>} onChange={() => {
                            if (this.state.num_deltas < DEFAULT_EXPONENTIAL_SAMPLES) {
                                this.add_sample_rows(6);
                            }
                            this.clear_results();
                            this.setState({exponential: !this.state.exponential})
                        }} alignIndicator={Alignment.RIGHT} large={true}/>
                    </div>
                    <div className='samples'>
                        <div className='include-checkboxes'>
                            {include_checkboxes}
                        </div>
                        <div className='date-inputs'>
                            <h5>Collection Dates and Times</h5>
                            {collection_time_inputs}
                        </div>
                        <div className='delta-inputs'>
                            <h5>Deuterium Delta Values</h5>
                            {deuterium_delta_inputs}
                        </div>
                        <div className='delta-inputs'>
                            <h5>Oxygen 18 Delta Values</h5>
                            {oxygen_delta_inputs}
                        </div>
                        <div className='delta-unit-radio'>
                            <RadioGroup onChange={(event: FormEvent<HTMLInputElement>) => {
                                this.clear_results();
                                this.setState({delta_units: (event.target as any).value})
                            }} selectedValue={this.state.delta_units}>
                                <Radio label="permil" value={DeltaUnits.permil} large={true}/>
                                <Radio label="ppm" value={DeltaUnits.ppm} large={true}/>
                            </RadioGroup>
                        </div>
                    </div>
                    {add_rows_button}
                    <div className='element-wise-inputs'>
                        <div className='mixed-dose'>
                            <div className='mixed-dose-box'>
                                <Checkbox checked={this.state.mixed_dose} labelElement={<h5>Mixed
                                    Dose</h5>} large={true}
                                          onChange={() => {
                                              this.clear_results();
                                              this.setState({mixed_dose: !this.state.mixed_dose})
                                          }} alignIndicator={Alignment.RIGHT}/>
                            </div>
                        </div>
                    </div>
                    <div className='element-wise-inputs'>
                        <div className='inputs-by-element'>
                            <h5>{((this.state.mixed_dose) ? 'Dose Weight' : 'Dose Weights')}</h5>
                            {dose_weight_inputs}
                        </div>
                        <div className='inputs-by-element'>
                            <h5>{((this.state.mixed_dose) ? 'Mixed Dose Enrichments' : 'Dose Enrichments')}</h5>
                            {dose_enrichment_inputs}
                        </div>
                        <div className='inputs-by-element'>
                            <h5>RQ</h5>
                            <NumberInput placeholder={"RQ"} value={this.state.rq}
                                         change_function={this.handle_rq_change} unit={''} index={0}/>
                        </div>
                    </div>
                    <div className='element-wise-inputs'>
                        <div className='inputs-by-element'>
                            <h5>Subject Weight</h5>
                            <NumberInput placeholder={"Initial subject weight (kg)"} index={0}
                                         change_function={this.handle_subject_weight_change} unit={'kg'}
                                         value={this.state.subject_weights[0]}/>
                            <NumberInput placeholder={"Final subject weight (kg)"} index={1}
                                         change_function={this.handle_subject_weight_change} unit={'kg'}
                                         value={this.state.subject_weights[1]}/>
                        </div>
                        <div className='inputs-by-element'>
                            <h5>Population Dilution Space Ratio</h5>
                            <NumberInput placeholder={"Dilution space ratio"} value={this.state.dilution_space_ratio}
                                         change_function={this.handle_dilution_space_ratio_change} unit={''} index={0}/>
                        </div>
                        <div className='inputs-by-element'>
                            <h5>Fat Free Mass Factor</h5>
                            <NumberInput placeholder={"Fat Free Mass Factor"} value={this.state.fat_free_mass_factor}
                                         change_function={this.handle_fat_free_mass_factor_change} unit={''} index={0}/>
                        </div>
                    </div>
                    <div className='element-wise-inputs'>
                        <Popover isOpen={this.state.missing_data_popup_open} position={Position.TOP}
                                 className='full-popover-missing-data' key={'missing-data-popover'}>
                            <Button className='calculate-button' onClick={() => {
                                if ((this.state.minimum_dates && !this.state.datetimes_validated) ||
                                    (this.state.minimum_deuterium_deltas && !this.state.deuterium_deltas_validated) ||
                                    (this.state.minimum_oxygen_deltas && !this.state.oxygen_deltas_validated)) {
                                    this.setState({missing_data_popup_open: true});
                                } else {
                                    this.submit_inputs();
                                }
                            }} intent={Intent.SUCCESS} disabled={!all_inputs_validated}>CALCULATE RESULTS</Button>
                            <div className='popover-missing-data'>
                                <p>Missing input data detected. Calculate anyway?</p>
                                <div className='missing-data-confirm-buttons'>
                                    <Button text={"CALCULATE"} intent={Intent.DANGER} onClick={this.submit_inputs}
                                            className='missing-data-button' key={'calc-md'}/>
                                    <Button text={"CANCEL"} intent={Intent.PRIMARY} onClick={() => {
                                        this.setState({missing_data_popup_open: false})
                                    }} className='missing-data-button' key={'cancel-md'}/>
                                </div>
                            </div>
                        </Popover>
                    </div>
                    <div className='submit-group'>
                        <div className='csv-input-new'>
                            <h5>Input a custom name for a new .csv file</h5>
                            <InputGroup placeholder={this.state.new_csv_name ? this.state.new_csv_name : 'CSV filename'}
                                        className='csv_input' onChange={(event: FormEvent<HTMLElement>) =>
                                this.setState({
                                                  new_csv_name: (event.target as HTMLInputElement).value
                                              })}/>
                        </div>
                        {export_button}
                    </div>
                    {results_display}
                </FormGroup>
            </Navbar>
        );
    }

    export = async () => {
        let results_str = await export_to_csv(this.state.new_csv_name);
        if (results_str == null) {
            AppToaster.show({
                                message: "Error exporting results to csv. Please file a bug report at https://github.com/jchmyz/DoublyLabeledWater/issues",
                                intent: "danger",
                                timeout: 0
                            });
        } else {
            let {current_output} = this.state;
            if (current_output) {
                // remove the header since there is existing output
                results_str = '\n' + results_str.split(/\r?\n/)[1];
            } else {
                current_output = '';
            }
            current_output = current_output + results_str;
            let results_blob = new Blob([current_output]);
            this.setState({
                new_csv_url: URL.createObjectURL(results_blob),
                current_output
            });
        }
    };

    submit_inputs = async () => {
        this.setState({missing_data_popup_open: false});
        let datetimes = this.state.datetimes.map((value: moment.Moment) => {
            if (value == this.now) {
                return [1, 0, 1, 1, 1];
            }
            return value.toArray();
        });
        // months are zero-indexed in Moment.js
        datetimes.map((value: number[]) => {
            return value.splice(1, 1, value[1] + 1);
        });
        let deuterium_deltas = this.state.deuterium_deltas;
        let oxygen_deltas = this.state.oxygen_deltas;
        if (!this.state.exponential) {
            deuterium_deltas = deuterium_deltas.slice(0, NUM_DELTAS - 2).concat(deuterium_deltas.slice(-2));
            oxygen_deltas = oxygen_deltas.slice(0, NUM_DELTAS - 2).concat(oxygen_deltas.slice(-2));
            datetimes = datetimes.slice(0, NUM_SAMPLE_TIMES - 2).concat(datetimes.slice(-2));
        } else {
            deuterium_deltas = deuterium_deltas.filter((v, i) => v != "" && !this.state.excluded_samples[i]);
            oxygen_deltas = oxygen_deltas.filter((v, i) => v != "" && !this.state.excluded_samples[i]);
            datetimes = datetimes.filter((v, i) => JSON.stringify(v) != JSON.stringify([1, 1, 1, 1, 1]) && !this.state.excluded_samples[i - 1]);
        }
        let calculated_results = await calculate_from_inputs(
            {
                d_meas: deuterium_deltas,
                o18_meas: oxygen_deltas,
                datetimes: datetimes,
                dose_weights: this.state.dose_weights,
                dose_enrichments: this.state.dose_enrichments,
                subject_weights: this.state.subject_weights,
                subject_id: this.state.subject_id,
                mixed_dose: this.state.mixed_dose,
                in_permil: (this.state.delta_units === DeltaUnits.permil),
                pop_avg_rdil: this.state.dilution_space_ratio ? this.state.dilution_space_ratio : null,
                exponential: this.state.exponential,
                rq: this.state.rq,
                fat_free_mass_factor: this.state.fat_free_mass_factor,
            }
        );
        if (calculated_results.results) {
            this.setState({
                              results: {
                                  results: {
                                      calculations: calculated_results.results.calculations,
                                      speakman2020: {
                                          rco2_ee_int: calculated_results.results.speakman2020.rco2_ee_int,
                                          rco2_ee_plat: calculated_results.results.speakman2020.rco2_ee_plat
                                      },
                                      error_flags: calculated_results.results.error_flags
                                  }
                              }
                          });
            AppToaster.show({
                                message: "Results calculated successfully", intent: "success", timeout: 3000
                            });
            // store calculated results in url for csv export
            await this.export();
            if (this.scroll_anchor_ref.current) this.scroll_anchor_ref.current.scrollIntoView({behavior: "smooth"});
        }
    };

    clear = () => {
        if (!this.state.exponential) {
            this.setState({num_deltas: NUM_DELTAS, num_sample_times: NUM_SAMPLE_TIMES});
        }
        this.setState({
                          clear_popup_open: false,

                          deuterium_deltas: new Array(this.state.num_deltas).fill(""),
                          oxygen_deltas: new Array(this.state.num_deltas).fill(""),
                          datetimes: new Array(this.state.num_sample_times).fill(this.now),
                          excluded_samples: new Array(this.state.num_sample_times).fill(false),
                          dose_weights: ["", ""],
                          dose_enrichments: ["", ""],
                          subject_weights: ["", ""],
                          dilution_space_ratio: "",
                          fat_free_mass_factor: DEFAULT_FAT_FREE_MASS_FACTOR,
                          subject_id: "",

                          deuterium_deltas_validated: false,
                          oxygen_deltas_validated: false,
                          datetimes_validated: false,
                          dose_weights_validated: false,
                          dose_enrichments_validated: false,
                          subject_weights_validated: false,

                          results: {results: null},
                      });
        // @ts-ignore
        document.getElementById('file-input').value = null;
    };

    clear_results = () => {
        if (this.state.results.results) {
            AppToaster.show({
                                message: "Inputs edited; results cleared.",
                                intent: "primary",
                                timeout: 2000
                            });
            this.setState({results: {results: null}});
        }
    };

    load_next_csv_row = async () => {
        let next_index = this.state.loaded_csv_index + 1;
        this.setState({loaded_csv_index: next_index});
        this.clear();
        await this._handle_csv_input(this.state.loaded_csv_inputs[next_index]);
    };

    load_previous_csv_row = async () => {
        let prev_index = this.state.loaded_csv_index - 1;
        this.setState({loaded_csv_index: prev_index});
        this.clear();
        await this._handle_csv_input(this.state.loaded_csv_inputs[prev_index]);
    };

    load_specified_csv_row = async (index: number) => {
        if (index < 0 || index > this.state.loaded_csv_inputs.length - 1) {
            AppToaster.show({
                                message: "Invalid CSV row entered, not loading new input row. Enter a value between 1 and " + this.state.loaded_csv_inputs.length,
                                intent: "danger",
                                timeout: 0
                            });
        } else {
            this.setState({loaded_csv_index: index});
            this.clear();
            await this._handle_csv_input(this.state.loaded_csv_inputs[index]);
        }
    };

    handle_csv_upload = async (event: FormEvent<HTMLInputElement>) => {
        let file = (event.target as any).files[0];
        if ((file.type === "text/csv" || file.type === "application/vnd.ms-excel") || (file.type === "" && file.name.endsWith(".csv"))) {
            let inputs = await load_from_csv(file);
            if (inputs.error || (inputs.results == null)) {
                AppToaster.show({
                                    message: "Error reading input CSV file. For formatting help, press 'Help' in the upper right hand corner",
                                    intent: "danger",
                                    timeout: 0
                                });
            } else {
                this.clear();
                this.setState({input_csv_name: file.name, loaded_csv_inputs: inputs.results, loaded_csv_index: 0});
                await this._handle_csv_input(inputs.results[0]);
            }
        } else {
            AppToaster.show({
                                message: "Select a .csv file. For formatting help, press 'Help' in the upper right hand corner",
                                intent: "danger",
                                timeout: 0
                            });
        }
    };

    handle_csv_output = async (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as any;
        const [file] = input.files;
        if ((file.type === "text/csv" || file.type === "application/vnd.ms-excel") || (file.type === "" && file.name.endsWith(".csv"))) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    current_output: reader.result as string
                });
                AppToaster.show({
                    message: "Successfully loaded output CSV file.",
                    intent: "success",
                    timeout: 3000
                });
                input.value = "";
            };
            reader.onerror = (e) => {
                AppToaster.show({
                    message: "Error reading output CSV file. For formatting help, press 'Help' in the upper right hand corner",
                    intent: "danger",
                    timeout: 0
                });
            };
            reader.readAsText(file);
        } else {
            AppToaster.show({
                                message: "Select a .csv file. For formatting help, press 'Help' in the upper right hand corner",
                                intent: "danger",
                                timeout: 0
                            });
        }
    };

    _handle_csv_input = async (input: LoadedCSVInputs) => {
        await new Promise(r => setTimeout(r, 200));
        let hit_error = false;
        try {
            let d_meas = input.d_meas.split(";");
            let o_meas = input.o_meas.split(";");
            if (d_meas.length > this.state.num_deltas) {
                this.add_sample_rows(d_meas.length - this.state.num_deltas);
            } else if (!input.exponential_fit || input.exponential_fit == "false") {
                this.reset_sample_rows();
            }
            for (let i = 0; i < d_meas.length; i++) {
                this.handle_deuterium_delta_change(i, d_meas[i]);
                this.handle_oxygen_delta_change(i, o_meas[i]);
            }
        } catch (e) {
            hit_error = true;
        }
        try {
            let dates = input.sample_times.split(";");
            for (let i = 0; i < dates.length; i++) {
                this.handle_date_change(i, dates[i]);
            }
        } catch (e) {
            hit_error = true;
        }
        try {
            if (input.dose_weight) {
                this.setState({mixed_dose: true});
                this.handle_dose_weight_change(0, input.dose_weight);
            } else if (input.dose_weight_d && input.dose_weight_o) {
                this.handle_dose_weight_change(0, input.dose_weight_d);
                this.handle_dose_weight_change(1, input.dose_weight_o);
            }
        } catch (e) {
            hit_error = true;
        }
        try {
            this.handle_dose_enrichment_change(0, input.dose_enrichment_d);
            this.handle_dose_enrichment_change(1, input.dose_enrichment_o);
            this.handle_subject_weight_change(0, input.subject_weight_initial);
            this.handle_subject_weight_change(1, input.subject_weight_final);
            this.handle_dilution_space_ratio_change(0, input.pop_dilution_space_ratio);
            this.handle_subject_id_change(input.subject_id);
            if (input.delta_units) {
                this.setState({delta_units: input.delta_units});
            }
            if (input.exponential_fit) {
                this.setState({exponential: JSON.parse(input.exponential_fit)});
            }
            if (input.fat_free_mass_factor) {
                this.handle_fat_free_mass_factor_change(0, input.fat_free_mass_factor);
            }
        } catch (e) {
            console.log(e);
            hit_error = true;
        }
        if (hit_error) {
            AppToaster.show({
                                message:
                                    "One or more values not inputted automatically. Add manually, or fix CSV format." +
                                    " For formatting help, press 'Help' in the upper right hand corner",
                                intent: "danger",
                                timeout: 0
                            });
        } else {
            let addl_msg = ''
            if (this.state.loaded_csv_inputs.length > 1) {
                addl_msg = '\nRow ' + (this.state.loaded_csv_index + 1) + ' of ' + this.state.loaded_csv_inputs.length + ' input rows loaded'
            }
            AppToaster.show({
                                message:
                                    "Inputs for subject ID " + input.subject_id + " successfully loaded from " + this.state.input_csv_name + addl_msg,
                                intent: "primary",
                                timeout: 4000
                            });
        }

    };

    _bad_format = (specific_error: string) => {
        this.setState({input_csv_name: ""});
        let display_msg = "Incorrect .csv format." + specific_error + " See 'Help' for expected format.";
        AppToaster.show({message: display_msg, intent: "danger", timeout: 0});
    };

    _error_handler = (event: ProgressEvent) => {
        // @ts-ignore
        if (event.target.error.name == "NotReadableError") {
            AppToaster.show({
                                message: "File not readable. For formatting help, press 'Help' in the upper right hand corner",
                                intent: "danger",
                                timeout: 0
                            });
        }
    };

    check_numerical_inputs = (input_array: number[] | string[], limit?: number) => {
        let check_limit = limit ? limit : input_array.length;
        for (let value of input_array.slice(0, check_limit)) {
            if (isNaN(+value) || value === "") {
                return false;
            }
        }
        return true;
    };

    _flag_non_numerical_input = () => {
        AppToaster.show({message: "Enter a numeric value", intent: "danger", timeout: 3000});
    };

    _flag_non_date_input = () => {
        AppToaster.show({message: "Enter a valid date", intent: "danger", timeout: 3000});
    };

    handle_deuterium_delta_change = (index: number, event: FormEvent<HTMLElement> | string) => {
        this.clear_results();
        let value = (typeof event === "string") ? event : (event.target as HTMLInputElement).value;
        let values_sep_by_spaces = value.split(" ");
        values_sep_by_spaces = values_sep_by_spaces.filter((value: string) => value !== "");
        if (values_sep_by_spaces.length === 1 || value === "") {
            if (!isNaN(+value) || value === "" || value === "-") {
                let new_deltas = this.state.deuterium_deltas;
                new_deltas.splice(index, 1, value);
                this.setState({
                                  deuterium_deltas: new_deltas,
                                  deuterium_deltas_validated: this.check_numerical_inputs(new_deltas, NUM_DELTAS),
                                  minimum_deuterium_deltas: check_array_for_missing_values(new_deltas, "")
                              });
            } else this._flag_non_numerical_input();
        } else {
            for (let i = 0; i < values_sep_by_spaces.length; i++) {
                this.handle_deuterium_delta_change(index + i, values_sep_by_spaces[i]);
            }
        }
    };

    handle_oxygen_delta_change = (index: number, event: FormEvent<HTMLElement> | string) => {
        this.clear_results();
        let value = (typeof event === "string") ? event : (event.target as HTMLInputElement).value;
        let values_sep_by_spaces = value.split(" ");
        values_sep_by_spaces = values_sep_by_spaces.filter((value: string) => value !== "");
        if (values_sep_by_spaces.length === 1 || value === "") {
            if (!isNaN(+value) || value === "" || value === "-") {
                let new_deltas = this.state.oxygen_deltas;
                new_deltas.splice(index, 1, value);
                this.setState({
                                  oxygen_deltas: new_deltas,
                                  oxygen_deltas_validated: this.check_numerical_inputs(new_deltas, NUM_DELTAS),
                                  minimum_oxygen_deltas: check_array_for_missing_values(new_deltas, "")
                              });
            } else this._flag_non_numerical_input();
        } else {
            for (let i = 0; i < values_sep_by_spaces.length; i++) {
                this.handle_oxygen_delta_change(index + i, values_sep_by_spaces[i]);
            }
        }
    };

    _check_date_validity = () => {
        let dates = this.state.datetimes;
        let chronological_fail = false;
        let duplicate_fail = false;
        for (let i = 0; i < dates.length; i++) {
            for (let j = 0; j < dates.length; j++) {
                if ((i != j) && (i < j) && !(dates[i] == this.now || dates[j] == this.now)) {
                    if (!chronological_fail && dates[i].isAfter(dates[j])) {
                        AppToaster.show({
                                            message: "Collection dates must be in chronological order.",
                                            intent: "danger",
                                            timeout: 3000
                                        });
                        this.setState({datetimes_validated: false, minimum_dates: false});
                        chronological_fail = true;
                    }
                    if (!duplicate_fail && dates[i].isSame(dates[j])) {
                        AppToaster.show({
                                            message: "Duplicate collection dates entered",
                                            intent: "danger",
                                            timeout: 3000
                                        });
                        this.setState({datetimes_validated: false, minimum_dates: false});
                        duplicate_fail = true;
                    }
                }
            }
        }
    };

    handle_date_change = (index: number, value: string | moment.Moment) => {
        this.clear_results();
        let new_date_array = this.state.datetimes;
        if (typeof value != "string") {
            let all_dates_filled = true;
            new_date_array.splice(index, 1, value);
            if (!this.state.exponential) {
                for (let i = 0; i < NUM_SAMPLE_TIMES; i++) {
                    if (new_date_array[i] === this.now) {
                        all_dates_filled = false;
                        break;
                    }
                }
            }
            this.setState({
                              datetimes: new_date_array,
                              datetimes_validated: all_dates_filled,
                              minimum_dates: check_array_for_missing_values(new_date_array, this.now)
                          })
            // stop any existing timeout so we don't spam with notifications
            clearTimeout(DATE_VALIDITY_CHECK_TIMEOUT);
            DATE_VALIDITY_CHECK_TIMEOUT = setTimeout(() => {
                this._check_date_validity();
            }, 2000);
        } else {
            let split_values = value.split(" ");
            if (value === "") {
                new_date_array.splice(index, 1, this.now);
                this.setState({datetimes: new_date_array, datetimes_validated: false});
            } else {
                let i = 0;
                let skipped_indices = 0; // track indices to place dates in correct boxes
                while (i < split_values.length) {
                    // deal with spaces between date and time
                    if (moment.parseZone(new Date(split_values[i])).isValid()) {
                        if (i < split_values.length - 1) {
                            if (moment.parseZone(new Date(split_values[i + 1])).isValid()) {
                                // both valid dates- don't need to worry about spaces, treat them as separate dates
                                let as_moment = convert_string_to_moment(split_values[i]);
                                if (typeof as_moment !== "boolean") {
                                    this.handle_date_change(index + i, as_moment);
                                }
                                i++;
                            } else { // next value isn't a valid date- likely a time. tack it onto the date
                                let as_moment = convert_string_to_moment(split_values[i].concat(" ", split_values[i + 1]));
                                if (typeof as_moment !== "boolean") {
                                    this.handle_date_change(index + i - skipped_indices, as_moment);
                                }
                                skipped_indices++;
                                i += 2;
                            }
                        } else {
                            let as_moment = convert_string_to_moment(split_values[i]);
                            if (typeof as_moment !== "boolean") {
                                this.handle_date_change(index + i, as_moment);
                            }
                            i++;
                        }
                    } else {
                        this._flag_non_date_input();
                        i++;
                    }
                }
            }
        }
    };

    handle_dose_weight_change = (index: number, event: FormEvent<HTMLElement> | string) => {
        this.clear_results();
        if (this.state.mixed_dose && index == 0) {
            // if mixed, set both values to this
            this.handle_dose_weight_change(1, event);
        }
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        let values_sep_by_spaces = value.split(" ");
        values_sep_by_spaces = values_sep_by_spaces.filter((value: string) => value !== "");
        if (values_sep_by_spaces.length === 1 || value === "") {
            if (!isNaN(+value) || value === "" || value === "-") {
                let new_dose_weights = this.state.dose_weights;
                new_dose_weights.splice(index, 1, value);
                this.setState({
                                  dose_weights: new_dose_weights,
                                  dose_weights_validated: this.check_numerical_inputs(new_dose_weights)
                              });
            } else this._flag_non_numerical_input();
        } else {
            for (let i = 0; i < values_sep_by_spaces.length; i++) {
                this.handle_dose_weight_change(index + i, values_sep_by_spaces[i]);
            }
        }
    };

    handle_dose_enrichment_change = (index: number, event: FormEvent<HTMLElement> | string) => {
        this.clear_results();
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        let values_sep_by_spaces = value.split(" ");
        values_sep_by_spaces = values_sep_by_spaces.filter((value: string) => value !== "");
        if (values_sep_by_spaces.length === 1 || value === "") {
            if (!isNaN(+value) || value === "" || value === "-") {
                let new_enrichments = this.state.dose_enrichments;
                new_enrichments.splice(index, 1, value);
                this.setState({
                                  dose_enrichments: new_enrichments,
                                  dose_enrichments_validated: this.check_numerical_inputs(new_enrichments)
                              });
            } else this._flag_non_numerical_input();
        } else {
            for (let i = 0; i < values_sep_by_spaces.length; i++) {
                this.handle_dose_enrichment_change(index + i, values_sep_by_spaces[i]);
            }
        }
    };

    handle_subject_weight_change = (index: number, event: FormEvent<HTMLElement> | string) => {
        this.clear_results();
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        let values_sep_by_spaces = value.split(" ");
        values_sep_by_spaces = values_sep_by_spaces.filter((value: string) => value !== "");
        if (values_sep_by_spaces.length === 1 || value === "") {
            if (!isNaN(+value) || value === "") {
                let new_weights = this.state.subject_weights;
                new_weights.splice(index, 1, value);
                this.setState({
                                  subject_weights: new_weights,
                                  subject_weights_validated: this.check_numerical_inputs(new_weights)
                              });
            } else this._flag_non_numerical_input();
        } else {
            for (let i = 0; i < values_sep_by_spaces.length; i++) {
                this.handle_subject_weight_change(index + i, values_sep_by_spaces[i]);
            }
        }
    };

    handle_subject_id_change = (event: FormEvent<HTMLElement> | string) => {
        this.clear_results();
        if (this.state.results.results) {
            this.setState({clear_popup_open: true});
        }
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        let date = new Date();
        let date_string = '-' + date.getFullYear() + pad((date.getMonth() + 1)) + pad(date.getDate());
        this.setState({subject_id: value, new_csv_name: value + date_string + '.csv'});
    };

    handle_dilution_space_ratio_change = (index: number, event: FormEvent<HTMLElement> | string) => {
        this.clear_results();
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        this.setState({dilution_space_ratio: value});
    };

    handle_rq_change = (index: number, event: FormEvent<HTMLElement> | string) => {
        this.clear_results();
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        this.setState({rq: value});
    };

    handle_fat_free_mass_factor_change = (index: number, event: FormEvent<HTMLElement> | string) => {
        this.clear_results();
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        this.setState({fat_free_mass_factor: value});
    };

    add_sample_rows = (rows_to_add: number) => {
        this.clear_results();
        let deuterium_deltas = this.state.deuterium_deltas;
        let oxygen_deltas = this.state.oxygen_deltas;
        let datetimes = this.state.datetimes;
        let excluded_samples = this.state.excluded_samples;
        deuterium_deltas.splice(-2, 0, ...new Array(rows_to_add).fill(""));
        oxygen_deltas.splice(-2, 0, ...new Array(rows_to_add).fill(""));
        datetimes.splice(-2, 0, ...new Array(rows_to_add).fill(this.now));
        excluded_samples.splice(-2, 0, ...new Array(rows_to_add).fill(false));
        this.setState({
                          deuterium_deltas: deuterium_deltas,
                          oxygen_deltas: oxygen_deltas,
                          datetimes: datetimes,
                          num_sample_times: this.state.num_sample_times + rows_to_add,
                          num_deltas: this.state.num_deltas + rows_to_add,
                          excluded_samples: excluded_samples
                      });
    };

    reset_sample_rows = () => {
        this.clear_results();
        this.setState({
                          deuterium_deltas: new Array(NUM_DELTAS).fill(""),
                          oxygen_deltas: new Array(NUM_DELTAS).fill(""),
                          datetimes: new Array(NUM_SAMPLE_TIMES).fill(this.now),
                          excluded_samples: new Array(NUM_DELTAS).fill(false),
                          num_deltas: NUM_DELTAS, num_sample_times: NUM_SAMPLE_TIMES
                      });
    }
}
