import * as React from "react";
import {
    ButtonGroup, Popover,
    FormGroup,
    NumericInput,
    Button, Toaster, Position,
    InputGroup, Alignment, Tag, FileInput, Dialog, Checkbox
} from "@blueprintjs/core";
import * as DateTimePicker from 'react-datetime';
import {Moment, utc} from "moment";
import {calculate_from_inputs} from "./Requests";
import {FormEvent} from "react";
import {Card, Icon, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core/lib/cjs";
import {NumberInput} from "./NumberInput";

const DEUTERIUM = "Deuterium";
const OXYGEN = "Oxygen 18";
const ELEMENTS = [DEUTERIUM, OXYGEN];

const NUM_SAMPLE_TIMES = 5;
const SAMPLE_LABELS = ['Background', 'PD4', 'PD5', 'ED4', 'ED5'];


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

interface DLWState {
    input_csv_name: string;
    info_overlay_open: boolean;

    deuterium_deltas: string[],
    oxygen_deltas: string[],
    datetimes: (string | Moment)[],
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
    dates_chronological: boolean[]

    results: Results
    csv_name: string,
}

const AppToaster = Toaster.create({className: "app-toaster", position: Position.TOP_RIGHT});

export class DLWApp extends React.Component<any, DLWState> {
    constructor(props: any) {
        super(props);
        this.state = {
            input_csv_name: "",
            info_overlay_open: false,

            deuterium_deltas: ["", "", "", "", ""],
            oxygen_deltas: ["", "", "", "", ""],
            datetimes: ["", "", "", "", ""],
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
            dates_chronological: [true, true, true, true, true],

            results: {calculations: null, rco2_ee: null, error_flags: null},
            csv_name: "",
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
                             change_function={this.handle_deuterium_delta_change} unit={"permil"}
                             value={this.state.deuterium_deltas[i]}/>);
            oxygen_delta_inputs.push(
                <NumberInput placeholder={SAMPLE_LABELS[i] + ' Oxygen 18 delta'} index={i} key={i} unit={"permil"}
                             change_function={this.handle_oxygen_delta_change} value={this.state.oxygen_deltas[i]}/>);
            collection_time_inputs.push(
                <Popover content={<p>Collection time inputs must be in chronological order.</p>}
                         className='date-warning-popover' isOpen={!this.state.dates_chronological[i]}>
                    <DateTimePicker onChange={(value) => this.handle_date_change(i, value)}
                                    inputProps={{
                                        className: 'date-input-box .bp3-input',
                                        placeholder: ' ' + SAMPLE_LABELS[i] + ' sample date and time'
                                    }}
                                    key={i} value={this.state.datetimes[i]} dateFormat="YYYY-MM-DD" timeFormat="HH:mm"/>
                </Popover>
            );
        }

        let dose_weight_inputs: JSX.Element[] = [];
        let dose_enrichment_inputs: JSX.Element[] = [];
        for (let i = 0; i < ELEMENTS.length; i++) {
            dose_weight_inputs.push(
                <NumberInput placeholder={ELEMENTS[i] + ' dose weight (g)'} index={i} key={i} unit={"g"}
                             change_function={this.handle_dose_weight_change} value={this.state.dose_weights[i]}/>);
            dose_enrichment_inputs.push(
                <NumberInput placeholder={ELEMENTS[i] + ' dose enrichment (ppm)'} index={i} key={i}
                             change_function={this.handle_dose_enrichment_change}
                             value={this.state.dose_enrichments[i]} unit={"ppm"}/>);
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
                    <p className="result-value">{this.state.results.calculations.body_fat_percentage[1] + " kg"}</p>
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
            results_display = (
                <div className='results-display'>
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
                        <div className='inputs-by-element'>
                            <Checkbox checked={this.state.mixed_dose} label="Mixed Dose" onChange={() => {
                                this.setState({mixed_dose: !this.state.mixed_dose})
                            }}/>
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
                            <h5>Subject ID</h5>
                            <InputGroup leftIcon={(this.state.subject_id ? "tick" : "circle-arrow-right")}
                                        className={'.bp3-fill'}
                                        onChange={(event: FormEvent<HTMLElement>) => this.setState({subject_id: event.target.value})}
                                        placeholder='ID' value={this.state.subject_id}/>
                        </div>
                    </div>
                    <div className='submit-group'>
                        <InputGroup placeholder='Results CSV filename (optional)' className='csv-name-input'
                                    onChange={(event: FormEvent<HTMLElement>) =>
                                        this.setState({csv_name: (event.target as HTMLInputElement).value})}/>
                        <Button onClick={this.submit_inputs} disabled={!all_inputs_validated}>SUBMIT</Button>
                    </div>
                    {results_display}
                </FormGroup>
            </Navbar>
        );
    }

    submit_inputs = async () => {
        let datetimes = this.state.datetimes.map((value: Moment) => {
            return value.toArray();
        });
        let results = await calculate_from_inputs(
            {
                d_deltas: this.state.deuterium_deltas,
                o_deltas: this.state.oxygen_deltas,
                datetimes: datetimes,
                dose_weights: this.state.dose_weights,
                dose_enrichments: this.state.dose_enrichments,
                subject_weights: this.state.subject_weights,
                csv_name: this.state.csv_name,
                subject_id: this.state.subject_id,
                mixed_dose: this.state.mixed_dose
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

        }
    };

    handle_csv_upload = async (event: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        let file = event.target.files[0];
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
            //make this more modular deal with other csv orders
            let d_deltas = data.slice(0, 5);
            let o_deltas = data.slice(5, 10);
            let sample_times = data.slice(10, 15);
            let dose_weights = data.slice(15, 17);
            let dose_enrichments = data.slice(17, 19);
            let subject_weights = data.slice(19, 21);
            let subject_id = data.slice(21, 22);
            for (let i = 0; i < d_deltas.length; i++) {
                this.handle_deuterium_delta_change(i, {target: {value: d_deltas[i]}});
                this.handle_oxygen_delta_change(i, {target: {value: o_deltas[i]}});
                this.handle_date_change(i, utc(sample_times[i]));
            }
            for (let i = 0; i < dose_weights.length; i++) {
                this.handle_dose_weight_change(i, {target: {value: dose_weights[i]}});
                this.handle_dose_enrichment_change(i, {target: {value: dose_enrichments[i]}});
                this.handle_subject_weight_change(i, {target: {value: subject_weights[i]}});
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

    handle_deuterium_delta_change = (index: number, event: FormEvent<HTMLElement>) => {
        let value = (event.target as HTMLInputElement).value;
        if (!isNaN(+value)) {
            let new_deltas = this.state.deuterium_deltas;
            new_deltas.splice(index, 1, value);
            this.setState({
                              deuterium_deltas: new_deltas,
                              deuterium_deltas_validated: this.check_numerical_inputs(new_deltas)
                          });
        }
    };

    handle_oxygen_delta_change = (index: number, event: FormEvent<HTMLElement>) => {
        let value = (event.target as HTMLInputElement).value;
        if (!isNaN(+value)) {
            let new_deltas = this.state.oxygen_deltas;
            new_deltas.splice(index, 1, value);
            this.setState({
                              oxygen_deltas: new_deltas,
                              oxygen_deltas_validated: this.check_numerical_inputs(new_deltas)
                          });
        }
    };

    handle_date_change = (i: number, value: string | Moment) => {
        console.log('into handle date change- got value', value, typeof(value));
        if (typeof value != "string") {
            let all_dates_filled = true;
            let new_date_array = this.state.datetimes;
            let dates_chronological = this.state.dates_chronological;
            dates_chronological.splice(i, 1, true);
            for (let j = 0; j < i; j++) {
                if (typeof(new_date_array[j]) != "string") {
                    if (value.isBefore(new_date_array[j])) {
                        dates_chronological.splice(i, 1, false);
                        all_dates_filled = false;
                        break;
                    }
                }
            }
            new_date_array.splice(i, 1, value);
            for (let date of new_date_array) {
                if (typeof date === "string") {
                    all_dates_filled = false;
                    break;
                }
            }
            this.setState({
                              datetimes: new_date_array,
                              datetimes_validated: all_dates_filled,
                              dates_chronological: dates_chronological
                          })
        }
    };

    handle_dose_weight_change = (index: number, event: FormEvent<HTMLElement>) => {
        let value = (event.target as HTMLInputElement).value;
        if (!isNaN(+value)) {
            let new_dose_weights = this.state.dose_weights;
            new_dose_weights.splice(index, 1, value);
            this.setState({
                              dose_weights: new_dose_weights,
                              dose_weights_validated: this.check_numerical_inputs(new_dose_weights)
                          });
        }
    };

    handle_dose_enrichment_change = (index: number, event: FormEvent<HTMLElement>) => {
        let value = (event.target as HTMLInputElement).value;
        if (!isNaN(+value)) {
            let new_enrichments = this.state.dose_enrichments;
            new_enrichments.splice(index, 1, value);
            this.setState({
                              dose_enrichments: new_enrichments,
                              dose_enrichments_validated: this.check_numerical_inputs(new_enrichments)
                          });
        }
    };

    handle_subject_weight_change = (index: number, event: FormEvent<HTMLElement>) => {
        let value = (event.target as HTMLInputElement).value;
        if (!isNaN(+value)) {
            let new_weights = this.state.subject_weights;
            new_weights.splice(index, 1, value);
            this.setState({
                              subject_weights: new_weights,
                              subject_weights_validated: this.check_numerical_inputs(new_weights)
                          });
        }
    };

}
