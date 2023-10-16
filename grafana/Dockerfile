FROM grafana/grafana:latest

WORKDIR /etc/grafana

COPY grafana.ini .
WORKDIR /etc/grafana/provisioning
COPY provisioning .

EXPOSE 3000

CMD ["grafana-server", "--config=/etc/grafana/grafana.ini"]


