from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
import json
import numpy as np
import datetime

from dlw import DLWSubject

STATICS_LOCATION = 'dist'

app = Flask(__name__, static_url_path='', static_folder=STATICS_LOCATION)
api = Api(app)

CALCULATED_RESULTS = None  # type: DLWSubject


@app.route('/calculate', methods=['POST'])
def calculate_from_inputs():
    input_data = json.loads(request.get_data().decode('utf-8'))
    datetimes = [datetime.datetime(l[0], l[1], l[2], l[3], l[4]) for l in input_data['datetimes']]
    global CALCULATED_RESULTS
    CALCULATED_RESULTS = DLWSubject(d_meas=np.asarray(input_data['d_meas'], dtype=float),
                                    o18_meas=np.asarray(input_data['o18_meas'], dtype=float),
                                    sample_datetimes=np.asarray(datetimes),
                                    dose_weights=np.asarray(input_data['dose_weights'], dtype=float),
                                    mixed_dose=input_data['mixed_dose'],
                                    dose_enrichments=np.asarray(input_data['dose_enrichments'], dtype=float),
                                    subject_weights=np.asarray(input_data['subject_weights'], dtype=float),
                                    subject_id=input_data['subject_id'],
                                    in_permil=input_data['in_permil'])

    return json.dumps({
        "calculations": {
            "ndp_kg": ["NdP (kg)", round(CALCULATED_RESULTS.nd['adj_plat_avg_kg'], 2)],
            "kd_hr": ["kd/hour", round(CALCULATED_RESULTS.kd_per_hr, 3)],
            "nop_kg": ["NoP (kg)", round(CALCULATED_RESULTS.no['adj_plat_avg_kg'], 3)],
            "ko_hr": ["ko/hour", round(CALCULATED_RESULTS.ko_per_hr, 3)],
            "body_water_avg_kg": ["Total Body Water Average (kg)",
                                  round(CALCULATED_RESULTS.total_body_water_ave_kg, 3)],
            "fat_free_mass_kg": ["Fat Free Mass (kg)", round(CALCULATED_RESULTS.fat_free_mass_kg, 3)],
            "fat_mass_kg": ["Fat Mass (kg)", round(CALCULATED_RESULTS.fat_mass_kg, 3)],
            "body_fat_percentage": ["Body Fat Percentage", round(CALCULATED_RESULTS.body_fat_percent, 3)]
        },
        "rco2_ee": {
            "rco2_mol_day": ["rCO2 (mol/day)", round(CALCULATED_RESULTS.schoeller_co2_int_mol_day, 3)],
            "rco2_l_hr": ["rCO2 (L/hour)", round(CALCULATED_RESULTS.schoeller_co2_int_L_hr, 3)],
            "ee_kcal_day": ["EE (kcal/day)", round(CALCULATED_RESULTS.schoeller_tee_int_kcal_day, 3)],
            "ee_mj_day": ["EE (MJ/day)", round(CALCULATED_RESULTS.schoeller_tee_int_mj_day, 3)]
        },
        "error_flags": {
            "plateau_2h": ["2H plateau (<5%)", round(CALCULATED_RESULTS.d_ratio_percent, 3)],
            "plateau_180": ["18O Plateau (<5%)", round(CALCULATED_RESULTS.o18_ratio_percent, 3)],
            "ds_ratio": ["DS ratio (1.000 - 1.070)", round(CALCULATED_RESULTS.dil_space_ratio, 3)],
            "ee": ["EE (PD4-ED4 vs. PD5-ED5, <10%)", round(CALCULATED_RESULTS.ee_check, 3)],
            "ko_kd": ["Ko/kd (1.1 - 1.7)", round(CALCULATED_RESULTS.ko_kd_ratio, 3)]
        }
    })


@app.route('/export', methods=['POST'])
def export_to_csv():
    input_data = json.loads(request.get_data().decode('utf-8'))
    csv_filename = input_data['filename']
    if csv_filename.endswith('.csv'):
        saved_file = CALCULATED_RESULTS.save_results_csv(csv_filename)
    else:
        saved_file = CALCULATED_RESULTS.save_results_csv(csv_filename + '.csv')
    return json.dumps({"saved_file": saved_file})


@app.route('/')
def root():
    return send_from_directory(STATICS_LOCATION, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
