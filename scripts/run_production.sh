mkdir -p ../../static
python3 ../src/m_play/manage.py collectstatic
sudo /etc/init.d/nginx restart
cd ../src/m_play/
uwsgi --socket :8001 --module m_play.wsgi:application --chmod-socket=664