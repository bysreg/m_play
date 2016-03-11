sudo /etc/init.d/nginx restart
uwsgi --daemonize log.txt  --ini ../src/m_play/m_play_uwsgi.ini
