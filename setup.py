from distutils.core import setup

setup(
        name='DoublyLabeledWater',
        version='0.1.0',
        author='Julia Chmyz',
        author_email='julia@chmyz.com',
        packages=['dlw'],
        scripts=[],
        url='http://pypi.python.org/pypi/TowelStuff/',
        license='LICENSE.txt',
        description='add me later',
        long_description=open('README.md').read(),
        install_requires=[
            "numpy",
            "python-csv"
        ],
)
