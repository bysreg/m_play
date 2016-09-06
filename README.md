# m_play Apache Mysql Branch

##Server requirement
- python 2.7.5
- python-pip 8.1.2
- All the libraries listed in src/requirements.txt
- Mysql 5.7.14
- mod_wsgi 4.5.2

##Dev requirement
- node.js 5.5.0 (only to install js packages)
- jsdoc 3.4.0  (for code documentation)

##Windows localhost requirement
- visual express 2010
- pgadmin3 1.20

## note for linux
- most of the time, you need sudo to properly install stuff with pip
- apache mysql required packages installation : 
  - Sudo yum install git
	- Sudo yum install nano
	- wget "https://bootstrap.pypa.io/get-pip.py"
	- sudo python get-pip.py
	- sudo pip install Django==1.9.1
	- sudo yum install yum-utils
	- sudo yum install gcc
	- sudo yum install python-devel-0:2.7.5-34.el7.x86_64 (match it with the python version)
	- sudo yum install mysql-community-devel
	- sudo sudo pip install mysqlclient==1.3.7
	- wget "https://github.com/GrahamDumpleton/mod_wsgi/archive/4.5.2.tar.gz"
	- tar xvfz 4.5.2.tar.gz
	- cd mod_wsgi-4.5.2/
	- ./configure
	- make
  - sudo make install
  - copy the output path of mod_wsgi.so, it will be used to configure httpd.conf later on

##Setting up local server
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

##Setting up linux production server using apache and mysql
- install all server requirements
- run pip install -r /src/requirements.txt
- create file named sensitive_config (see [sensitive_config file section](#sensitive_config))
- create mysql database specified by DB_NAME in sensitive_config
- add mysql user specified by DB_USERNAME in sensitive_config with DB_PASSWORD
- run /scripts/setup.sh (this will create the tables inside the database)
- install mod_wsgi
- configure httpd.conf
  - edit the file in /etc/httpd/conf/httpd.conf with sudo and add "LoadModule <path to the .so file>" (the path should be : "/usr/lib64/httpd/modules/mod_wsgi.so" although it may differ with each system, the path is outputted from the make install of mod_wsgi)
  - Also add these to the end of the httpd.conf file and change the path to point to your corresponding folder: 

```
# For Django

Alias /static/ /home/ec2-user/prod/static/

<Directory /home/ec2-user/prod/static>
Require all granted
</Directory>

WSGIScriptAlias / /home/ec2-user/prod/m_play/src/m_play/m_play/wsgi.py
WSGIPythonPath /home/ec2-user/prod/m_play/src/m_play

<Directory /home/ec2-user/prod/m_play/src/m_play/m_play>
<Files wsgi.py>
Require all granted
</Files>
</Directory>
```

- restart apache server (sudo service httpd restart)
- If all is okay, you should see a line of the form: Apache/2.4.8 (Unix) mod_wsgi/4.4.21 Python/2.7 configured in the Apache error log file. (/var/log/httpd/error_log)
- the production server should be up and running in link <HOSTNAME>/gnovel

## sensitive_config file <a name="sensitive_config">
sensitive_config file is mandatory to have for production server. The file
should be placed in /src. NEVER PUT sensitive_config TO VERSION CONTROL. 
sensitive_config should contain one json oject with this property:
  - DB_NAME
  - DB_USERNAME
  - DB_PASSWORD
  - HOSTNAME
  - PORT
  - SECRET_KEY

## third party lib
- three.js r73 (https://github.com/mrdoob/three.js/)
- tween.js 16.3.4 (https://github.com/tweenjs/tween.js)
- stats r14 (https://github.com/mrdoob/stats.js)
- jquery 2.2.1
- Bootstrap 3.3.6

## Code Structure
###Server Code
Server code is usually contained in .py python file. This project is thin on the server side and only uses server to serve the web pages and to record player's choices and keep it in the database. There are currently two branches. branch master uses nginx and postgres configuration, while the apache_mysql branch uses apache & mysql configuration. The instruction on the README.md is generally for nginx & postgres. 

###Client Code
The code is structured into two namespaces, GNOVEL and MPLAY. GNOVEL generally contains framework code and MPLAY generally contains the application code.

####GNOVEL
GNOVEL namespaced files can be found under /src/m_play/gnovel/static/gnovel/js/gnovel/. The most important class in this namespace is the Gnovel. It sets up the canvas, runs the story flow, handle mouse clicks, handle transitions, etc. It integrates various components of the game and provides general function. Gnovel mainly only shows one page at one time and at most shows two pages at transition

Page
The application is divided into several pages, just like in a graphic novel. Page is related to how the story divided into several parts. A page object can set its background, add objects to the page, move objects, and most importantly sets its story flow. You can specify a page story flow by overriding its _createFlowElements and return an array object that contains a list of all story flow element. 

Flow
Story flow or Flow for short, is a way to control what texts to show, control the speaker, branch the story according to a certain parameters, etc. There are 10 flow types :
 - Dialog. This is used to show dialog.
 - Choices. This is used to show choices.
 - Show. This is used to show images. 
 - Hide. This is used to hide images. 
 - Go to. This is used to go to certain label.
 - Compare. This is used to compare between two values using an operator
 - Jump. This is used to jump to certain label
 - Custom. This is used to supply a custom function that receives the current page object as the function's argument
 - Nothing. This just does nothing. This is useful to just label something as a destionation of the 'jump' flow.
 - Play This is used to play music

You can add more flow types by calling flow._addCustomHandle("< name of the flow type >", handler). The handler function will be called as a callback so watch out for referencing a class's function from inside handler function.

Interactable Object
Add this objet to add clickable object on the page

####MPLAY
MPLAY namespaced files can be found under /src/m_play/gnovel/static/gnovel/js/mplay. These are classes that implement the story-specific codes of morality play project. Many classes in this folder inherit from MPLAY.MPlayPage which then inherit from GNOVEL.Page. The most important class in this namespace is MPlayPage in mplaypage.js. This class has common functions that are shared among the story pages. It also override many functions from Page and make it specific to Morality Page project. 

