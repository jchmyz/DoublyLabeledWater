import setuptools

setuptools.setup(
        name='dlw',
        version='0.0.15',
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
            "Jinja2==2.7",
            "kiwisolver==1.0.1",
            "numpy==1.10.0",
            "scipy==1.2.1",
            "matplotlib==3.0.0",
            "pandas==0.23.4",
            "python-csv==0.0.13",
            "flask==0.12.4",
            "flask-restful",
            "PySocks==1.5.6",
            "cryptography==1.3.4",
            "pyopenssl==16.1.0",
            "werkzeug==1.0.1",
            "click==7.0",
            "itsdangerous==0.21",
            "MarkupSafe==0.23"
        ],
        entry_points={"console_scripts": {"run-dlw = dlw.web.app:run_app"}}
)
