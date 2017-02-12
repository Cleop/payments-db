const dbConn = require('../db_connection.js');

module.exports = (cb) => {
  console.log('Running get_transactions.js');
  dbConn.query('SELECT * \
                FROM transactions\
                WHERE acc_id_from = 1 OR\
                acc_id_to = 1;',
                (error, result) => {
      console.log('Selecting all from transactions');
      error ? cb(error) : cb(null, result.rows);
    });
};
