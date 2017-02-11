BEGIN;

DROP TABLE IF EXISTS accounts cascade;

CREATE TABLE accounts (
  acc_id          SERIAL          PRIMARY KEY     NOT NULL,
  acc_name        VARCHAR(100)    NOT NULL,
  balance         DECIMAL(5,2)    NOT NULL,
  email           VARCHAR(100)    NOT NULL
);

INSERT INTO accounts (acc_name, balance, email) VALUES ('Nirvana', 200, 'cleo.pearson@hotmail.co.uk');
INSERT INTO accounts (acc_name, balance, email) VALUES ('Queen', 200, 'cleo@foundersandcoders.com');
INSERT INTO accounts (acc_name, balance, email) VALUES ('Abba', 200, 'abba@se.com');

COMMIT;

BEGIN;

DROP TABLE IF EXISTS transactions cascade;

CREATE TABLE transactions (
  transaction_id  SERIAL          PRIMARY KEY          NOT NULL,
  acc_id_from     INTEGER REFERENCES accounts(acc_id)  NOT NULL,
  acc_id_to       INTEGER REFERENCES accounts(acc_id)  NOT NULL,
  amount          DECIMAL(5,2)                         NOT NULL,
  tran_date       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

COMMIT;
