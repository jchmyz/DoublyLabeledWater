export interface CalculationInputs {
    deuterium_deltas: number[],
    oxygen_deltas: number[],
    datetimes: Date[],
    weights: number[],
    mol_masses: number[],
    dose_enrichments: number[],
    subject_weights: number[]
}

export enum Timing {
    INITIAL = "initial",
    FINAL = "final"
}