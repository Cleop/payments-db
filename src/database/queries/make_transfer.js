const dbConn = require('../db_connection.js');

module.exports = (transaction, cb) => {
  console.log('Running make_transfer.js');
  console.log(transaction.amount, transaction.account_from);
  // check sender has available balance
  const fromId = parseInt(transaction.account_from, 10) + 1;
  const toId = parseInt(transaction.account_to, 10) + 1;
  const amount = parseFloat(transaction.amount);
  const debit = 0 - amount;

  console.log('fromId:', fromId, 'toId:', toId, 'amount:', amount);

  dbConn.query(`
    SELECT t.acc_id_to, a.acc_name, t.balance
    FROM (
        SELECT acc_id_to, SUM(transactions.amount) as balance
        FROM transactions
        GROUP BY transactions.acc_id_to
      ) t
    JOIN accounts a ON t.acc_id_to = a.acc_id
    WHERE a.acc_id = $1
  `, [fromId], (err, data) => {
    console.log(err, data);
    console.log("balance:" + data.rows[0].balance);
    // check the "From" account has sufficient balance
    if(data.rows[0].balance < amount) {
      return cb('Error: Insufficient Funds!', data);
    } else {
      // perform transactions
      dbConn.query(`
        INSERT INTO transactions (acc_id_from, acc_id_to, amount) VALUES ($1, $2, $3);
      `, [fromId, toId, amount], (err2, data2) => {
        // console.log('first entry:')
        // console.log(err2, data2);
        dbConn.query(`
          INSERT INTO transactions (acc_id_from, acc_id_to, amount) VALUES ($1, $2, $3);
        `, [toId, fromId, debit], (err3, data3) => {
          // console.log('double entry:')
          // console.log(err3, data3);
          const success = "Success: transaction complete."
          return cb(err3, data3, success);
        });
      });
    };
  })
}

//   dbConn.query(`
//     CREATE OR REPLACE FUNCTION transferBalance(idFrom int, idTo int, amountToTransfer decimal) RETURNS VARCHAR(100) AS $$
//     DECLARE v_fromUserEndBalance DECIMAL;
//
//     BEGIN
//     SELECT balance - amountToTransfer INTO v_fromUserEndBalance
//     FROM accounts WHERE acc_id = idFrom;
//
//     IF (v_fromUserEndBalance < 0) THEN
//     RAISE EXCEPTION 'Insufficient balance --> %', v_fromUserEndBalance
//     USING HINT = 'Account does not have sufficient funds to make this transfer';
//     END IF;
//
//     UPDATE accounts
//     SET balance = v_fromUserEndBalance
//     WHERE acc_id = idFrom;
//
//     UPDATE accounts
//     SET balance = balance + amountToTransfer
//     WHERE acc_id = idTo;
//
//     INSERT INTO transactions (acc_id_from, acc_id_to, amount)
//     VALUES (idFrom, idTo, amountToTransfer);
//
//     RETURN v_fromUserEndBalance;
//
//     END;
//
//     $$ LANGUAGE plpgsql;
//     SELECT transferBalance($1,$2,$3);`,
//     [transaction.account_from, transaction.account_to, transaction.amount]
//   );
