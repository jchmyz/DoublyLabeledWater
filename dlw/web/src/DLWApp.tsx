import * as React from "react";
import {
    Popover, FormGroup, Button, Toaster, Position,
    InputGroup, Alignment, FileInput, Dialog, Checkbox, Radio, RadioGroup, Intent
} from "@blueprintjs/core";
import * as DateTimePicker from 'react-datetime';
import * as moment from 'moment';
import {calculate_from_inputs, export_to_csv, load_from_csv} from "./Requests";
import {FormEvent, RefObject} from "react";
import {Card, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core/lib/cjs";
import {NumberInput} from "./NumberInput";
import {convert_string_to_moment, check_array_for_missing_values, pad} from "./utilities";
import {DeltaScatterChart} from "./DeltaScatterChart";

const DEUTERIUM = "Deuterium";
const OXYGEN = "Oxygen 18";
const ELEMENTS = [DEUTERIUM, OXYGEN];

const NUM_SAMPLE_TIMES = 6;
const NUM_DELTAS = 5;
const DEFAULT_EXPONENTIAL_SAMPLES = 11;
const NEW_ROWS = 4;
export const DATE_LABELS = ['Background', 'Dose', 'PDA', 'PDB', 'EDA', 'EDB'];
export const SAMPLE_LABELS = [DATE_LABELS[0]].concat(DATE_LABELS.slice(2, 6));

interface RCO2_RESULTS {
    rco2_mol_day: string[],
    rco2_l_hr: string[],
    ee_kcal_day: string[],
    ee_mj_day: string[]
}

export interface Results {
    results: {
        calculations: {
            ndp_kg: string[],
            kd_hr: string[],
            nop_kg: string[],
            ko_hr: string[],
            body_water_avg_kg: string[],
            fat_free_mass_kg: string[],
            fat_mass_kg: string[],
            body_fat_percentage: string[]
        }
        schoeller: {
            rco2_ee_int: RCO2_RESULTS, rco2_ee_plat: RCO2_RESULTS
        }
        racette: {
            rco2_ee_int: RCO2_RESULTS, rco2_ee_plat: RCO2_RESULTS
        }
        speakman: {
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

enum DeltaUnits {
    permil = "permil",
    ppm = "ppm"
}

interface DLWState {
    input_csv_name: string;
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
    subject_weights: string[],
    dilution_space_ratio: string
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

            delta_units: DeltaUnits.permil,
            exponential: false, num_deltas: NUM_DELTAS, num_sample_times: NUM_SAMPLE_TIMES,
            deuterium_deltas: new Array(NUM_DELTAS).fill(""), oxygen_deltas: new Array(NUM_DELTAS).fill(""),
            datetimes: new Array(NUM_SAMPLE_TIMES).fill(this.now),
            dose_weights: ["", ""], dose_enrichments: ["", ""],
            mixed_dose: false,
            subject_weights: ["", ""], dilution_space_ratio: "", subject_id: "",
            excluded_samples: new Array(NUM_DELTAS).fill(false),

            deuterium_deltas_validated: false, oxygen_deltas_validated: false, datetimes_validated: false,
            dose_weights_validated: false, dose_enrichments_validated: false, subject_weights_validated: false,

            minimum_dates: false, minimum_deuterium_deltas: false, minimum_oxygen_deltas: false,

            results: {results: null}, new_csv_name: "", new_csv_url: ""
        };
    }

    render() {
        let all_inputs_validated =
            ((this.state.deuterium_deltas_validated || this.state.minimum_deuterium_deltas)
                && (this.state.oxygen_deltas_validated || this.state.minimum_oxygen_deltas)
                && (this.state.datetimes_validated || this.state.minimum_dates)
                && this.state.dose_weights_validated
                && this.state.dose_enrichments_validated && this.state.subject_weights_validated
                && this.state.subject_id);

        let deuterium_delta_inputs: JSX.Element[] = [];
        let oxygen_delta_inputs: JSX.Element[] = [];
        let collection_time_inputs: JSX.Element[] = [];
        let include_checkboxes: JSX.Element[] = [];
        let add_rows_button = <div/>;
        if (!this.state.exponential) {
            for (let i = 0; i < NUM_SAMPLE_TIMES; i++) {
                collection_time_inputs.push(
                    <DateTimePicker onChange={(value) => this.handle_date_change(i, value)}
                                    inputProps={{
                                        className: 'date-input-box .bp3-input',
                                        placeholder: ' ' + DATE_LABELS[i] + ' sample date and time',
                                        value: (this.state.datetimes[i] === this.now) ? "" : this.state.datetimes[i].format('YYYY-MM-DD HH:mm')
                                    }}
                                    key={i} value={this.state.datetimes[i]} dateFormat="YYYY-MM-DD" timeFormat="HH:mm"/>
                );
            }
            for (let i = 0; i < NUM_DELTAS; i++) {
                deuterium_delta_inputs.push(
                    <NumberInput placeholder={SAMPLE_LABELS[i] + " Deuterium delta"} index={i} key={i}
                                 change_function={this.handle_deuterium_delta_change} unit={this.state.delta_units}
                                 value={this.state.deuterium_deltas[i]}/>);
                oxygen_delta_inputs.push(
                    <NumberInput placeholder={SAMPLE_LABELS[i] + ' Oxygen 18 delta'} index={i} key={i} unit={this.state.delta_units}
                                 change_function={this.handle_oxygen_delta_change} value={this.state.oxygen_deltas[i]}/>);
            }
        } else {
            for (let i = 0; i < this.state.num_sample_times; i++) {
                let placeholder = "Sample dose " + (i - 1);
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
                let placeholder = "Sample dose " + i;
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
                include_checkboxes.push(<Checkbox checked={!this.state.excluded_samples[i]}
                                                  onChange={() => {
                                                      let excluded_samples = this.state.excluded_samples;
                                                      excluded_samples.splice(i, 1, !this.state.excluded_samples[i]);
                                                      this.setState({excluded_samples: excluded_samples})
                                                  }
                                                  }/>);
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
                    <Button className='within-link' intent={Intent.SUCCESS} disabled={!(this.state.new_csv_name)}>
                        EXPORT RESULTS TO CSV</Button>
                </a>);
            let results_calculations: JSX.Element[] = [];
            let results_error_flags: JSX.Element[] = [];

            let results_schoeller_int: JSX.Element[] = [];
            let results_schoeller_plat: JSX.Element[] = [];
            let results_racette_int: JSX.Element[] = [];
            let results_racette_plat: JSX.Element[] = [];
            let results_speakman_int: JSX.Element[] = [];
            let results_speakman_plat: JSX.Element[] = [];

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
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.calculations.body_water_avg_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.results.calculations.body_water_avg_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.calculations.fat_free_mass_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.results.calculations.fat_free_mass_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.calculations.fat_mass_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.results.calculations.fat_mass_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.calculations.body_fat_percentage[0] + ":"}</p>
                    <p className="result-value">{this.state.results.results.calculations.body_fat_percentage[1] + "%"}</p>
                </div>);

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

            push_calculated_results(results_schoeller_int, this.state.results.results.schoeller.rco2_ee_int);
            push_calculated_results(results_schoeller_plat, this.state.results.results.schoeller.rco2_ee_plat);
            push_calculated_results(results_racette_int, this.state.results.results.racette.rco2_ee_int);
            push_calculated_results(results_racette_plat, this.state.results.results.racette.rco2_ee_plat);
            push_calculated_results(results_speakman_int, this.state.results.results.speakman.rco2_ee_int);
            push_calculated_results(results_speakman_plat, this.state.results.results.speakman.rco2_ee_plat);


            let error_okay = "error-okay";
            let outside_error_bars = "error-not-okay";
            let error_class = ((parseFloat(this.state.results.results.error_flags.plateau_2h[1]) < 0.05) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.error_flags.plateau_2h[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.results.error_flags.plateau_2h[1]}</p>
                </div>);
            error_class = ((parseFloat(this.state.results.results.error_flags.plateau_18O[1]) < 0.05) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.error_flags.plateau_18O[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.results.error_flags.plateau_18O[1]}</p>
                </div>);
            error_class = ((parseFloat(this.state.results.results.error_flags.ds_ratio[1]) < 1.070 &&
                parseFloat(this.state.results.results.error_flags.ds_ratio[1]) > 1) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.results.error_flags.ds_ratio[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.results.error_flags.ds_ratio[1]}</p>
                </div>);
            error_class = ((parseFloat(this.state.results.results.error_flags.ee[1]) < 10) ? error_okay : outside_error_bars);
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
            for (let i = 0; i < this.state.deuterium_deltas.length; i++) {
                if (this.state.deuterium_deltas[i] != "") {
                    chart_data_d_meas.push({x: i, y: this.state.deuterium_deltas[i]});
                }
                if (this.state.oxygen_deltas[i] != "") {
                    chart_data_o18_meas.push({x: i, y: this.state.oxygen_deltas[i]});
                }
            }
            let deltas_chart: JSX.Element = (
                <DeltaScatterChart delta_units={this.state.delta_units}
                                   chart_data_d_meas={chart_data_d_meas} chart_data_o18_meas={chart_data_o18_meas}/>
            );
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
                            <div className='result-section'>
                                <h2>Schoeller</h2>
                                <h5 className='result-header-calc'>rCO2 and EE, intercept method</h5>
                                {results_schoeller_int}
                                <h5 className='result-header-calc'>rCO2 and EE, plateau method</h5>
                                {results_schoeller_plat}
                            </div>
                            <div className='result-section'>
                                <h2>Racette</h2>
                                <h5 className='result-header-calc'>rCO2 and EE, intercept method</h5>
                                {results_racette_int}
                                <h5 className='result-header-calc'>rCO2 and EE, plateau method</h5>
                                {results_racette_plat}
                            </div>
                            <div className='result-section'>
                                <h2>Speakman</h2>
                                <h5 className='result-header-calc'>rCO2 and EE, intercept method</h5>
                                {results_speakman_int}
                                <h5 className='result-header-calc'>rCO2 and EE, plateau method</h5>
                                {results_speakman_plat}
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
                    <p className='help-paragraph'>Mixed Dose: If checked, enter 18O and 2H enrichments of the dose as
                        measured <strong>after</strong> mixing.</p>
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
                    <Button icon={"help"} minimal={true}
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
                        <div>
                            <Button className='clear-button' onClick={this.clear}>CLEAR INPUTS</Button>
                        </div>
                    </div>
                    <div className='load-from-csv'>
                        <h5>Load input data from .csv file</h5>
                        <FileInput text={this.state.input_csv_name || "Choose file..."}
                                   inputProps={{
                                       'accept': '.csv',
                                       'id': 'file-input'
                                   }} onInputChange={this.handle_csv_upload}/>
                    </div>
                    <div className='exponential-checkbox'>
                        <Checkbox checked={this.state.exponential} labelElement={<h5>Exponential
                            Fit</h5>} onChange={() => {
                            if (this.state.num_deltas < DEFAULT_EXPONENTIAL_SAMPLES) {
                                this.add_sample_rows(6);
                            }
                            this.setState({exponential: !this.state.exponential})
                        }} alignIndicator={Alignment.RIGHT} large={true}/>
                    </div>
                    <div className='samples'>
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
                        <div className='include-checkboxes'>
                            {include_checkboxes}
                        </div>
                        <div className='delta-unit-radio'>
                            <RadioGroup onChange={(event: FormEvent<HTMLInputElement>) => {
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
                                              this.setState({mixed_dose: !this.state.mixed_dose})
                                          }} alignIndicator={Alignment.RIGHT}/>
                            </div>
                            <Button icon="help" minimal={true} className='mixed-dose-help-button'
                                    onClick={() => this.setState({info_overlay_open: true})}/>
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
        let results_blob = await export_to_csv(this.state.new_csv_name);
        if (results_blob == null) {
            AppToaster.show({
                                message: "Error exporting results to csv. Please file a bug report at https://github.com/jchmyz/DoublyLabeledWater/issues",
                                intent: "danger",
                                timeout: 0
                            });
        } else {
            this.setState({new_csv_url: URL.createObjectURL(results_blob)});
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
            deuterium_deltas = deuterium_deltas.slice(0, NUM_DELTAS);
            oxygen_deltas = oxygen_deltas.slice(0, NUM_DELTAS);
            datetimes = datetimes.slice(0, NUM_SAMPLE_TIMES);
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
                exponential: this.state.exponential
            }
        );
        if (calculated_results.results) {
            this.setState({
                              results: {
                                  results: {
                                      calculations: calculated_results.results.calculations,
                                      schoeller: {
                                          rco2_ee_int: calculated_results.results.schoeller.rco2_ee_int,
                                          rco2_ee_plat: calculated_results.results.schoeller.rco2_ee_plat,
                                      },
                                      racette: {
                                          rco2_ee_int: calculated_results.results.racette.rco2_ee_int,
                                          rco2_ee_plat: calculated_results.results.racette.rco2_ee_plat
                                      },
                                      speakman: {
                                          rco2_ee_int: calculated_results.results.speakman.rco2_ee_int,
                                          rco2_ee_plat: calculated_results.results.speakman.rco2_ee_plat
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
        this.setState({
                          clear_popup_open: false,

                          input_csv_name: "",
                          deuterium_deltas: new Array(this.state.num_deltas).fill(""),
                          oxygen_deltas: new Array(this.state.num_deltas).fill(""),
                          datetimes: new Array(this.state.num_sample_times).fill(this.now),
                          dose_weights: ["", ""],
                          dose_enrichments: ["", ""],
                          subject_weights: ["", ""],
                          dilution_space_ratio: "",
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

    handle_csv_upload = async (event: FormEvent<HTMLInputElement>) => {
        let file = (event.target as any).files[0];
        console.log(file);
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
                this.setState({input_csv_name: file.name});
                let r = inputs.results;
                let hit_error = false;
                try {
                    let inputted_d_deltas = [r.d_meas_1, r.d_meas_2, r.d_meas_3, r.d_meas_4, r.d_meas_5];
                    let inputted_o_deltas = [r.o_meas_1, r.o_meas_2, r.o_meas_3, r.o_meas_4, r.o_meas_5];
                    for (let i = 0; i < NUM_DELTAS; i++) {
                        this.handle_deuterium_delta_change(i, inputted_d_deltas[i]);
                        this.handle_oxygen_delta_change(i, inputted_o_deltas[i]);
                    }
                } catch (e) {
                    hit_error = true;
                }
                try {
                    let inputted_dates = [r.sample_time_1, r.sample_time_2, r.sample_time_3, r.sample_time_4, r.sample_time_5, r.sample_time_6];
                    for (let i = 0; i < NUM_SAMPLE_TIMES; i++) {
                        if (inputted_dates[i]) {
                            this.handle_date_change(i, inputted_dates[i]);
                        }
                    }
                } catch (e) {
                    hit_error = true;
                }
                try {
                    if (r.dose_weight) {
                        this.setState({mixed_dose: true});
                        this.handle_dose_weight_change(0, r.dose_weight);
                    } else if (r.dose_weight_d && r.dose_weight_o) {
                        this.handle_dose_weight_change(0, r.dose_weight_d);
                        this.handle_dose_weight_change(1, r.dose_weight_o);
                    }
                } catch (e) {
                    hit_error = true;
                }
                try {
                    this.handle_dose_enrichment_change(0, r.dose_enrichment_d);
                    this.handle_dose_enrichment_change(1, r.dose_enrichment_o);
                    this.handle_subject_weight_change(0, r.subject_weight_initial);
                    this.handle_subject_weight_change(1, r.subject_weight_final);
                    this.handle_dilution_space_ratio_change(0, r.pop_dilution_space_ratio);
                    this.handle_subject_id_change(r.subject_id);
                } catch (e) {
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
                    AppToaster.show({
                                        message:
                                            "Inputs successfully loaded from ".concat(this.state.input_csv_name),
                                        intent: "primary",
                                        timeout: 3000
                                    });
                }
            }
        } else {
            AppToaster.show({
                                message: "Select a .csv file. For formatting help, press 'Help' in the upper right hand corner",
                                intent: "danger",
                                timeout: 0
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
        let value = (typeof event === "string") ? event : (event.target as HTMLInputElement).value;
        let values_sep_by_spaces = value.split(" ");
        values_sep_by_spaces = values_sep_by_spaces.filter((value: string) => value !== "");
        if (values_sep_by_spaces.length === 1 || value === "") {
            if (!isNaN(+value) || value === "") {
                let new_deltas = this.state.deuterium_deltas;
                new_deltas.splice(index, 1, value);
                this.setState({
                                  deuterium_deltas: new_deltas,
                                  deuterium_deltas_validated: this.check_numerical_inputs(new_deltas),
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
        let value = (typeof event === "string") ? event : (event.target as HTMLInputElement).value;
        let values_sep_by_spaces = value.split(" ");
        values_sep_by_spaces = values_sep_by_spaces.filter((value: string) => value !== "");
        if (values_sep_by_spaces.length === 1 || value === "") {
            if (!isNaN(+value) || (value === "")) {
                let new_deltas = this.state.oxygen_deltas;
                new_deltas.splice(index, 1, value);
                this.setState({
                                  oxygen_deltas: new_deltas,
                                  oxygen_deltas_validated: this.check_numerical_inputs(new_deltas),
                                  minimum_oxygen_deltas: check_array_for_missing_values(new_deltas, "")
                              });
            } else this._flag_non_numerical_input();
        } else {
            for (let i = 0; i < values_sep_by_spaces.length; i++) {
                this.handle_oxygen_delta_change(index + i, values_sep_by_spaces[i]);
            }
        }
    };

    handle_date_change = (index: number, value: string | moment.Moment) => {
        let new_date_array = this.state.datetimes;
        if (typeof value != "string") {
            let all_dates_filled = true;
            for (let j = 0; j < index; j++) {
                if ((new_date_array[j] != this.now) && value.isBefore(new_date_array[j])) {
                    AppToaster.show({
                                        message: "Collection dates must be in chronological order.",
                                        intent: "danger",
                                        timeout: 0
                                    });
                    return;
                } else if (value.isSame(new_date_array[j])) {
                    AppToaster.show({
                                        message: "Duplicate collection dates entered", intent: "danger", timeout: 0
                                    });
                    return;
                }
            }
            new_date_array.splice(index, 1, value);
            for (let date of new_date_array) {
                if (date === this.now) {
                    all_dates_filled = false;
                    break;
                }
            }
            this.setState({
                              datetimes: new_date_array,
                              datetimes_validated: all_dates_filled,
                              minimum_dates: check_array_for_missing_values(new_date_array, this.now)
                          })
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
        if (this.state.mixed_dose && index == 0) {
            // if mixed, set both values to this
            this.handle_dose_weight_change(1, event);
        }
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        let values_sep_by_spaces = value.split(" ");
        values_sep_by_spaces = values_sep_by_spaces.filter((value: string) => value !== "");
        if (values_sep_by_spaces.length === 1 || value === "") {
            if (!isNaN(+value) || value === "") {
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
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        let values_sep_by_spaces = value.split(" ");
        values_sep_by_spaces = values_sep_by_spaces.filter((value: string) => value !== "");
        if (values_sep_by_spaces.length === 1 || value === "") {
            if (!isNaN(+value) || value === "") {
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
        if (this.state.results.results) {
            this.setState({clear_popup_open: true});
        }
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        let date = new Date();
        let date_string = '-' + date.getFullYear() + pad((date.getMonth() + 1)) + pad(date.getDate());
        this.setState({subject_id: value, new_csv_name: value + date_string + '.csv'});
    };

    handle_dilution_space_ratio_change = (index: number, event: FormEvent<HTMLElement> | string) => {
        let value = (typeof event == "string") ? event : (event.target as HTMLInputElement).value;
        this.setState({dilution_space_ratio: value});
    };

    add_sample_rows = (rows_to_add: number) => {
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
}
