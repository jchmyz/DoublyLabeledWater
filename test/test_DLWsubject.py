from unittest import TestCase
import numpy as np
import datetime
import dlw
import os

D_DELTAS_TEST = np.array([-76.416, 772.106, 787.687, 242.117, 242.141])
O18_DELTAS_TEST = np.array([-7.984, 106.433, 108.619, 29.245, 29.104])
D_RATIOS_TEST = np.array([0.000143857, 0.000276023, 0.000278450, 0.000193472, 0.000193476])
O18_RATIOS_TEST = np.array([0.001989190, 0.002218619, 0.002223003, 0.002063842, 0.002063559])
DOSE_TEST = datetime.datetime(2014, 2, 24, 7, 00)  # year, month, day, hours, minutes
PD4_TEST = datetime.datetime(2014, 2, 24, 11, 00)
PD5_TEST = datetime.datetime(2014, 2, 24, 12, 00)
ED4_TEST = datetime.datetime(2014, 3, 3, 11, 00)
ED5_TEST = datetime.datetime(2014, 3, 3, 11, 58)
SAMPLE_DATETIME_TEST = [DOSE_TEST, PD4_TEST, PD5_TEST, ED4_TEST, ED5_TEST]
DOSE_WEIGHTS_TEST = [4.957, 8.649]
MIXED_DOSE_TEST = False
# MOL_MASSES_TEST = [19.9960, 19.9000]
DOSE_ENRICHMENTS_TEST = [998000, 950000]
SUBJECT_WEIGHTS_TEST = [59.62, 58.82]
SUBJECT_ID_TEST = "TestSubject"

INCORRECT_RATIOS_TEST = np.array([-62.281, 742.928, 243.613, 739.377, 242.038])
INCORRECT_SIZE_TEST = np.array([-62.281, 742.928, 243.613, 739.377])
INCORRECT_DATES_TEST = [DOSE_TEST, PD4_TEST, PD5_TEST, PD4_TEST, ED5_TEST]


class TestDLWSubject(TestCase):
    """ Class for testing of DLWSubject class
    """

    def test_incorrect_sizes(self):
        with self.assertRaises(ValueError) as context:
            dlw.DLWSubject(INCORRECT_SIZE_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                           MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
            self.assertTrue('Arrays not correct size' in context.exception)

    def test_DLWsubject_inline_calcs(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertAlmostEqual(1.146923975, test_subject.ko_kd_ratio)
        self.assertAlmostEqual(1.04211133, test_subject.dil_space_ratio)
        self.assertAlmostEqual(32.02403252, test_subject.total_body_water_d_kg)
        self.assertAlmostEqual(31.75599874, test_subject.total_body_water_o_kg)
        self.assertAlmostEqual(31.89001563, test_subject.total_body_water_ave_kg)
        self.assertAlmostEqual(43.68495292, test_subject.fat_free_mass_kg)
        self.assertAlmostEqual(15.93504708, test_subject.fat_mass_kg)
        self.assertAlmostEqual(26.72768715, test_subject.body_fat_percent)
        self.assertAlmostEqual(13.03150474, test_subject.schoeller_co2_int_mol_day)
        self.assertAlmostEqual(12.17033947, test_subject.schoeller_co2_int_L_hr)
        self.assertAlmostEqual(7.017890921, test_subject.schoeller_tee_int_mj_day)
        self.assertAlmostEqual(7.220010393, test_subject.schoeller_tee_plat_mj_day)

    def test_d_deltas_to_ratios(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertTrue(np.allclose(D_RATIOS_TEST, test_subject.d_ratios))

    def test_o18_deltas_to_ratios(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertTrue(np.allclose(O18_RATIOS_TEST, test_subject.o18_ratios))

    def test_average_turnover_2pt(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertAlmostEqual(0.00588674101, test_subject.kd_per_hr)

    def test_incorrect_ratios(self):
        with self.assertRaises(ValueError) as context:
            dlw.DLWSubject(INCORRECT_RATIOS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                           MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
            self.assertTrue(
                'Isotope ratios do not conform to pattern background < final < plateau' in context.exception)

    def test_calculate_mol_masses(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertAlmostEqual(20.0000104, test_subject.mol_masses[0])
        self.assertAlmostEqual(19.90031152, test_subject.mol_masses[1])

    def test_calculate_various_nd(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertAlmostEqual(1871.02702742, test_subject.nd['plat_4hr_mol'])
        self.assertAlmostEqual(1837.28529309, test_subject.nd['plat_5hr_mol'])
        self.assertAlmostEqual(1854.15616026, test_subject.nd['plat_avg_mol'])
        self.assertAlmostEqual(1827.47891022, test_subject.nd['int_4hr_mol'])
        self.assertAlmostEqual(1783.98809916, test_subject.nd['int_5hr_mol'])
        self.assertAlmostEqual(1805.73350469, test_subject.nd['int_avg_mol'])
        self.assertAlmostEqual(1841.71633362, test_subject.nd['adj_plat_avg_mol'])
        self.assertAlmostEqual(1793.61855330, test_subject.nd['adj_int_avg_mol'])
        self.assertAlmostEqual(33.3370178578, test_subject.nd['adj_plat_avg_kg'])
        self.assertAlmostEqual(32.4663970504, test_subject.nd['adj_int_avg_kg'])

    def test_calculate_various_no(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertAlmostEqual(1795.41951937, test_subject.no['plat_4hr_mol'])
        self.assertAlmostEqual(1761.75197101, test_subject.no['plat_5hr_mol'])
        self.assertAlmostEqual(1778.58574519, test_subject.no['plat_avg_mol'])
        self.assertAlmostEqual(1747.56869702, test_subject.no['int_4hr_mol'])
        self.assertAlmostEqual(1703.25659004, test_subject.no['int_5hr_mol'])
        self.assertAlmostEqual(1725.41264353, test_subject.no['int_avg_mol'])
        self.assertAlmostEqual(1766.65293241, test_subject.no['adj_plat_avg_mol'])
        self.assertAlmostEqual(1713.83657749, test_subject.no['adj_int_avg_mol'])
        self.assertAlmostEqual(31.9782907287, test_subject.no['adj_plat_avg_kg'])
        self.assertAlmostEqual(31.0222587193, test_subject.no['adj_int_avg_kg'])

    def test_calc_schoeller_co2(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertAlmostEqual(0.558617496, test_subject.schoeller_co2_plat)

    def test_co2_to_tee(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertAlmostEqual(1725.62389885, test_subject.schoeller_tee_plat_kcal_day)

    def test_percent_difference(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertAlmostEqual(-1.8195460185388, test_subject.d_ratio_percent)

    def test_ee_consistency_check(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        self.assertAlmostEqual(-1.03567421899, test_subject.ee_check)

    def test_save_results_csv(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MIXED_DOSE_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST, SUBJECT_ID_TEST)
        test_path = "/Users/elena/personal/DLW/test.csv"
        test_subject.save_results_csv(test_path)
        read_data = np.genfromtxt(test_path, delimiter=',', skip_header=1, dtype=str)
        self.assertEqual('TestSubject', read_data[0])
        self.assertAlmostEqual(test_subject.schoeller_co2_int_mol_day, float(read_data[1]))
        self.assertAlmostEqual(test_subject.schoeller_co2_int_L_hr, float(read_data[2]))
        os.remove(test_path)
