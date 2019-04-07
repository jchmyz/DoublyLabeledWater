// all actually numbers and dates, but passed as strings via the json

export interface CalculationInputs {
    d_meas: string[],
    o18_meas: string[],
    datetimes: number[][],
    dose_weights: string[],
    dose_enrichments: string[],
    subject_weights: string[],
    subject_id: string,
    mixed_dose: boolean,
    in_permil: boolean,
}

export const BLANK_CALCULATION_INPUTS: CalculationInputs = {
    d_meas: [],
    o18_meas: [],
    datetimes: [],
    dose_weights: [],
    dose_enrichments: [],
    subject_weights: [],
    subject_id: "",
    mixed_dose: false,
    in_permil: true,
};

export enum Timing {
    INITIAL = "initial",
    FINAL = "final"
}