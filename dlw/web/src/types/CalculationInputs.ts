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
    pop_avg_rdil: string|null,
    exponential: boolean
}

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