from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
import json
import numpy as np
import datetime

from dlw import DLWSubject

STATICS_LOCATION = 'dist'

app = Flask(__name__, static_url_path='', static_folder=STATICS_LOCATION)
api = Api(app)


@app.route('/calculate', methods=['POST'])
def calculate_from_inputs():
    input_data = json.loads(request.get_data().decode('utf-8'))
    print('got input_data', input_data)
    datetimes = [datetime.datetime(l[0], l[1], l[2], l[3], l[4]) for l in input_data['datetimes']]
    dlw_results = DLWSubject(d_deltas=np.asarray(input_data['d_deltas'], dtype=float),
                             o_18deltas=np.asarray(input_data['o_deltas'], dtype=float),
                             sample_datetimes=np.asarray(datetimes),
                             dose_weights=np.asarray(input_data['dose_weights'], dtype=float),
                             mixed_dose=input_data['mixed_dose'],
                             dose_enrichments=np.asarray(input_data['dose_enrichments'], dtype=float),
                             subject_weights=np.asarray(input_data['subject_weights'], dtype=float),
                             subject_id=input_data['subject_id'])
    desired_csv_filename = input_data['csv_name']
    if desired_csv_filename:
        if desired_csv_filename.endswith('.csv'):
            dlw_results.save_results_csv(desired_csv_filename)
        else:
            dlw_results.save_results_csv(desired_csv_filename + '.csv')

    return json.dumps({
        "calculations": {
            "ndp_kg": ["NdP (kg)", round(dlw_results.nd['adj_plat_avg_kg'], 2)],
            "kd_hr": ["kd/hour", round(dlw_results.kd_per_hr, 3)],
            "nop_kg": ["NoP (kg)", round(dlw_results.no['adj_plat_avg_kg'], 3)],
            "ko_hr": ["ko/hour", round(dlw_results.ko_per_hr, 3)],
            "body_water_avg_kg": ["Total Body Water Average (kg)", round(dlw_results.total_body_water_ave_kg, 3)],
            "fat_free_mass_kg": ["Fat Free Mass (kg)", round(dlw_results.fat_free_mass_kg, 3)],
            "fat_mass_kg": ["Fat Mass (kg)", round(dlw_results.fat_mass_kg, 3)],
            "body_fat_percentage": ["Body Fat Percentage", round(dlw_results.body_fat_percent, 3)]
        },
        "rco2_ee": {
            "rco2_mol_day":["rCO2 (mol/day)", round(dlw_results.schoeller_co2_int_mol_day, 3)],
            "rco2_l_hr": ["rCO2 (L/hour)", round(dlw_results.schoeller_co2_int_L_hr, 3)],
            "ee_kcal_day": ["EE (kcal/day)", round(dlw_results.schoeller_tee_int_kcal_day, 3)],
            "ee_mj_day": ["EE (MJ/day)", round(dlw_results.schoeller_tee_int_mj_day, 3)]
        },
        "error_flags": {
            "plateau_2h": ["2H plateau (<5%)", round(dlw_results.d_ratio_percent, 3)],
            "plateau_180": ["18O Plateau (<5%)", round(dlw_results.o18_ratio_percent, 3)],
            "ds_ratio": ["DS ratio (1.000 - 1.070)", round(dlw_results.dil_space_ratio, 3)],
            "ee": ["EE (PD4-ED4 vs. PD5-ED5, <10%)", round(dlw_results.ee_check, 3)],
            "ko_kd": ["Ko/kd (1.1 - 1.7)", round(dlw_results.ko_kd_ratio, 3)]
        }
    })

@app.route('/')
def root():
    return send_from_directory(STATICS_LOCATION, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
