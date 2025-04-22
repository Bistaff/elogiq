# ADMIN

### Creare user and DB if does not exists
* `psql postgres`
* `CREATE ROLE eadmin WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD 'Elogiq2025!';`
* `CREATE DATABASE elogiq OWNER eadmin;`
* `DROP DATABASE elogiq;`

### Comandi utili
`\l`: List of databases

### Admin credentials
To create superuser: `python manage.py createsuperuser`
* User: `admin`
* Email: `admin@elogiq.com`
  * Pass: `Elogiq2025!`

### Per le migrazioni
* `python manage.py dbshell`
* `DELETE FROM django_migrations;`
* `DROP TABLE django_migrations;`

### Per production
* Disabilita DEBUG=True
* Gestisci CORS origins

--------

# SWAGGER
http://127.0.0.1:8000/swagger/

# DEPLOY

### File paths
Change these values in .env file
```
POSTGRES_USER=eadmin
DJANGO_DEBUG=False
```

Create the nwtwork: `docker network create elogiq-net`
