from unittest import TestCase
import numpy as np
import datetime
import dlw

D_DELTAS_TEST = np.array([-62.281,742.928,739.377,243.613,242.038])
O18_DELTAS_TEST = np.array([-5.423, 106.001, 105.521, 29.599,29.633])
D_RATIOS_TEST = np.array([0.000146059, 0.000271478, 0.000270925, 0.000193705, 0.000193459])
O18_RATIOS_TEST = np.array([0.001994325,0.002217752, 0.002216789, 0.002064550, 0.002064620])
DOSE_TEST = datetime.datetime(2015,2,2,7,14)  #year, month, day, hours, minutes
PD4_TEST = datetime.datetime(2015,2,2,11,14)
PD5_TEST = datetime.datetime(2015,2,2,12,14)
ED4_TEST = datetime.datetime(2015,2,9,11,14)
ED5_TEST = datetime.datetime(2015,2,9,12,14)
SAMPLE_DATETIME_TEST = [DOSE_TEST, PD4_TEST, PD5_TEST, PD4_TEST, ED5_TEST]
DOSE_WEIGHTS_TEST = [3.728, 6.588]
MOL_MASSES_TEST = [20.01378,19.976562]
DOSE_ENRICHMENTS_TEST = [1.006890, 0.988281]
SUBJECT_WEIGHTS_TEST = [49.16,49.24]


class TestDLWsubject(TestCase):
    """ Class for testing of DLWsubjet class
    """
    def test_d_deltas_to_ratios(self):
        test_subject = dlw.DLWsubject(D_DELTAS_TEST, O18_DELTAS_TEST, SAMPLE_DATETIME_TEST, DOSE_WEIGHTS_TEST,
                                      MOL_MASSES_TEST, DOSE_ENRICHMENTS_TEST, SUBJECT_WEIGHTS_TEST)
        self.assertTrue(np.allclose(D_RATIOS_TEST, test_subject.d_ratios))

 #   def test_calc_schoeller_co2(self):

  #  def test_co2_to_tee(self):
   #     self.assertEquals(3089.09748, co2_to_tee(self, 1))