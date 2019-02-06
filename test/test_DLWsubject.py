from unittest import TestCase
import numpy as np
import datetime
import dlw

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
MOL_MASSES_TEST = [19.9960, 19.9000]
DOSE_ENRICHMENTS_TEST = [0.998, 0.95]
SUBJECT_WEIGHTS_TEST = [59.62, 58.82]

INCORRECT_RATIOS_TEST = np.array([-62.281, 742.928, 243.613, 739.377, 242.038])
INCORRECT_SIZE_TEST = np.array([-62.281, 742.928, 243.613, 739.377])
INCORRECT_DATES_TEST = [DOSE_TEST, PD4_TEST, PD5_TEST, PD4_TEST, ED5_TEST]


class TestDLWSubject(TestCase):
    """ Class for testing of DLWSubject class
    """

    def test_incorrect_sizes(self):
        with self.assertRaises(ValueError) as context:
            dlw.DLWSubject(INCORRECT_SIZE_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                           MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
            self.assertTrue('Arrays not correct size' in context.exception)

    def test_DLWsubject_inline_calcs(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(1.146923975, test_subject.ko_kd_ratio)
        self.assertAlmostEqual(1.04230402, test_subject.dil_space_ratio)
        self.assertAlmostEqual(32.03045527, test_subject.total_body_water_d_kg)
        self.assertAlmostEqual(31.75649585, test_subject.total_body_water_o_kg)
        self.assertAlmostEqual(31.89347556, test_subject.total_body_water_ave_kg)
        self.assertAlmostEqual(43.68969255, test_subject.fat_free_mass_kg)
        self.assertAlmostEqual(15.93030745, test_subject.fat_mass_kg)
        self.assertAlmostEqual(26.7197374, test_subject.body_fat_percent)
        self.assertAlmostEqual(13.03134603, test_subject.schoeller_co2_int_mol_day)
        self.assertAlmostEqual(12.17019124, test_subject.schoeller_co2_int_L_day)
        self.assertAlmostEqual(7.017805448, test_subject.schoeller_tee_int_mj_day)
        self.assertAlmostEqual(7.219921161, test_subject.schoeller_tee_plat_mj_day)

    def test_d_deltas_to_ratios(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertTrue(np.allclose(D_RATIOS_TEST, test_subject.d_ratios))

    def test_o18_deltas_to_ratios(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertTrue(np.allclose(O18_RATIOS_TEST, test_subject.o18_ratios))

    def test_average_turnover_2pt(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(0.00588674101, test_subject.kd_per_hr)

    def test_incorrect_ratios(self):
        with self.assertRaises(ValueError) as context:
            dlw.DLWSubject(INCORRECT_RATIOS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                           MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
            self.assertTrue(
                'Isotope ratios do not conform to pattern background < final < plateau' in context.exception)

    def test_calculate_various_nd(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(1871.40228081, test_subject.nd['plat_4hr_mol'])
        self.assertAlmostEqual(1837.65377923, test_subject.nd['plat_5hr_mol'])
        self.assertAlmostEqual(1854.52803002, test_subject.nd['plat_avg_mol'])
        self.assertAlmostEqual(1827.84542959, test_subject.nd['int_4hr_mol'])
        self.assertAlmostEqual(1784.34589602, test_subject.nd['int_5hr_mol'])
        self.assertAlmostEqual(1806.09566281, test_subject.nd['int_avg_mol'])
        self.assertAlmostEqual(1842.08570845, test_subject.nd['adj_plat_avg_mol'])
        self.assertAlmostEqual(1793.97828164, test_subject.nd['adj_int_avg_mol'])
        self.assertAlmostEqual(33.34370393, test_subject.nd['adj_plat_avg_kg'])
        self.assertAlmostEqual(32.472908515, test_subject.nd['adj_int_avg_kg'])

    def test_calculate_various_no(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(1795.44762535, test_subject.no['plat_4hr_mol'])
        self.assertAlmostEqual(1761.77954996, test_subject.no['plat_5hr_mol'])
        self.assertAlmostEqual(1778.61358765, test_subject.no['plat_avg_mol'])
        self.assertAlmostEqual(1747.59605394, test_subject.no['int_4hr_mol'])
        self.assertAlmostEqual(1703.28325327, test_subject.no['int_5hr_mol'])
        self.assertAlmostEqual(1725.43965360, test_subject.no['int_avg_mol'])
        self.assertAlmostEqual(1766.68058807, test_subject.no['adj_plat_avg_mol'])
        self.assertAlmostEqual(1713.86340635, test_subject.no['adj_int_avg_mol'])
        self.assertAlmostEqual(31.9787913255, test_subject.no['adj_plat_avg_kg'])
        self.assertAlmostEqual(31.0227443501, test_subject.no['adj_int_avg_kg'])

    def test_calc_schoeller_co2(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(0.558610592, test_subject.schoeller_co2_plat)

    def test_co2_to_tee(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(1725.602572, test_subject.schoeller_tee_plat_kcal_day)

    def test_percent_difference(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(-1.8, test_subject.d_ratio_percent)

    def test_ee_consistency_check(self):
        test_subject = dlw.DLWSubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertAlmostEqual(2.5, test_subject.ee_check)
