import * as React from "react";
import {CalculationInputs} from "./types/CalculationInputs";

async function calculate_from_inputs(inputs: CalculationInputs) {
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