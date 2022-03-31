from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
import json
import numpy as np
import datetime
import csv
import click

from dlw import DLWSubject

STATICS_LOCATION = 'dist'

app = Flask(__name__, static_url_path='', static_folder=STATICS_LOCATION)
api = Api(app)

CALCULATED_RESULTS = None  # type: DLWSubject


@app.route('/calculate', methods=['POST'])
def calculate_from_inputs():
    input_data = json.loads(request.get_data().decode('utf-8'))
    datetimes = [datetime.datetime(l[0], l[1], l[2], l[3], l[4]) for l in input_data['datetimes']]
    d_meas = [d if d != "" else np.nan for d in input_data['d_meas']]
    o_meas = [d if d != "" else np.nan for d in input_data['o18_meas']]
    global CALCULATED_RESULTS
    CALCULATED_RESULTS = DLWSubject(d_meas=np.asarray(d_meas, dtype=float),
                                    o18_meas=np.asarray(o_meas, dtype=float),
                                    sample_datetimes=np.asarray(datetimes),
                                    dose_weights=np.asarray(input_data['dose_weights'], dtype=float),
                                    mixed_dose=input_data['mixed_dose'],
                                    dose_enrichments=np.asarray(input_data['dose_enrichments'], dtype=float),
                                    rq=float(input_data['rq']) if input_data['rq'] else None,
                                    subject_weights=np.asarray(input_data['subject_weights'], dtype=float),
                                    subject_id=input_data['subject_id'],
                                    in_permil=input_data['in_permil'],
                                    expo_calc=input_data['exponential'],
                                    pop_avg_rdil=float(input_data['pop_avg_rdil']) if input_data[
                                        'pop_avg_rdil'] else None)

    def sort_calculated_results(results):
        return {
            "rco2_ee_int": {
                "rco2_mol_day": ["rCO2 (mol/day)", round(results['co2_int_mol_day'], 2)],
                "rco2_l_hr": ["rCO2 (L/day)", round(results['co2_int_L_day'], 1)],
                "ee_kcal_day": ["EE (kcal/day)", round(results['tee_int_kcal_day'], 1)],
                "ee_mj_day": ["EE (MJ/day)", round(results['tee_int_mj_day'], 2)]
            },
            "rco2_ee_plat": {
                "rco2_mol_day": ["rCO2 (mol/day)", round(results['co2_plat_mol_day'], 2)],
                "rco2_l_hr": ["rCO2 (L/day)", round(results['co2_plat_L_day'], 1)],
                "ee_kcal_day": ["EE (kcal/day)", round(results['tee_plat_kcal_day'], 1)],
                "ee_mj_day": ["EE (MJ/day)", round(results['tee_plat_mj_day'], 2)]
            }
        }

    if np.isnan(CALCULATED_RESULTS.d_ratio_percent):
        plateau_2h = ["2H plateau (<5%)", "N/A (missing data)"]
    else:
        plateau_2h = ["2H plateau (<5%)", str(round(CALCULATED_RESULTS.d_ratio_percent, 2)) + "%"]

    if np.isnan(CALCULATED_RESULTS.o18_ratio_percent):
        plateau_o18 = ["18O Plateau (<5%)", "N/A (missing data)"]
    else:
        plateau_o18 = ["18O Plateau (<5%)", str(round(CALCULATED_RESULTS.o18_ratio_percent, 2)) + "%"]

    if np.isnan(CALCULATED_RESULTS.ee_check):
        ee = ["EE (PD4-ED4 vs. PD5-ED5, <10%)", "N/A (missing data)"]
    else:
        ee = ["EE (PD4-ED4 vs. PD5-ED5, <10%)", str(round(CALCULATED_RESULTS.ee_check, 4)) + "%"]

    return json.dumps({
        "results": {
            "calculations": {
                "ndp_kg": ["NdP (kg)", round(CALCULATED_RESULTS.nd['adj_plat_avg_kg'], 1)],
                "kd_hr": ["kd/hour", round(CALCULATED_RESULTS.kd_per_hr, 6)],
                "nop_kg": ["NoP (kg)", round(CALCULATED_RESULTS.no['adj_plat_avg_kg'], 1)],
                "ko_hr": ["ko/hour", round(CALCULATED_RESULTS.ko_per_hr, 6)],
                "body_water_avg_kg": ["Total Body Water Average (kg)",
                                      round(CALCULATED_RESULTS.total_body_water_ave_kg, 1)],
                "fat_free_mass_kg": ["Fat Free Mass (kg)", round(CALCULATED_RESULTS.fat_free_mass_kg, 1)],
                "fat_mass_kg": ["Fat Mass (kg)", round(CALCULATED_RESULTS.fat_mass_kg, 1)],
                "body_fat_percentage": ["Body Fat Percentage", round(CALCULATED_RESULTS.body_fat_percent, 1)]
            },
            "error_flags": {
                "plateau_2h": plateau_2h,
                "plateau_18O": plateau_o18,
                "ds_ratio": ["DS ratio (1.000 - 1.070)", round(CALCULATED_RESULTS.dil_space_ratio, 4)],
                "ee": ee,
                "ko_kd": ["Ko/kd (1.1 - 1.7)", round(CALCULATED_RESULTS.ko_kd_ratio, 4)]
            },
            "schoeller": sort_calculated_results(CALCULATED_RESULTS.schoeller),
            "racette": sort_calculated_results(CALCULATED_RESULTS.racette),
            "speakman1997": sort_calculated_results(CALCULATED_RESULTS.speakman1997),
            "speakman2020": sort_calculated_results(CALCULATED_RESULTS.speakman2020)
        }
    })


@app.route('/export', methods=['POST'])
def export_to_csv():
    return CALCULATED_RESULTS.save_results_csv()


@app.route('/load', methods=['POST'])
def load_csv():
    file = request.get_data().decode('utf-8')
    rows = file.split('\n')
    reader = csv.DictReader(rows)
    results = []
    for row in reader:
        results.append(row)
    return json.dumps({'results': results, 'error': False})


@app.route('/')
def root():
    return send_from_directory(STATICS_LOCATION, 'index.html')


@click.command()
@click.option('--host', default=None)
@click.option('--port', default=None)
def run_app(host, port):
    app.run(debug=False, host=host, port=port)


if __name__ == '__main__':
    app.run(debug=True)
