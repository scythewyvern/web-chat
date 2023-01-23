FROM instrumentisto/medea:edge as base

FROM debian:bullseye-slim as runtime

COPY --from=base /medea /

COPY config.toml /
COPY spec.yml /specs/

ENV MEDEA_CONF=/config.toml

CMD env MEDEA_SERVER__CLIENT__HTTP__BIND_PORT=$PORT /medea
