const fs = require('fs');
const dbConn = require('./db_connection');
const sql = fs.readFileSync(`${__dirname}/builds.sql`).toString();

dbConn.query(sql, (error, result) => {
  (error ? console.log('Error receiving builds.sql', error) : console.log('Result', result));
});
