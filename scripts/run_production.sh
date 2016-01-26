mkdir -p ../../static
python3 ../src/m_play/manage.py collectstatic
python3 ../src/m_play/manage.py runserver