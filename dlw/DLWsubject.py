import numpy as np
from pylab import *
from datetime import timedelta

D_VSMOW_RATIO = 0.00015576
O18_VSMOW_RATIO = 0.0020052
STANDARD_WATER_MOL_MASS = 18.10106/1000  #kg


def isotope_turnover_2pt(background, initratio, finalratio, elapsedhours):
    """Calculate an isotope turnover rate in 1/hr using the 2pt method
       :param background:  enrichment of the background urine measurement as a ratio
       :param initratio: enrichment of the initial urine measurement as a ratio
       :param finalratio: enrichment of the final urine measurement as a ratio
       :param elapsedhours: elapsed time in hours between the intial and final urine measurements
       :return: istope turnover rate in 1/hr
    """
    return ((np.log(initratio - background) - np.log(finalratio - background)) / elapsedhours)


class DLWsubject:
    """Class for performing Doubly Labeled Water calculations
       Attributes:
           ddeltas (np.array): deuterium delta values of subject samples
           o19deltas (np.array): oxygen 18 delta values of subject samples
           sampledatetimes ([datetime]): dates and times of sample collections
           doseweights ([float]): weights in g of doses administered, deuterium first, 18O second
           molmasses ([float]): molecular masses in g/mol of doses administered, deuterium first, 18O second
           doseenrichments ([float]): dose enrichments in ppm of doses administered, deuterium first, 18O second
           weights ([float]): initial and final weights of the subject in kg
           dratios (np.array): deuterium ratios of subject samples
           o18ratios (np.array): 18O ratios of subject samples
           kd (float): deuterium turnover rate in 1/hr
           ko (float): oxygen turnover rate in 1/hr
           nd_plat_4hr (float): deuterium dilution space calculated by the plateau method using the 4hr sample in mol
           no_plat_4hr (float): 18O dilution space calculated by the plateau method using the 4hr sample in mol
           nd_plat_avg (float): deuterium dilution space calculated by the plateau method using the average of the 4hr
                        and 5hr samples in mol
           no_plat_avg (float): 18O dilution space calculated by the plateau method using the average of the 4hr and 5
                        hr samples in mol
           nd_int_avg (float): deuterium dilution space calculated by the intercept method using the average of the 4hr
                        and 5hr samples in mol
           no_int_avg (float): 18O dilution space calculated by the intercept method using the average of the 4hr and 5
                        hr samples in mol
           dil_space_ratio (float): ratio of the 4 hr plateau deuterium and 18O dilution spaces
           adj_nd_int_avg (float): deuterium average intercept dilution space adjusted for the subject weight change
                           over the sampling period
           adj_no_int_avg (float): 18O average intercept dilution space adjusted for the subject weight change over the
                           sampling period
           adj_nd_plat_avg (float): deuterium average plateu dilution space adjusted for the subject weight change over
                           the sampling period
           adj_no_plat_avg (float): 18O average plateu dilution space adjusted for the subject weight change over the
                           sampling period
           schoeller_co2_int (float): CO2 production rate in mol/hr using the equation of Schoeller (equation A6, 1986
                              as updated in 1988) using the weight adjusted, average, intercept dilution spaces
           schoeller_co2_plat (float): CO2 production rate in mol/hr using the equation of Schoeller (equation A6, 1986
                              as updated in 1988) using the weight adjusted, average, plateu dilution spaces
           schoeller_tee_int (float): Total energy expenditure calculated using the equation of Weir (1949) from co2
                              values calculated via Schoeller and the weight adjusted, average, intercept dilution spaces
           schoeller_tee_plat (float): Total energy expenditure calculated using the equation of Weir (1949) from co2
                              values calculated via Schoeller and the weight adjusted, average, plateau dilution spaces
    """

    def __init__(self, ddeltas, o18deltas, sampledatetimes, doseweights, molmasses, doseenrichments, weights):
        """Constructor for the DLWsubject class
           :param ddeltas (np.array): deuterium delta values of subject samples
           :param o19deltas (np.array): oxygen 18 delta values of subject samples
           :param sampledatetimes ([datetime]): dates and times of sample collections
           :param doseweights ([float]): weights in g of doses administered, deuterium first, 18O second
           :param molmasses ([float]): molecular masses in g/mol of doses administered, deuterium first, 18O second
           :param doseenrichments ([float]): dose enrichments in ppm of doses administered, deuterium first, 18O second
           :param weights ([float]): initial and final weights of the subject in kg
        """
        if len(ddeltas) == len(o18deltas) == len(sampledatetimes) == 5:
            self._ddeltas = ddeltas
            self._o18deltas = o18deltas
            self._sampledatetimes = sampledatetimes
            self._doseweights = doseweights
            self._molmasses = molmasses
            self._doseenrichments = doseenrichments
            self._weights = weights

            self._dratios = self.ddeltas_to_ratios()
            self._o18ratios = self.o18deltas_to_ratios()

            self._kd = self.average_turnover_2pt(self._dratios, self._sampledatetimes)
            self._ko = self.average_turnover_2pt(self._o18ratios, self._sampledatetimes)

            self._nd_plat_4hr = self.dilution_space_plateau(self._doseweights[0], self._molmasses[0],
                                                            self._doseenrichments[0], self._dratios[1],
                                                            self._dratios[0])
            self._no_plat_4hr = self.dilution_space_plateau(self._doseweights[1], self._molmasses[1],
                                                            self._doseenrichments[1], self._o18ratios[1],
                                                            self._o18ratios[0])

            self._nd_plat_avg = self.dilution_space_plateau(self._doseweights[0], self._molmasses[0],
                                                            self._doseenrichments[0],
                                                            (self._dratios[1] + self._dratios[2]) / 2,
                                                            self._dratios[0])
            self._no_plat_avg = self.dilution_space_plateau(self._doseweights[1], self._molmasses[1],
                                                            self._doseenrichments[1],
                                                            (self._o18ratios[1] + self._o18ratios[2]) / 2,
                                                            self._o18ratios[0])

            self._nd_int_avg = self.avg_intercept_dilution_space(self._doseweights[0], self._molmasses[0],
                                                                 self._doseenrichments[0], self._kd, self._dratios,
                                                                 self._sampledatetimes)
            self._no_int_avg = self.avg_intercept_dilution_space(self._doseweights[1], self._molmasses[1],
                                                                 self._doseenrichments[1], self._ko, self._o18ratios,
                                                                 self._sampledatetimes)

            self._dil_space_ratio = self._nd_plat_4hr / self._no_plat_4hr

            self._adj_nd_int_avg = self.adj_dilution_space(self._nd_int_avg, self._weights)
            self._adj_no_int_avg = self.adj_dilution_space(self._no_int_avg, self._weights)

            self._adj_nd_plat_avg = self.adj_dilution_space(self._nd_plat_avg, self._weights)
            self._adj_no_plat_avg = self.adj_dilution_space(self._no_plat_avg, self._weights)

            self._schoeller_co2_int = self.calc_schoeller_co2(self._adj_nd_int_avg, self._adj_no_int_avg,
                                                              self._kd, self._ko)
            self._schoeller_co2_plat = self.calc_schoeller_co2(self._adj_nd_plat_avg, self._adj_no_plat_avg,
                                                               self._kd, self._ko)

            self._schoeller_tee_int = self.co2_to_tee(self.schoeller_co2_int)
            self._schoeller_tee_plat = self.co2_to_tee(self.schoeller_co2_plat)

        else:
            raise ValueError("Arrays not correct size")

    @property
    def ddeltas(self):
        return self._ddeltas

    @property
    def o18deltas(self):
        return self._o18deltas

    @property
    def sampledate(self):
        return self._sampledatetimes

    @property
    def doseweights(self):
        return self._doseweights

    @property
    def molmasses(self):
        return self._molmasses

    @property
    def doseenrichments(self):
        return self._doseenrichments

    @property
    def dratios(self):
        return self._dratios

    @property
    def o18ratios(self):
        return self._o18ratios

    def ddeltas_to_ratios(self):
        """Convert deuterium delta values to ratios.
           :return: deuterium ratios"""
        return ((self.ddeltas / 1000) + 1) * D_VSMOW_RATIO

    def o18deltas_to_ratios(self):
        """Convert 18O delta values to ratios.
           :return: 18O ratios"""
        return ((self.o18deltas / 1000) + 1) * O18_VSMOW_RATIO

    @property
    def kd(self):
        return self._kd

    @property
    def ko(self):
        return self._ko

    @staticmethod
    def average_turnover_2pt(ratios, sampledatetime):
        """Calculate the average isotope turnover rate in 1/hr using the 2pt method
           :param ratios: measured urine isotope ratios
           :param sampledatetime: time and date of urine collections
           :return: average isotope turnover rate in 1/hr
        """
        turnovers = np.zeros(4)

        elapsedhours = (timedelta.total_seconds(sampledatetime[3] - sampledatetime[1])) / 3600
        turnovers[0] = isotope_turnover_2pt(ratios[0], ratios[1], ratios[3], elapsedhours)

        elapsedhours = (timedelta.total_seconds(sampledatetime[4] - sampledatetime[1])) / 3600
        turnovers[1] = isotope_turnover_2pt(ratios[0], ratios[1], ratios[4], elapsedhours)

        elapsedhours = (timedelta.total_seconds(sampledatetime[3] - sampledatetime[2])) / 3600
        turnovers[2] = isotope_turnover_2pt(ratios[0], ratios[2], ratios[3], elapsedhours)

        elapsedhours = (timedelta.total_seconds(sampledatetime[4] - sampledatetime[2])) / 3600
        turnovers[3] = isotope_turnover_2pt(ratios[0], ratios[2], ratios[4], elapsedhours)
        return np.mean(turnovers)

    @property
    def nd_plat_4hr(self):
        return self._nd_plat_4hr

    @property
    def no_plat_4hr(self):
        return self._no_plat_4hr

    @property
    def nd_plat_avg(self):
        return self._nd_plat_avg

    @property
    def no_plat_avg(self):
        return self._no_plat_avg

    @staticmethod
    def dilution_space_plateau(doseweight, molmass, doseenrichment, plateauenrichment, background):
        """Calculate a dilution space using the plateau method.
           :param doseweight: weight of the does in grams
           :param molmass: moleular mass of the dose in grams/mol
           :param doseenrichment: enrichment of the dose in ppm
           :param plateauenrichment: enrichment of the plateau urine measurement as a ratio
           :param background: enrichment of the background urine measurement as a ratio
           :return: dilution space calculated by the plateau method in mol
        """

        return doseweight / molmass * (doseenrichment - plateauenrichment) / (plateauenrichment - background)

    @property
    def nd_int_avg(self):
        return self._nd_int_avg

    @property
    def no_int_avg(self):
        return self._no_int_avg

    @staticmethod
    def dilution_space_intercept(doseweight, molmass, doseenrichment, plateauenrichment, background,
                                 turnoverrate, dosetime):
        """Calculate a dilution space using the intercept method.
           :param doseweight: weight of the does in grams
           :param molmass: moleular mass of the dose in grams/mol
           :param doseenrichment: enrichment of the dose in ppm
           :param plateauenrichment: enrichment of the plateau urine measurement in ppm
           :param background: enrichment of the background urine measurement in ppm
           :param turnoverrate: isotope turnover rate in 1/hr
           :param dosetime: time and date of dose administration
           :return: dilution space calculated by the intercept method in mol
        """

        interceptenrichment = (plateauenrichment - background) * np.exp(dosetime * turnoverrate) + background

        return doseweight / molmass * (doseenrichment - interceptenrichment) / (interceptenrichment - background)

    def avg_intercept_dilution_space(self, doseweight, molmass, doseenrichment, turnoverrate, ratios, sampledatetime):
        """Calculate the average of the 4 and 5 hour dilution spaces calculated by the intercept method
           :param doseweight: weight of the does in grams
           :param molmass: moleular mass of the dose in grams/mol
           :param doseenrichment: enrichment of the dose in ppm
           :param turnoverrate: isotope turnover rate in 1/hr
           :param ratios: measured urine isotope ratios
           :param sampledatetime: time and date of urine collections
           :return: average of the 4 and 5 hour dilution spaces calculated by the intercept method in mol
        """
        dilspace = np.zeros(2)
        dosetime = np.zeros(2)

        dosetime[0] = timedelta.total_seconds(sampledatetime[1] - sampledatetime[0]) / 3600
        dilspace[0] = self.dilution_space_intercept(doseweight, molmass, doseenrichment, ratios[1], ratios[0],
                                                    turnoverrate, dosetime[0])

        dosetime[1] = timedelta.total_seconds(sampledatetime[2] - sampledatetime[0]) / 3600
        dilspace[1] = self.dilution_space_intercept(doseweight, molmass, doseenrichment, ratios[2], ratios[0],
                                                    turnoverrate, dosetime[1])
        return np.mean(dilspace)

    @property
    def dil_space_ratio(self):
        return self._dil_space_ratio

    @property
    def adj_nd_int_avg(self):
        return self._adj_nd_int_avg

    @property
    def adj_no_int_avg(self):
        return self._adj_no_int_avg

    @property
    def adj_nd_plat_avg(self):
        return self._adj_nd_plat_avg

    @property
    def adj_no_plat_avg(self):
        return self._adj_no_plat_avg

    @staticmethod
    def adj_dilution_space(dilution_space, weights):
        """Adjust the given dilution space by the beginning and end weights to produce an average dilution space.
           :param dilution_space: unadjusted dilution space
           :param weights: array containing before and after subject weights
           :return adj_dilution_space: dilution space in mol adjusted for the subject weight change over the
                                       sampling period
        """
        begin_dilution_spacekg = dilution_space * STANDARD_WATER_MOL_MASS
        end_dilution_spacekg = weights[1] / weights[0] * begin_dilution_spacekg

        adj_dilution_space = ((begin_dilution_spacekg + end_dilution_spacekg) / 2) / STANDARD_WATER_MOL_MASS
        return adj_dilution_space

    @property
    def schoeller_co2_int(self):
        return self._schoeller_co2_int

    @property
    def schoeller_co2_plat(self):
        return self._schoeller_co2_plat

    @staticmethod
    def calc_schoeller_co2(nd, no, kd, ko):
        """Calculate CO2 production in mol/hr using the equation of Schoeller (equation A6, 1986 as updated in 1988)
                from dilution spaces and isotope turnover rates.
           :param nd: deuterium dilution space in mol
           :param no: oxygen dilution space in mol
           :param kd: deuterium turnover rate in 1/hr
           :param ko: oxygen turnover rate in 1/hr
           :return co2prod: co2 production rate in mol/hr
        """
        n = ((no / 1.01) + (nd / 1.04)) / 2
        co2prod = (n / 2.078) * (1.01 * ko - 1.04 * kd) - 0.0246 * n * 1.05 * (1.01 * ko - 1.04 * kd)
        # reduces to co2prod = n*(0.459952*ko - 0.47362*kd)
        return co2prod

    @property
    def schoeller_tee_int(self):
        return self._schoeller_tee_int

    @property
    def schoeller_tee_plat(self):
        return self._schoeller_tee_plat

    @staticmethod
    def co2_to_tee(co2):
        """Convert CO2 production to total energy expenditure using the equation of Weir, J.B. J Physiol., 109(1-2):1-9, 1949
           :param co2: volume of co2 production in mol/hr
           :return: total energy expenditure in kcal/day
        """
        return co2 * 22.414 * 24 * 5.7425
