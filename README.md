# m_play

####Server requirement
- python 3.4.3
- python-pip
- All the libraries listed in src/requirements.txt
- PostgreSQL 9.4.5
- uWSGI
- nginx

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
- create postgresql localhost database called "m_play"
- add user "m_play" with password "test"
- go to manage folder
- run python manage.py migrate
- run python manage.py runserver