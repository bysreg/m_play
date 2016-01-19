# m_play

####Server requirement
- python 3.4.3
- All the libraries listed in src/requirements.txt
- PostgreSQL 9.4.5

####Setting up local server
- install all server requirements
- add /PostgreSQL/9.5/bin/pg_config.exe to PATH
- for windows : 
  - open up pgAdminIII
  - add server with name and host "localhost"
  - uncheck store password
  - install visual express 2010
- run pip install -r /src/requirements.txt
- create postgresql localhost database called "m_play"
- add user "m_play" with password "test"
- run python manage.py runserver