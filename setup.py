import setuptools

setuptools.setup(
        name='dlw',
        version='0.0.14',
        author='Julia Chmyz',
        author_email='julia@chmyz.com',
        packages=setuptools.find_packages(),
        include_package_data=True,
        url='https://github.com/jchmyz/DoublyLabeledWater',
        license='LICENSE.txt',
        description='Open source web app to conduct doubly labeled water study calculations.',
        long_description=open('README.md').read(),
        long_description_content_type="text/markdown",
        install_requires=[
            "numpy",
            "scipy",
            "python-csv",
            "flask",
            "flask-restful"
        ],
        entry_points={"console_scripts": {"run-dlw = dlw.web.app:run_app"}}
)
