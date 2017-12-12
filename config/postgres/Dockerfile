FROM postgres:9.6

ENV POSTGRES_USER ornn
ENV POSTGRES_PASSWORD ornn
ENV POSTGRES_DB ornn_test

ADD ./init.sql /docker-entrypoint-initdb.d/
