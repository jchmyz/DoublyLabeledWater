import * as React from "react";
import {
    ButtonGroup, Popover,
    FormGroup,
    NumericInput,
    Button, Toaster, Position,
    InputGroup, Alignment, Tag, FileInput, Dialog, Checkbox, Radio, RadioGroup, Intent
} from "@blueprintjs/core";
import * as DateTimePicker from 'react-datetime';
import * as moment from 'moment';
import {calculate_from_inputs, export_to_csv} from "./Requests";
import {FormEvent, RefObject} from "react";
import {Card, Icon, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core/lib/cjs";
import {NumberInput} from "./NumberInput";
import convert_string_to_moment from "./utilities";
import {DeltaScatterChart} from "./DeltaScatterChart";

const DEUTERIUM = "Deuterium";
const OXYGEN = "Oxygen 18";
const ELEMENTS = [DEUTERIUM, OXYGEN];

const NUM_SAMPLE_TIMES = 5;
export const SAMPLE_LABELS = ['Background', 'PD4', 'PD5', 'ED4', 'ED5'];


export interface Results {
    calculations: {
        ndp_kg: string[],
        kd_hr: string[],
        nop_kg: string[],
        ko_hr: string[],
        body_water_avg_kg: string[],
        fat_free_mass_kg: string[],
        fat_mass_kg: string[],
        body_fat_percentage: string[]
    } | null,
    rco2_ee: {
        rco2_mol_day: string[],
        rco2_l_hr: string[],
        ee_kcal_day: string[],
        ee_mj_day: string[]
    } | null,
    error_flags: {
        plateau_2h: string[],
        plateau_180: string[],
        ds_ratio: string[],
        ee: string[],
        ko_kd: string[]
    } | null
}

enum DeltaUnits {
    permil = "permil",
    ppm = "ppm"
}

interface DLWState {
    input_csv_name: string;
    info_overlay_open: boolean;

    delta_units: DeltaUnits;
    deuterium_deltas: string[],
    oxygen_deltas: string[],
    datetimes: moment.Moment[],
    dose_weights: string[],
    dose_enrichments: string[],
    subject_weights: string[],
    subject_id: string;
    mixed_dose: boolean;

    deuterium_deltas_validated: boolean,
    oxygen_deltas_validated: boolean,
    datetimes_validated: boolean,
    dose_weights_validated: boolean,
    dose_enrichments_validated: boolean,
    subject_weights_validated: boolean,

    results: Results
    new_csv_name: string,
    append_csv_name: string
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
            input_csv_name: "",
            info_overlay_open: false,

            delta_units: DeltaUnits.permil,
            deuterium_deltas: ["", "", "", "", ""],
            oxygen_deltas: ["", "", "", "", ""],
            datetimes: [this.now, this.now, this.now, this.now, this.now],
            dose_weights: ["", ""],
            dose_enrichments: ["", ""],
            mixed_dose: false,
            subject_weights: ["", ""],
            subject_id: "",

            deuterium_deltas_validated: false,
            oxygen_deltas_validated: false,
            datetimes_validated: false,
            dose_weights_validated: false,
            dose_enrichments_validated: false,
            subject_weights_validated: false,

            results: {calculations: null, rco2_ee: null, error_flags: null},
            new_csv_name: "", append_csv_name: ""
        };
    }

    render() {
        let all_inputs_validated =
            (this.state.deuterium_deltas_validated && this.state.oxygen_deltas_validated
                && this.state.datetimes_validated && this.state.dose_weights_validated
                && this.state.dose_enrichments_validated && this.state.subject_weights_validated
                && this.state.subject_id);

        let deuterium_delta_inputs: JSX.Element[] = [];
        let oxygen_delta_inputs: JSX.Element[] = [];
        let collection_time_inputs: JSX.Element[] = [];
        for (let i = 0; i < NUM_SAMPLE_TIMES; i++) {
            deuterium_delta_inputs.push(
                <NumberInput placeholder={SAMPLE_LABELS[i] + " Deuterium delta"} index={i} key={i}
                             change_function={this.handle_deuterium_delta_change} unit={this.state.delta_units}
                             value={this.state.deuterium_deltas[i]}/>);
            oxygen_delta_inputs.push(
                <NumberInput placeholder={SAMPLE_LABELS[i] + ' Oxygen 18 delta'} index={i} key={i} unit={this.state.delta_units}
                             change_function={this.handle_oxygen_delta_change} value={this.state.oxygen_deltas[i]}/>);
            collection_time_inputs.push(
                <DateTimePicker onChange={(value) => this.handle_date_change(i, value)}
                                inputProps={{
                                    className: 'date-input-box .bp3-input',
                                    placeholder: ' ' + SAMPLE_LABELS[i] + ' sample date and time',
                                    value: (this.state.datetimes[i] === this.now) ? "" : this.state.datetimes[i].format('YYYY-MM-DD HH:mm')
                                }}
                                key={i} value={this.state.datetimes[i]} dateFormat="YYYY-MM-DD" timeFormat="HH:mm"/>
            );
        }

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
                             change_function={this.handle_dose_weight_change}/>);
        }
        let results_display: JSX.Element = <div/>;
        if (this.state.results.calculations && this.state.results.rco2_ee && this.state.results.error_flags) {
            let results_calculations: JSX.Element[] = [];
            let results_rco2_ee: JSX.Element[] = [];
            let results_error_flags: JSX.Element[] = [];
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.calculations.ndp_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.calculations.ndp_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.calculations.kd_hr[0] + ":"}</p>
                    <p className="result-value">{this.state.results.calculations.kd_hr[1]}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.calculations.nop_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.calculations.nop_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.calculations.ko_hr[0] + ":"}</p>
                    <p className="result-value">{this.state.results.calculations.ko_hr[1]}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.calculations.body_water_avg_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.calculations.body_water_avg_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.calculations.fat_free_mass_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.calculations.fat_free_mass_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.calculations.fat_mass_kg[0] + ":"}</p>
                    <p className="result-value">{this.state.results.calculations.fat_mass_kg[1] + " kg"}</p>
                </div>);
            results_calculations.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.calculations.body_fat_percentage[0] + ":"}</p>
                    <p className="result-value">{this.state.results.calculations.body_fat_percentage[1] + "%"}</p>
                </div>);

            results_rco2_ee.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.rco2_ee.rco2_mol_day[0] + ":"}</p>
                    <p className="result-value">{this.state.results.rco2_ee.rco2_mol_day[1] + " mol/day"}</p>
                </div>);
            results_rco2_ee.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.rco2_ee.rco2_l_hr[0] + ":"}</p>
                    <p className="result-value">{this.state.results.rco2_ee.rco2_l_hr[1] + " L/hour"}</p>
                </div>);
            results_rco2_ee.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.rco2_ee.ee_kcal_day[0] + ":"}</p>
                    <p className="result-value">{this.state.results.rco2_ee.ee_kcal_day[1] + " kcal/day"}</p>
                </div>);
            results_rco2_ee.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.rco2_ee.ee_mj_day[0] + ":"}</p>
                    <p className="result-value">{this.state.results.rco2_ee.ee_mj_day[1] + " MJ/day"}</p>
                </div>);

            let error_okay = "error-okay";
            let outside_error_bars = "error_not_okay";
            let error_class = ((parseFloat(this.state.results.error_flags.plateau_2h[1]) < 0.05) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.error_flags.plateau_2h[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.error_flags.plateau_2h[1]}</p>
                </div>);
            error_class = ((parseFloat(this.state.results.error_flags.plateau_180[1]) < 0.05) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.error_flags.plateau_180[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.error_flags.plateau_180[1]}</p>
                </div>);
            error_class = ((parseFloat(this.state.results.error_flags.ds_ratio[1]) < 1.070 &&
                parseFloat(this.state.results.error_flags.ds_ratio[1]) > 1) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.error_flags.ds_ratio[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.error_flags.ds_ratio[1]}</p>
                </div>);
            error_class = ((parseFloat(this.state.results.error_flags.ee[1]) < 10) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.error_flags.ee[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.error_flags.ee[1] + "%"}</p>
                </div>);
            error_class = ((parseFloat(this.state.results.error_flags.ko_kd[1]) < 1.7 &&
                parseFloat(this.state.results.error_flags.ko_kd[1]) > 1.1) ? error_okay : outside_error_bars);
            results_error_flags.push(
                <div className='result-pair'>
                    <p className="result-label">{this.state.results.error_flags.ko_kd[0] + ":"}</p>
                    <p className={"result-value " + error_class}>{this.state.results.error_flags.ko_kd[1]}</p>
                </div>);
            let chart_data_d_meas = [];
            let chart_data_o18_meas = [];
            for (let i = 0; i < this.state.deuterium_deltas.length; i++) {
                chart_data_d_meas.push({x: i, y: this.state.deuterium_deltas[i]});
                chart_data_o18_meas.push({x: i, y: this.state.oxygen_deltas[i]});
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
                            <div className='result-section'>
                                <h5 className='result-header-calc'>rCO2 and EE, intercept method</h5>
                                {results_rco2_ee}
                            </div>
                            <div className='result-section'>
                                <h5 className='result-header-error'>Error Flags</h5>
                                {results_error_flags}
                            </div>
                        </div>
                    </Card>
                    <Card className='results-card'>
                        <div className='result-sections'>
                            <div className='result-section'>
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
                    <p>some helpful text- include CSV formatting</p>
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
                            <InputGroup leftIcon={(this.state.subject_id ? "tick" : "circle-arrow-right")}
                                        className={'.bp3-fill subject-id'}
                                        onChange={(event: FormEvent<HTMLElement>) => this.setState({subject_id: (event.target as any).value})}
                                        placeholder='ID' value={this.state.subject_id}/>
                        </div>
                        <div>
                            <Button className='clear-button' onClick={this.clear}>CLEAR
                                INPUTS</Button>
                        </div>
                    </div>
                    <div className='load-from-csv'>
                        <h5>Load input data from .csv file</h5>
                        <FileInput text={this.state.input_csv_name || "Choose file..."}
                                   onInputChange={this.handle_csv_upload} disabled={!!(this.state.input_csv_name)}/>
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
                        <div className='delta-unit-radio'>
                            <RadioGroup onChange={(event: FormEvent<HTMLInputElement>) => {
                                this.setState({delta_units: (event.target as any).value})
                            }} selectedValue={this.state.delta_units}>
                                <Radio label="permil" value={DeltaUnits.permil} large={true}/>
                                <Radio label="ppm" value={DeltaUnits.ppm} large={true}/>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className='element-wise-inputs'>
                        <div className='mixed-dose-box'>
                            <Checkbox checked={this.state.mixed_dose} labelElement={<h5>Mixed Dose</h5>} large={true}
                                      onChange={() => {
                                          this.setState({mixed_dose: !this.state.mixed_dose})
                                      }} alignIndicator={Alignment.RIGHT}/>
                        </div>
                    </div>
                    <div className='element-wise-inputs'>
                        <div className='inputs-by-element'>
                            <h5>Dose Weights</h5>
                            {dose_weight_inputs}
                        </div>
                        <div className='inputs-by-element'>
                            <h5>Dose Enrichments</h5>
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
                        <Button className='calculate-button' onClick={this.submit_inputs} intent={Intent.SUCCESS}
                                disabled={!all_inputs_validated}>CALCULATE RESULTS</Button>
                    </div>
                    <div className='submit-group'>
                        <div className='csv-input-new'>
                            <h5>Input a name for a new .csv file</h5>
                            <InputGroup placeholder='CSV filename' className='csv_input'
                                        onChange={(event: FormEvent<HTMLElement>) =>
                                            this.setState({new_csv_name: (event.target as HTMLInputElement).value})}/>
                        </div>
                        <div className='csv-append'>
                            <h5>Or, select an existing .csv file to append results to</h5>
                            <FileInput text={this.state.append_csv_name || "Choose file..."}
                                       onInputChange={this.handle_csv_append_choice} className='csv-input'/>
                        </div>
                        <Button onClick={this.export} disabled={!(this.state.results.calculations && (this.state.new_csv_name || this.state.append_csv_name))}
                                className='export-button' intent={Intent.SUCCESS}>EXPORT TO CSV</Button>
                    </div>
                    {results_display}
                </FormGroup>
            </Navbar>
        );
    }

    export = async () => {
        let results = await export_to_csv(this.state.new_csv_name);
        if (results.error) {
            AppToaster.show({
                                message: "Error exporting results to csv. Please file a bug report at https://github.com/jchmyz/DoublyLabeledWater/issues",
                                intent: "danger",
                                timeout: 0
                            });
        } else {
            AppToaster.show({
                                message: "Results successfully exported to " + results.saved_file,
                                intent: "success",
                                timeout: 3000
                            });
        }
    };

    submit_inputs = async () => {
        let datetimes = this.state.datetimes.map((value: moment.Moment) => {
            return value.toArray();
        });
        // months are zero-indexed in Moment.js
        datetimes.map((value: number[]) => {
            return value.splice(1, 1, value[1] + 1);
        });
        let results = await calculate_from_inputs(
            {
                d_meas: this.state.deuterium_deltas,
                o18_meas: this.state.oxygen_deltas,
                datetimes: datetimes,
                dose_weights: this.state.dose_weights,
                dose_enrichments: this.state.dose_enrichments,
                subject_weights: this.state.subject_weights,
                subject_id: this.state.subject_id,
                mixed_dose: this.state.mixed_dose,
                in_permil: (this.state.delta_units === DeltaUnits.permil)
            }
        );
        if (results.calculations && results.error_flags && results.rco2_ee) {
            this.setState({
                              results: {
                                  calculations: results.calculations,
                                  rco2_ee: results.rco2_ee,
                                  error_flags: results.error_flags
                              }
                          });
            AppToaster.show({
                                message: "Results calculated successfully", intent: "success", timeout: 3000
                            });
            if (this.scroll_anchor_ref.current) this.scroll_anchor_ref.current.scrollIntoView({behavior: "smooth"});
        }
    };

    clear = () => {
        this.setState({
                          input_csv_name: "",
                          deuterium_deltas: ["", "", "", "", ""],
                          oxygen_deltas: ["", "", "", "", ""],
                          datetimes: [this.now, this.now, this.now, this.now, this.now],
                          dose_weights: ["", ""],
                          dose_enrichments: ["", ""],
                          subject_weights: ["", ""],
                          subject_id: "",

                          deuterium_deltas_validated: false,
                          oxygen_deltas_validated: false,
                          datetimes_validated: false,
                          dose_weights_validated: false,
                          dose_enrichments_validated: false,
                          subject_weights_validated: false,

                          results: {calculations: null, rco2_ee: null, error_flags: null},
                      });
    };

    handle_csv_upload = async (event: FormEvent<HTMLInputElement>) => {
        let file = (event.target as any).files[0];
        if (file.type === "text/csv") {
            this.setState({input_csv_name: file.name});
            let reader = new FileReader();
            reader.onload = this._load_handler;
            reader.onerror = this._error_handler;
            await reader.readAsText(file);
        } else {
            AppToaster.show({
                                message: "Select a .csv file. For formatting help, press 'Help' in the upper right hand corner",
                                intent: "danger",
                                timeout: 0
                            });
        }
    };

    handle_csv_append_choice = (event: FormEvent<HTMLInputElement>) => {
        let file = (event.target as any).files[0];
        if (file.type === "text/csv") {
            this.setState({append_csv_name: file.name});
        } else {
            AppToaster.show({
                                message: "Select an existing .csv file.",
                                intent: "danger",
                                timeout: 0
                            });
        }
    };


    _load_handler = (event: ProgressEvent) => {
        console.log("into load handler");
        // @ts-ignore
        let csv = event.target.result;
        let all_text_lines = csv.split(/\r\n|\n/);
        let columns = all_text_lines[0].split(',');
        console.log('columns', columns);
        try {
            let data = all_text_lines[1].split(',');
            console.log('data is', data);
            //TODO: make this deal with other csv orders
            let d_deltas = data.slice(0, 5);
            let o_deltas = data.slice(5, 10);
            let sample_times = data.slice(10, 15);
            let dose_weights = data.slice(15, 17);
            let dose_enrichments = data.slice(17, 19);
            let subject_weights = data.slice(19, 21);
            let subject_id = data.slice(21, 22);
            for (let i = 0; i < d_deltas.length; i++) {
                this.handle_deuterium_delta_change(i, d_deltas[i]);
                this.handle_oxygen_delta_change(i, o_deltas[i]);
                this.handle_date_change(i, moment.utc(sample_times[i]));
            }
            for (let i = 0; i < dose_weights.length; i++) {
                this.handle_dose_weight_change(i, dose_weights[i]);
                this.handle_dose_enrichment_change(i, dose_enrichments[i]);
                this.handle_subject_weight_change(i, subject_weights[i]);
            }
            this.setState({subject_id: subject_id});
        } catch (e) {
            this._bad_format("");
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

    check_numerical_inputs = (input_aray: (string | number)[]) => {
        for (let value of input_aray) {
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
                                  deuterium_deltas_validated: this.check_numerical_inputs(new_deltas)
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
                                  oxygen_deltas_validated: this.check_numerical_inputs(new_deltas)
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
                }
                else if (value.isSame(new_date_array[j])) {
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
                                //both valid dates- don't need to worry about spaces, treat them as separate dates
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
        if (this.state.mixed_dose) {
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

}
