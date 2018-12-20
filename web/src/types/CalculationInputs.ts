// all actually numbers and dates, but passed as strings via the json

export interface CalculationInputs {
    d_deltas: string[],
    o_deltas: string[],
    datetimes: number[][],
    dose_weights: string[],
    mol_masses: string[],
    dose_enrichments: string[],
    subject_weights: string[],
    csv_name: string
}

export const BLANK_CALCULATION_INPUTS: CalculationInputs = {
    d_deltas: [],
    o_deltas: [],
    datetimes: [],
    dose_weights: [],
    mol_masses: [],
    dose_enrichments: [],
    subject_weights: [],
    csv_name: ""
};

export enum Timing {
    INITIAL = "initial",
    FINAL = "final"
}