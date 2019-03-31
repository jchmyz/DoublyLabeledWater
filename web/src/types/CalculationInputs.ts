// all actually numbers and dates, but passed as strings via the json

export interface CalculationInputs {
    d_deltas: string[],
    o_deltas: string[],
    datetimes: number[][],
    dose_weights: string[],
    dose_enrichments: string[],
    subject_weights: string[],
    csv_name: string,
    subject_id: string,
    mixed_dose: boolean
}

export const BLANK_CALCULATION_INPUTS: CalculationInputs = {
    d_deltas: [],
    o_deltas: [],
    datetimes: [],
    dose_weights: [],
    dose_enrichments: [],
    subject_weights: [],
    csv_name: "",
    subject_id: "",
    mixed_dose: false
};

export enum Timing {
    INITIAL = "initial",
    FINAL = "final"
}