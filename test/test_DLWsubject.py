from unittest import TestCase
import numpy as np
import datetime
import dlw

D_DELTAS_TEST = np.array([-62.281, 742.928, 739.377, 243.613, 242.038])
O18_DELTAS_TEST = np.array([-5.423, 106.001, 105.521, 29.599, 29.633])
D_RATIOS_TEST = np.array([0.000146059, 0.000271478, 0.000270925, 0.000193705, 0.000193459])
O18_RATIOS_TEST = np.array([0.001994325, 0.002217752, 0.002216789, 0.002064550, 0.002064620])
DOSE_TEST = datetime.datetime(2015, 2, 2, 7, 14)  # year, month, day, hours, minutes
PD4_TEST = datetime.datetime(2015, 2, 2, 11, 14)
PD5_TEST = datetime.datetime(2015, 2, 2, 12, 14)
ED4_TEST = datetime.datetime(2015, 2, 9, 11, 14)
ED5_TEST = datetime.datetime(2015, 2, 9, 12, 14)
SAMPLE_DATETIME_TEST = [DOSE_TEST, PD4_TEST, PD5_TEST, ED4_TEST, ED5_TEST]
DOSE_WEIGHTS_TEST = [3.728, 6.588]
MOL_MASSES_TEST = [20.01378, 19.976562]
DOSE_ENRICHMENTS_TEST = [1.006890, 0.988281]
SUBJECT_WEIGHTS_TEST = [49.16, 49.24]

INCORRECT_RATIOS_TEST = np.array([-62.281, 742.928, 243.613, 739.377, 242.038])
INCORRECT_SIZE_TEST = np.array([-62.281, 742.928, 243.613, 739.377])
INCORRECT_DATES_TEST = [DOSE_TEST, PD4_TEST, PD5_TEST, PD4_TEST, ED5_TEST]


class TestDLWsubject(TestCase):
    """ Class for testing of DLWsubjet class
    """

    def test_incorrect_sizes(self):
        with self.assertRaises(ValueError) as context:
            dlw.DLWsubject(INCORRECT_SIZE_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                           MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
            self.assertTrue('Arrays not correct size' in context.exception)

    def test_DLWsubject_inline_calcs(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(1.19261881061, test_subject.ko_kd_ratio)
        self.assertAlmostEqual(27.1433333518, test_subject.adj_nd_plat_avg_kg)
        self.assertAlmostEqual(26.4237877954, test_subject.adj_no_plat_avg_kg)
        self.assertAlmostEqual(1.0271786087, test_subject.dil_space_ratio)
        self.assertAlmostEqual(26.07428756, test_subject.total_body_water_d_kg)
        self.assertAlmostEqual(26.24010705, test_subject.total_body_water_o_kg)
        self.assertAlmostEqual(26.157197304, test_subject.total_body_water_ave_kg)
        self.assertAlmostEqual(35.8317771287, test_subject.fat_free_mass)
        self.assertAlmostEqual(13.328222871, test_subject.fat_mass)
        self.assertAlmostEqual(27.111926101, test_subject.body_fat_percent)
        self.assertAlmostEqual(14.543278471, test_subject.schoeller_co2_int_mol_day)
        self.assertAlmostEqual(13.582210152, test_subject.schoeller_co2_int_L_day)
        self.assertAlmostEqual(7.832030450, test_subject.schoeller_tee_int_mj_day)

    def test_d_deltas_to_ratios(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertTrue(np.allclose(D_RATIOS_TEST, test_subject.d_ratios))

    def test_o18_deltas_to_ratios(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertTrue(np.allclose(O18_RATIOS_TEST, test_subject.o18_ratios))

    def test_average_turnover_2pt(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(0.005763318, test_subject.kd)

    def test_incorrect_ratios(self):
        with self.assertRaises(ValueError) as context:
            dlw.DLWsubject(INCORRECT_RATIOS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                           MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
            self.assertTrue(
                'Isotope ratios do not conform to pattern background < final < plateau' in context.exception)

    def test_dilution_space_plateau(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(1495.020473886, test_subject.nd_plat_4hr)

    def test_avg_intercept_dilution_space(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(1459.9644734066, test_subject.nd_int_avg)

    def test_adj_dilution_space(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(1499.54385831, test_subject.adj_nd_plat_avg)

    def test_calc_schoeller_co2(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(0.6234479225245, test_subject.schoeller_co2_plat)

    def test_co2_to_tee(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(1925.89140638, test_subject.schoeller_tee_plat)

    def test_percent_difference(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(0.2041535561, test_subject.d_ratio_percent)

    def test_ee_consistency_check(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(3.45895192, test_subject.ee_check)
