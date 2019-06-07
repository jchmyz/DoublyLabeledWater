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

export enum Timing {
    INITIAL = "initial",
    FINAL = "final"
}

export const EXPECTED_CSV_FIELDS = [
    'd_meas_1', 'd_meas_2', 'd_meas_3', 'd_meas_4', 'd_meas_5',
    'o_meas_1', 'o_meas_2', 'o_meas_3', 'o_meas_4', 'o_meas_5',
    'sample_times_1', 'sample_times_2', 'sample_times_3', 'sample_times_4', 'sample_times_5', 'sample_times_6',
    'dose_weight_d', 'dose_weight_o',
    'dose_enrichment_d', 'dose_enrichment_o',
    'subject_weight_initial', 'subject_weight_final',
    'subject_id'
];

export interface LoadedCSVInputs {
    d_meas_1: string,
    d_meas_2: string,
    d_meas_3: string,
    d_meas_4: string,
    d_meas_5: string,
    o_meas_1: string,
    o_meas_2: string,
    o_meas_3: string,
    o_meas_4: string,
    o_meas_5: string,
    sample_time_1: string,
    sample_time_2: string,
    sample_time_3: string,
    sample_time_4: string,
    sample_time_5: string,
    sample_time_6: string,
    dose_weight_d?: string,
    dose_weight_o?: string,
    dose_weight?: string
    dose_enrichment_d: string,
    dose_enrichment_o: string,
    subject_weight_initial: string,
    subject_weight_final: string,
    subject_id: string,
    pop_dilution_space_ratio: string,
    in_permil?: string
}