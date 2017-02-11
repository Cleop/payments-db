const dbConn = require('../db_connection.js');

module.exports = cb => {
  console.log('Running get_accounts.js');
  dbConn.query('SELECT * FROM accounts;', (error, data) => {
      console.log('Selecting all from accounts');
      error ? cb(error) : cb(null, data.rows);
    }
  );
}
