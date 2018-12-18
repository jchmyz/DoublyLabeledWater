from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
import json

from dlw import DLWSubject

STATICS_LOCATION = 'dist'

app = Flask(__name__, static_url_path='', static_folder=STATICS_LOCATION)
api = Api(app)


@app.route('/calculate', methods=['POST'])
def calculate_from_inputs():
    input_data = json.loads(request.get_data().decode('utf-8'))
    dlw_results = DLWSubject(input_data.d_deltas,
                             input_data.o_deltas,
                             input_data.datetimes,
                             input_data.weights,
                             input_data.mol_masses,
                             input_data.dose_enrichments,
                             input_data.subject_weights)
    return {
        "ko_kd_ratio": dlw_results.ko_kd_ratio,
        "adj_nd_plat_avg_kg": dlw_results.adj_nd_plat_avg_kg,
        "adj_no_plat_avg_kg": dlw_results.adj_no_plat_avg_kg,
        "dil_space_ratio": dlw_results.dil_space_ratio
    }


@app.route('/')
def root():
    return send_from_directory(STATICS_LOCATION, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
