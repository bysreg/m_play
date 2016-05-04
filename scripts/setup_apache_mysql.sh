# this script assume we are using python 2

python ../src/m_play/manage.py makemigrations
python ../src/m_play/manage.py migrate

mkdir -p ../../static

# copy all static files to the static folder defined in settings.py
python ../src/m_play/manage.py collectstatic

#echo "for production, symlink to ../src/m_play/m_play_nginx.conf from /etc/nginx/sites-enabled"
#cwd=$(pwd)
#sudo ln -s $(pwd)/../src/m_play/m_play_nginx.conf /etc/nginx/sites-enabled/
