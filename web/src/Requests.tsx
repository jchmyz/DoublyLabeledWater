import * as React from "react";
import {CalculationInputs} from "./types/CalculationInputs";
import {Results} from "./DLWApp";

export interface CSVExportResults {
    saved_file: string
    error?: boolean
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

export async function export_to_csv(filename: string): Promise<CSVExportResults> {
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
        return response.json();
    } else {
        return {saved_file: "", error: true};
    }
}

