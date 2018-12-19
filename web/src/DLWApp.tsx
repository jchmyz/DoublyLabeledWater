import * as React from "react";
import {FormGroup, NumericInput} from "@blueprintjs/core";
import * as DateTimePicker from 'react-datetime';
import {Moment} from "moment";
import {Timing} from "./types/CalculationInputs";

const DEUTERIUM = "Deuterium";
const OXYGEN = "Oxygen 18";

const NUM_SAMPLE_TIMES = 5;

const ELEMENTS = [DEUTERIUM, OXYGEN];
const BLANK_DATE = new Date();

interface DLWState {
    deuterium_deltas: (string | number)[],
    oxygen_deltas: (string | number)[],
    datetimes: (string | Date)[],
    dose_weights: (string | number)[],
    mol_masses: (string | number)[],
    dose_enrichments: (string | number)[],
    subject_weights: (string | number)[]
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
            subject_weights: ["", ""]
        };
    }

    render() {
        let deuterium_delta_inputs: JSX.Element[] = [];
        let oxygen_delta_inputs: JSX.Element[] = [];
        let collection_time_inputs: JSX.Element[] = [];
        for (let i = 0; i < NUM_SAMPLE_TIMES; i++) {
            deuterium_delta_inputs.push(
                <NumericInput onValueChange={(valueAsNumber) => this.handle_deuterium_delta_change(i, valueAsNumber)}
                              buttonPosition={"none"} leftIcon="delta" large={true} key={i}
                              value={this.state.deuterium_deltas[i]}/>);
            oxygen_delta_inputs.push(
                <NumericInput onValueChange={(valueAsNumber) => this.handle_oxygen_delta_change(i, valueAsNumber)}
                              buttonPosition={"none"} leftIcon="delta" large={true} key={i}
                              value={this.state.oxygen_deltas[i]}/>);
            collection_time_inputs.push(
                <DateTimePicker onChange={this.handle_date_change} key={i} value={this.state.datetimes[i]}/>
            );
        }

        let dose_weight_inputs: JSX.Element[] = [];
        let mol_mass_inputs: JSX.Element[] = [];
        let dose_enrichment_inputs: JSX.Element[] = [];
        for (let i = 0; i < ELEMENTS.length; i++) {
            dose_weight_inputs.push(
                <NumericInput onValueChange={(valueAsNumber) => this.handle_dose_weight_change(i, valueAsNumber)}
                              buttonPosition={"none"} large={true} key={i} value={this.state.dose_weights[i]}
                              placeholder={ELEMENTS[i] + ' dose weight (g)'}/>);
            mol_mass_inputs.push(
                <NumericInput onValueChange={(valueAsNumber) => this.handle_mol_mass_change(i, valueAsNumber)}
                              buttonPosition={"none"} large={true} key={i} value={this.state.mol_masses[i]}
                              placeholder={ELEMENTS[i] + ' molecular mass (g/mol)'}/>);
            dose_enrichment_inputs.push(
                <NumericInput onValueChange={(valueAsNumber) => this.handle_dose_enrichment_change(i, valueAsNumber)}
                              buttonPosition={"none"} large={true} key={i} value={this.state.dose_enrichments[i]}
                              placeholder={ELEMENTS[i] + ' dose enrichment (ppm)'}/>);
        }

        return (
            <FormGroup className='dlw-app' label="Doubly Labeled Water Inputs">
                <div>
                    <div>
                        <h5>Deuterium Delta Values</h5>
                        {deuterium_delta_inputs}
                    </div>
                    <div>
                        <h5>Oxygen 18 Delta Values</h5>
                        {oxygen_delta_inputs}
                    </div>
                </div>
                <div>
                    <h5>Collection Dates and Times</h5>
                    {collection_time_inputs}
                </div>
                <div>
                    <h5>Dose Weights</h5>
                    {dose_weight_inputs}
                    <h5>Dose Enrichments</h5>
                    {dose_enrichment_inputs}
                    <h5>Molecular Masses</h5>
                    {mol_mass_inputs}
                </div>
                <div>
                    <h5>Subject Weights</h5>
                    <NumericInput
                        onValueChange={(valueAsNumber) => this.handle_subject_weight_change(0, valueAsNumber)}
                        buttonPosition={"none"} large={true} key={'initial'} value={this.state.subject_weights[0]}
                        placeholder={"Initial subject weight (kg)"}/>

                    <NumericInput
                        onValueChange={(valueAsNumber) => this.handle_subject_weight_change(1, valueAsNumber)}
                        buttonPosition={"none"} large={true} key={'final'} placeholder={"Final subject weight (kg)"}
                        value={this.state.subject_weights[1]}/>
                </div>
            </FormGroup>
        );
    }

    handle_deuterium_delta_change = (i: number, valueAsNumber: number) => {
        let new_deltas = this.state.deuterium_deltas;
        new_deltas.splice(i, 1, valueAsNumber);
        this.setState({deuterium_deltas: new_deltas});
        console.log('deuterium deltas are now', this.state.deuterium_deltas);
    };

    handle_oxygen_delta_change = (i: number, valueAsNumber: number) => {
        let new_deltas = this.state.oxygen_deltas;
        new_deltas.splice(i, 1, valueAsNumber);
        this.setState({oxygen_deltas: new_deltas});
        console.log('oxygen deltas are now', this.state.oxygen_deltas);
    };

    handle_date_change = (value: string | Moment) => {
        // convert to my datetime format
        console.log('got new date', value);
    };

    handle_dose_weight_change = (i: number, valueAsNumber: number) => {
        let new_dose_weights = this.state.dose_weights;
        new_dose_weights.splice(i, 1, valueAsNumber);
        this.setState({dose_weights: new_dose_weights});
        console.log('got value dose weight', this.state.dose_weights);
    };

    handle_mol_mass_change = (i: number, valueAsNumber: number) => {
        let mol_mass_copy = this.state.mol_masses;
        mol_mass_copy.splice(i, 1, valueAsNumber);
        this.setState({mol_masses: mol_mass_copy});
        console.log('mm are now', this.state.mol_masses);
    };

    handle_dose_enrichment_change = (i: number, valueAsNumber: number) => {
        let new_enrichments = this.state.dose_enrichments;
        new_enrichments.splice(i, 1, valueAsNumber);
        this.setState({dose_enrichments: new_enrichments});
        console.log('enrichments are now', this.state.dose_enrichments);
    };

    handle_subject_weight_change = (i: number, valueAsNumber: number) => {
        let new_weights = this.state.subject_weights;
        new_weights.splice(i, 1, valueAsNumber);
        this.setState({subject_weights: new_weights});
        console.log('subject weights are now', this.state.subject_weights);
    };

}