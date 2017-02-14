const dbConn = require('../db_connection.js');

module.exports = (acc_id_to, cb) => {
  console.log('Running get_transactions.js');
  dbConn.query(`SELECT *
                FROM transactions
                WHERE acc_id_to = $1
                ORDER BY tran_date DESC;`,
                [acc_id_to],
                (error, result) => {
      console.log('Selecting all from transactions');
      error ? cb(error) : cb(null, result.rows);
    });
};
