import * as React from "react";
import {CalculationInputs, LoadedCSVInputs} from "./types/CalculationInputs";
import {Results} from "./DLWApp";

interface CSVResults {
    error?: boolean
}

export interface CSVExportResults extends CSVResults {
    saved_file: string
}

export interface LoadedCSVResults extends CSVResults {
    results: LoadedCSVInputs | null
}

export async function calculate_from_inputs(inputs: CalculationInputs): Promise<Results> {
    let fetch_args = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs)
    };
    let response = await fetch('/calculate', fetch_args);
    return response.json();
}

export async function export_to_csv(filename: string): Promise<Blob|null> {
    let fetch_args = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"filename": filename})
    };
    let response = await fetch('/export', fetch_args);
    if (response.ok) {
        return response.blob();
    } else {
        return null;
    }
}

export async function load_from_csv(file: File): Promise<LoadedCSVResults> {
    let fetch_args = {method: 'POST', body: file};
    let response = await fetch('/load', fetch_args);
    if (response.ok) {
        return response.json();
    } else {
        return {error: true, results: null};
    }
}
