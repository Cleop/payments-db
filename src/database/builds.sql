BEGIN;

DROP TABLE IF EXISTS accounts cascade;

CREATE TABLE accounts (
  acc_id          SERIAL          PRIMARY KEY     NOT NULL,
  acc_name        VARCHAR(100)    NOT NULL,
  email           VARCHAR(100)    NOT NULL
);

INSERT INTO accounts (acc_name, email) VALUES ('Bank', 'bank@se.com');
INSERT INTO accounts (acc_name, email) VALUES ('Nirvana', 'cleo.pearson@hotmail.co.uk');
INSERT INTO accounts (acc_name, email) VALUES ('Queen', 'cleo@foundersandcoders.com');
INSERT INTO accounts (acc_name, email) VALUES ('Abba', 'abba@se.com');

COMMIT;

BEGIN;

DROP TABLE IF EXISTS transactions cascade;

CREATE TABLE transactions (
  transaction_id  SERIAL          PRIMARY KEY          NOT NULL,
  acc_id_from     INTEGER REFERENCES accounts(acc_id)  NOT NULL,
  acc_id_to       INTEGER REFERENCES accounts(acc_id)  NOT NULL,
  amount          NUMERIC(5,2)                         NOT NULL,
  tran_date       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO transactions (acc_id_from, acc_id_to, amount) VALUES (1,2,200);
INSERT INTO transactions (acc_id_from, acc_id_to, amount) VALUES (1,3,200);
INSERT INTO transactions (acc_id_from, acc_id_to, amount) VALUES (1,4,200);

COMMIT;
