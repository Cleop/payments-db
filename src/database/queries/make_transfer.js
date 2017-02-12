const dbConn = require('../db_connection.js');

// How do I build this function as a function to be used? In build.sql?
//  Then here do I just call select transferBalance(idFrom ,idTo, amountToTransfer);?

module.exports = cb => {
  console.log('Running make_transfer.js');
  dbConn.query(`CREATE OR REPLACE FUNCTION transferBalance(idFrom int, idTo int, amountToTransfer decimal) RETURNS VARCHAR(100) AS $$
  DECLARE v_fromUserEndBalance DECIMAL;
  BEGIN
  select balance-amountToTransfer into v_fromUserEndBalance FROM "public"."accounts" where acc_id = idFrom;

  -- check if user1's balance can be changed
  IF (v_fromUserEndBalance < 0) THEN

  -- throw exception if balance too small
  RAISE EXCEPTION 'Insufficient balance --> %', v_fromUserEndBalance
  USING HINT = 'Account does not have sufficient funds to make this transfer';
  END IF;

  -- begin tran

  -- update user1
  update "public"."accounts"
  set balance = v_fromUserEndBalance
  where acc_id = idFrom;

  -- update user 2
  update "public"."accounts"
  set balance = balance + amountToTransfer
  where acc_id = idTo;

  -- update transaction table
  INSERT INTO "transactions" (acc_id_from, acc_id_to, amount) VALUES (idFrom, idTo, amountToTransfer);

  RETURN v_fromUserEndBalance;

  END;

  $$ LANGUAGE plpgsql;
  select transferBalance(2,1,1);`,(error, data) => {
    console.log('Transfering amount');
    error ? cb(error) : cb(null, data.rows);
  }
);
}
