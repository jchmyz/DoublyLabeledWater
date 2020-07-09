# Program for Doubly Labeled Water calculations

This open-source program allows researchers to simply and repeatedly perform doubly labeled water calculations and save the results.  All the results have been validated by comparison with a detailed DLW calculation spreadsheet, a copy of which is available in this repo for examination.  The one exception is that the exponential decay calculations were validated by comparison with a previous DLW program version as the spreadsheet does not do exponential fitting.

The steps undertaken by the program are:
1) express all isotope enrichments as isotope ratios
2) calculate mean isotope turnover rates for both deuterium and oxygen - the user can choose whether to use a 2pt method or a multi-sample exponential fit.
3) calculate isotope dilution spaces for both deuterium and oxygen and using both plateau and intercept methods
4) calculate dilution space rato Nd/No
5) calculate average pool sizes
6) calculate CO2 production - the program does 3 separate calculations
   a) using the equation of Schoeller (equation A6, 1986 as updated in 1988)
   b) using the equation of Racette (1994)
   c) using the equation of Speakman eqn 17.41 (1997)
7) convert to total energy expenditure using the equation of Weir , J.B. J Physiol., 109(1-2):1-9, 1949
8) optionally save the data to csv

## Example input CSVs
See `DoublyLabeledWater/test/test-input.csv` and `DoublyLabeledWater/test/test-exponential.csv` for the expected CSV input format that the program expects. Column order does not matter; exact column names do. 
