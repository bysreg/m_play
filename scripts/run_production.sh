mkdir -p ../../static

# copy all static files to the static folder defined in settings.py
python3 ../src/m_play/manage.py collectstatic

sudo /etc/init.d/nginx restart
cd ../src/m_play/

# kill process in port 8001 (in case old uwsgi is still using it)
fuser -k 8001/tcp

uwsgi --ini m_play_uwsgi.ini


