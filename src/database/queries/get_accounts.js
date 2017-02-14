const dbConn = require('../db_connection.js');

module.exports = cb => {
  dbConn.query(`SELECT t.acc_id_to, a.acc_name, t.balance
      FROM (
          SELECT acc_id_to, SUM(transactions.amount) as balance
          FROM transactions
          GROUP BY transactions.acc_id_to
        ) t
      JOIN accounts a ON t.acc_id_to = a.acc_id`,
      (error, data) => {
      error ? cb(error) : cb(null, data.rows);
    }
  );
}
