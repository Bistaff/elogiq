#!/bin/bash

echo "👤 Controllo se esiste un superuser..."

echo "Init db"
python manage.py makemigrations
python manage.py migrate --run-syncdb

echo "Create superuser"
python manage.py shell << EOF
from django.contrib.auth import get_user_model

User = get_user_model()
if not User.objects.filter(username='admin').exists():
    print("✅ Creo il superuser 'admin'")
    User.objects.create_superuser('admin', 'admin@example.com', 'Elogiq2025!')
else:
    print("ℹ️ Superuser 'admin' già esistente")
EOF
if [ $? -ne 0 ]; then
    echo "❌ Errore durante la creazione del superuser"
    exit 1
fi

echo "🚀 Avvio il server Django..."
python manage.py runserver 0.0.0.0:8000