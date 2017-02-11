const fs = require('fs');

const dbConn = require('./db_connection');
console.log(process.env.DB_URL);

const sql = fs.readFileSync(`${__dirname}/builds.sql`).toString();

dbConn.query(sql, (error, result) => {
  (error ? console.log('Error receiving builds.sql', error) : console.log('Result', result));
});
