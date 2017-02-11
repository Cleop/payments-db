BEGIN;

DROP TABLE IF EXISTS accounts cascade;

CREATE TABLE accounts (
  id              SERIAL          PRIMARY KEY     NOT NULL,
  accName         VARCHAR(100)    NOT NULL,
  balance         INTEGER         NOT NULL,
  email           VARCHAR(100)    NOT NULL
);

INSERT INTO accounts (accName, balance, email) VALUES ('Nirvana', 200, 'cleo.pearson@hotmail.co.uk');
INSERT INTO accounts (accName, balance, email) VALUES ('Queen', 200, 'cleo@foundersandcoders.com');
INSERT INTO accounts (accName, balance, email) VALUES ('Abba', 200, 'abba@se.com');

COMMIT;
