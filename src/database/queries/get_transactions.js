const dbConn = require('../db_connection.js');

module.exports = (acc_id_to, cb) => {
  dbConn.query(`SELECT t.acc_id_from, a.acc_name, t.amount,
                CAST(t.tran_date AS CHAR(10)) short_date
                FROM transactions t
                JOIN accounts a ON t.acc_id_from = a.acc_id
                WHERE acc_id_to = $1
                ORDER BY tran_date DESC;`,
                [acc_id_to],
                (error, result) => {
      error ? cb(error) : cb(null, result.rows);
    });
};
