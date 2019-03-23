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
    dlw_results = DLWSubject(np.asarray(input_data['d_deltas'], dtype=float),
                             np.asarray(input_data['o_deltas'], dtype=float),
                             np.asarray(datetimes),
                             np.asarray(input_data['dose_weights'], dtype=float),
                             np.asarray(input_data['mol_masses'], dtype=float),
                             np.asarray(input_data['dose_enrichments'], dtype=float),
                             np.asarray(input_data['subject_weights'], dtype=float))
    desired_csv_filename = input_data['csv_name']
    if desired_csv_filename:
        if desired_csv_filename.endswith('.csv'):
            dlw_results.save_results_csv(desired_csv_filename)
        else:
            dlw_results.save_results_csv(desired_csv_filename + '.csv')

    return json.dumps({
        "calculations": {
            "NdP (kg)": round(dlw_results.adj_nd_plat_avg_kg, 3),
            "kd/hour": round(dlw_results.kd, 3),
            "NoP (kg)": round(dlw_results.adj_no_plat_avg_kg, 3),
            "ko/hour": round(dlw_results.ko, 3),
            "Total Body Water Average (kg)": round(dlw_results.total_body_water_ave_kg, 3),
            "Fat Free Mass (kg)": round(dlw_results.fat_free_mass, 3),
            "Fat Mass (kg)": round(dlw_results.fat_free_mass, 3),
            "Body Fat Percentage": round(dlw_results.body_fat_percent, 3)
        },
        "rco2_ee": {
            "rCO2 (mol/day)": round(dlw_results.schoeller_co2_int_mol_day, 3),
            "rCO2 (L/day)": round(dlw_results.schoeller_co2_int_L_day, 3),
            "EE (kcal/day)": round(dlw_results.schoeller_tee_int, 3),
            "EE (MJ/day)": round(dlw_results.schoeller_tee_int_mj_day, 3)
        },
        "error_flags": {
            "2H plateau (<5%)": round(dlw_results.d_ratio_percent, 3),
            "18O Plateau (<5%)": round(dlw_results.o18_ratio_percent, 3),
            "DS ratio (1.000 - 1.070)": round(dlw_results.dil_space_ratio, 3),
            "EE (PD4-ED4 vs. PD5-ED5, <10%)": round(dlw_results.ee_check, 3),
            "Ko/kd (1.1 - 1.7)": round(dlw_results.ko_kd_ratio, 3)
        }
    })

@app.route('/')
def root():
    return send_from_directory(STATICS_LOCATION, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
