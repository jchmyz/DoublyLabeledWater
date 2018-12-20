import * as React from "react";
import {
    ButtonGroup,
    FormGroup,
    NumericInput,
    Button,
    Intent,
    IconName,
    ControlGroup,
    InputGroup, Alignment, Tag
} from "@blueprintjs/core";
import * as DateTimePicker from 'react-datetime';
import {Moment} from "moment";
import {calculate_from_inputs} from "./Requests";
import {FormEvent} from "react";
import {Card, Icon, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core/lib/cjs";

const DEUTERIUM = "Deuterium";
const OXYGEN = "Oxygen 18";
const ELEMENTS = [DEUTERIUM, OXYGEN];

const NUM_SAMPLE_TIMES = 5;
const SAMPLE_LABELS = ['Background', 'PD4', 'PD5', 'ED4', 'ED5'];


interface DLWState {
    deuterium_deltas: string[],
    oxygen_deltas: string[],
    datetimes: (string | Moment)[],
    dose_weights: string[],
    mol_masses: string[],
    dose_enrichments: string[],
    subject_weights: string[],

    deuterium_deltas_validated: boolean,
    oxygen_deltas_validated: boolean,
    datetimes_validated: boolean,
    dose_weights_validated: boolean,
    mol_masses_validated: boolean,
    dose_enrichments_validated: boolean,
    subject_weights_validated: boolean,

    results: string[],
    csv_name: string,
}

export class DLWApp extends React.Component<any, DLWState> {
    constructor(props: any) {
        super(props);
        this.state = {
            deuterium_deltas: ["", "", "", "", ""],
            oxygen_deltas: ["", "", "", "", ""],
            datetimes: ["", "", "", "", ""],
            dose_weights: ["", ""],
            mol_masses: ["", ""],
            dose_enrichments: ["", ""],
            subject_weights: ["", ""],

            deuterium_deltas_validated: false,
            oxygen_deltas_validated: false,
            datetimes_validated: false,
            dose_weights_validated: false,
            mol_masses_validated: false,
            dose_enrichments_validated: false,
            subject_weights_validated: false,

            results: [],
            csv_name: "",
        };
    }

    render() {
        let all_inputs_validated =
            (this.state.deuterium_deltas_validated && this.state.oxygen_deltas_validated
                && this.state.datetimes_validated && this.state.dose_weights_validated
                && this.state.mol_masses_validated && this.state.dose_enrichments_validated
                && this.state.subject_weights_validated);

        console.log('all inputs validated?', all_inputs_validated, ' state ', this.state);

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
                <DateTimePicker onChange={(value) => this.handle_date_change(i, value)}
                                inputProps={{
                                    className: 'date-input-box .bp3-input',
                                    placeholder: ' ' + SAMPLE_LABELS[i] + ' sample date and time'
                                }}
                                key={i} value={this.state.datetimes[i]} dateFormat="YYYY-MM-DD" timeFormat="HH:mm"/>
            );
        }

        let dose_weight_inputs: JSX.Element[] = [];
        let mol_mass_inputs: JSX.Element[] = [];
        let dose_enrichment_inputs: JSX.Element[] = [];
        for (let i = 0; i < ELEMENTS.length; i++) {
            dose_weight_inputs.push(
                <NumberInput placeholder={ELEMENTS[i] + ' dose weight (g)'} index={i} key={i} unit={"g"}
                             change_function={this.handle_dose_weight_change} value={this.state.dose_weights[i]}/>);
            mol_mass_inputs.push(
                <NumberInput placeholder={ELEMENTS[i] + ' molecular mass (g/mol)'} index={i} key={i} unit={"g/mol"}
                             change_function={this.handle_mol_mass_change} value={this.state.mol_masses[i]}/>);
            dose_enrichment_inputs.push(
                <NumberInput placeholder={ELEMENTS[i] + ' dose enrichment (ppm)'} index={i} key={i}
                             change_function={this.handle_dose_enrichment_change}
                             value={this.state.dose_enrichments[i]} unit={"ppm"}/>);
        }

        let results_display: JSX.Element = <div/>;
        if (this.state.results.length > 0) {
            let results_p: JSX.Element[] = [];
            for (let result of this.state.results) {
                results_p.push(<p>{result}</p>);
            }

            results_display = (
                <div className='results-display'>
                    <Card className='results-card'>
                        <div>
                            <h4>Calculations</h4>
                            {results_p}
                        </div>
                    </Card>
                </div>
            )
        }

        return (
            <Navbar className='dlw-nav'>
                <NavbarGroup align={Alignment.LEFT}>
                    <Navbar.Heading className='dlw-title'>Doubly Labeled Water</Navbar.Heading>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <NavbarHeading className='tagline'>an open source project by the University of Colorado School of
                        Medicine</NavbarHeading>
                    <NavbarDivider/>
                    <a href="https://github.com/jchmyz/DoublyLabeledWater" target="_blank">DoublyLabeledWater on
                        GitHub</a>
                </NavbarGroup>
                <FormGroup className='dlw-app'>
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
                            <h5>Molecular Mass</h5>
                            {mol_mass_inputs}
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
                mol_masses: this.state.mol_masses,
                subject_weights: this.state.subject_weights,
                csv_name: this.state.csv_name
            }
        );
        console.log('got results', results);
        let result_entries = Object.entries(results);
        let results_array = [];
        for (let [name, value] of result_entries) {
            results_array.push(name + ": " + value);
        }
        this.setState({results: results_array});
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
        if (typeof value != "string") {
            let new_date_array = this.state.datetimes;
            new_date_array.splice(i, 1, value);
            let all_dates_filled = true;
            for (let date of new_date_array) {
                if (typeof date === "string") {
                    all_dates_filled = false;
                    break;
                }
            }
            this.setState({datetimes: new_date_array, datetimes_validated: all_dates_filled})
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

    handle_mol_mass_change = (index: number, event: FormEvent<HTMLElement>) => {
        let value = (event.target as HTMLInputElement).value;
        if (!isNaN(+value)) {
            let new_mol_masses = this.state.mol_masses;
            new_mol_masses.splice(index, 1, value);
            this.setState({
                              mol_masses: new_mol_masses,
                              mol_masses_validated: this.check_numerical_inputs(new_mol_masses)
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

interface NumberInputProps {
    placeholder: string,
    index: number,
    change_function: (index: number, event: FormEvent<HTMLElement>) => void
    value: string,
    unit: string
}

export class NumberInput extends React.Component<NumberInputProps> {

    render() {
        let icon: IconName = "circle-arrow-right";
        if (this.props.value === "") {
            icon = "circle-arrow-right";
        } else if (!isNaN(+this.props.value)) {
            icon = "tick";
        } else {
            icon = "ban-circle";
        }

        return (
            <ControlGroup fill={true}>
                <InputGroup
                    leftIcon={icon} className={'.bp3-fill'} rightElement={<Tag>{this.props.unit}</Tag>}
                    onChange={(event: FormEvent<HTMLElement>) => this.props.change_function(this.props.index, event)}
                    placeholder={this.props.placeholder} value={this.props.value}/>
            </ControlGroup>
        );
    }
}
