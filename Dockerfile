FROM python:3
MAINTAINER Cem Aydin <cem.aydin@gmx.ch>

RUN mkdir -p /app && \
    mkdir -p /app-data
WORKDIR /app

COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code into the container
COPY reflect_server /app
COPY config-prod.py /app/config.py
