const dbConn = require('../db_connection.js');

module.exports = cb => {
  console.log("hi");
  dbConn.query('SELECT * FROM accounts;', (error, data) => {
      console.log("hi again");
      error ? cb(error) : cb(null, data.rows);
    }
  );
}
