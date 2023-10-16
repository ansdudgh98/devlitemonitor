create database devlitemonitordb;

use devlitemonitordb;


create table account
(
    account_id         bigint not null,
    created_date       datetime(6),
    last_modified_date datetime(6),
    kakao_id           varchar(255),
    profile_name       varchar(255),
    primary key (account_id),
    unique (account_id, kakao_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table grafana_admin_session
(
    created_date             datetime(6),
    grafana_admin_session_id bigint not null,
    last_modified_date       datetime(6),
    session_value            varchar(255),
    primary key (grafana_admin_session_id),
    unique (grafana_admin_session_id, session_value)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table grafana_account
(
    grafana_account_id integer not null,
    org_num            integer,
    account_id         bigint,
    created_date       datetime(6),
    last_modified_date datetime(6),
    login_id           varchar(255),
    name               varchar(255),
    org                varchar(255),
    password           varchar(255),
    primary key (grafana_account_id),
    unique (grafana_account_id, org_num, name, org, login_id),
    foreign key (account_id) REFERENCES account (account_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


create table account_seq
(
    next_val bigint
);

insert into account_seq
values (1);

create table grafana_admin_session_seq
(
    next_val bigint
);

insert into grafana_admin_session_seq
values (1);

CREATE TABLE SPRING_SESSION
(
    PRIMARY_ID            CHAR(36) NOT NULL,
    SESSION_ID            CHAR(36) NOT NULL,
    CREATION_TIME         BIGINT   NOT NULL,
    LAST_ACCESS_TIME      BIGINT   NOT NULL,
    MAX_INACTIVE_INTERVAL INT      NOT NULL,
    EXPIRY_TIME           BIGINT   NOT NULL,
    PRINCIPAL_NAME        VARCHAR(100),
    CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
) ENGINE = InnoDB
  ROW_FORMAT = DYNAMIC;

CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID);
CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME);
CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);

CREATE TABLE SPRING_SESSION_ATTRIBUTES
(
    SESSION_PRIMARY_ID CHAR(36)     NOT NULL,
    ATTRIBUTE_NAME     VARCHAR(200) NOT NULL,
    ATTRIBUTE_BYTES    BLOB         NOT NULL,
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION (PRIMARY_ID) ON DELETE CASCADE
) ENGINE = InnoDB
  ROW_FORMAT = DYNAMIC;
