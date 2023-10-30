// all actually numbers and dates, but passed as strings via the json
export enum DeltaUnits {
    permil = "permil",
    ppm = "ppm"
}

export interface CalculationInputs {
    d_meas: string[],
    o18_meas: string[],
    datetimes: number[][],
    dose_weights: string[],
    dose_enrichments: string[],
    rq: string,
    subject_weights: string[],
    subject_id: string,
    mixed_dose: boolean,
    in_permil: boolean,
    pop_avg_rdil: string|null,
    exponential: boolean,
    fat_free_mass_factor: string,
}

export interface LoadedCSVInputs {
    d_meas: string,
    o_meas: string,
    sample_times: string,
    dose_weight_d?: string,
    dose_weight_o?: string,
    dose_weight?: string
    dose_enrichment_d: string,
    dose_enrichment_o: string,
    rq?: string,
    subject_weight_initial: string,
    subject_weight_final: string,
    subject_id: string,
    pop_dilution_space_ratio: string,
    delta_units: DeltaUnits // permil or ppm
    exponential_fit?: string
    fat_free_mass_factor?: string,
}