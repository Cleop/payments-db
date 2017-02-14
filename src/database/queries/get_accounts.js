const dbConn = require('../db_connection.js');

module.exports = cb => {
  console.log('Running get_accounts.js');
  dbConn.query(`SELECT t.acc_id_to, a.acc_name, t.balance
      FROM (
          SELECT acc_id_to, SUM(transactions.amount) as balance
          FROM transactions
          GROUP BY transactions.acc_id_to
        ) t
      JOIN accounts a ON t.acc_id_to = a.acc_id`,
      (error, data) => {
      console.log('Selecting all from accounts');
      error ? cb(error) : cb(null, data.rows);
    }
  );
}
