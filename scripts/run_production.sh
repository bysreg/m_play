mkdir -p ../../static
python3 ../src/m_play/manage.py collectstatic
sudo /etc/init.d/nginx restart
cd ../src/m_play/
uwsgi --ini m_play_uwsgi.ini