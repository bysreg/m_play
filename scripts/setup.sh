python3 ../src/m_play/manage.py createsu
python3 ../src/m_play/manage.py migrate

echo "for production, symlink to ../src/m_play/m_play_nginx.conf from /etc/nginx/sites-enabled"
sudo ln -s ../src/m_play/m_play_nginx.conf /etc/nginx/sites-enabled/