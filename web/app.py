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
        "ko kd ratio": dlw_results.ko_kd_ratio,
        "adj nd plat avg kg": dlw_results.adj_nd_plat_avg_kg,
        "adj no plat avg kg": dlw_results.adj_no_plat_avg_kg,
        "dil space ratio": dlw_results.dil_space_ratio,
        "rCO2_mol/day": dlw_results.schoeller_co2_int_mol_day,
        "rCO2_L/day": dlw_results.schoeller_co2_int_L_day,
        "schoeller_tee_int": dlw_results.schoeller_tee_int,
        "schoeller_tee_int_mj_day": dlw_results.schoeller_tee_int_mj_day,
    })


@app.route('/')
def root():
    return send_from_directory(STATICS_LOCATION, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
