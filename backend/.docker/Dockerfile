# Usa una base ufficiale Python
FROM python:3.13

# Disabilita bytecode e buffering
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

# Crea la cartella di lavoro
WORKDIR /code

# Copia solo i file di dipendenza
COPY requirements.txt .

# Installa le dipendenze
RUN pip install --no-cache-dir -r requirements.txt

# Copia solo i file del progetto necessari
COPY companies ./companies
COPY elogiq ./elogiq
COPY utils ./utils
COPY manage.py .
COPY run_be.sh .
COPY startup.sh .
COPY .docker/.env ./.docker/.env

RUN chmod +x run_be.sh
RUN chmod +x startup.sh

RUN apt-get update && apt-get install -y iputils-ping
