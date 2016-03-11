# m_play

####Server requirement
- python 3.4.3
- python-pip 1.5.4
- All the libraries listed in src/requirements.txt
- PostgreSQL 9.4.5
- uWSGI 2.0.12
- nginx 1.4.6

####Dev requirement
- node.js 5.5.0 (only to install js packages)
- jsdoc 3.4.0  (for code documentation)

####Windows localhost requirement
- visual express 2010

#### note for linux
- instead of using python & pip, you must run the command using python3 and pip3
- most of the time, you need sudo to properly install stuff with pip

####Setting up local server
- install all server requirements
- for windows : 
  - open up pgAdminIII
  - add server with name and host "localhost"
  - uncheck store password
  - install visual express 2010
- add <installation to python 3.4.3>\Scripts;
- run pip install -r /src/requirements.txt
- create postgresql localhost database called "m_play_test"
- add postgresql user "m_play_test" with password "test"
- run /scripts/run_localhost.bat for windows or /scripts/run_localhost.sh for linux
- the localhost server should be up and running in 127.0.0.1:8000/gnovel/

####Setting up linux production server
- install all server requirements
- run pip3 install -r /src/requirements.txt
- create file named sensitive_config (see [sensitive_config file section](#sensitive_config))
- create postgresql database specified by DB_NAME in sensitive_config
- add postgresql user specified by DB_USERNAME in sensitive_config with DB_PASSWORD
- run /scripts/setup.sh
- run /scripts/run_production.sh
- the production server should be up and running in link <HOSTNAME>/gnovel

#### sensitive_config file <a name="sensitive_config">
sensitive_config file is mandatory to have for production server. The file
should be placed in /src. NEVER PUT sensitive_config TO VERSION CONTROL. 
sensitive_config should contain one json oject with this property:
  - DB_NAME
  - DB_USERNAME
  - DB_PASSWORD
  - HOSTNAME
  - PORT
  - SECRET_KEY

#### third party lib
- three.js r73 (https://github.com/mrdoob/three.js/)
- tween.js 16.3.4 (https://github.com/tweenjs/tween.js)
- stats r14 (https://github.com/mrdoob/stats.js)
- jquery 2.2.1
- Bootstrap 3.3.6
