(from flask docs http://flask.pocoo.org/docs/1.0/installation/#virtual-environments)


  $ python3 -m venv venv

## Activate the environment

Before you work on your project, activate the corresponding environment:

  $ . venv/bin/activate

## Install Flask

Within the activated environment, use the following command to install stuff:

  $ pip install <package>

## Dependencies

Use deps file:

 $ pip install -r deps.txt

Create deps file:

 $ pip freeze > deps.txt
