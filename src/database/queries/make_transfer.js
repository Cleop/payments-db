const dbConn = require('../db_connection.js');

// How do I build this function as a function to be used? In build.sql?
//  Then here do I just call select transferBalance(idFrom ,idTo, amountToTransfer);?

module.exports = (transaction, cb) => {
  console.log('Running make_transfer.js');
  console.log(transaction.amount, transaction.account_from);
  dbConn.query(`
    CREATE OR REPLACE FUNCTION transferBalance(idFrom int, idTo int, amountToTransfer decimal) RETURNS VARCHAR(100) AS $$
    DECLARE v_fromUserEndBalance DECIMAL;

    BEGIN
    SELECT balance - amountToTransfer INTO v_fromUserEndBalance
    FROM accounts WHERE acc_id = idFrom;

    IF (v_fromUserEndBalance < 0) THEN
    RAISE EXCEPTION 'Insufficient balance --> %', v_fromUserEndBalance
    USING HINT = 'Account does not have sufficient funds to make this transfer';
    END IF;

    UPDATE accounts
    SET balance = v_fromUserEndBalance
    WHERE acc_id = idFrom;

    UPDATE accounts
    SET balance = balance + amountToTransfer
    WHERE acc_id = idTo;

    INSERT INTO transactions (acc_id_from, acc_id_to, amount)
    VALUES (idFrom, idTo, amountToTransfer);

    RETURN v_fromUserEndBalance;

    END;

    $$ LANGUAGE plpgsql;
    SELECT transferBalance($1,$2,$3);`,
    [transaction.account_from, transaction.account_to, transaction.amount]
  );
}
