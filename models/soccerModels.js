const { Pool } = require('pg');

const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'soccerdb',
  password: 'mypassword',
  port: 5432,
});

// -- pool.query('SELECT NOW()', (err, res) => {
// --   console.log(err, res);
// --   pool.end();
// -- });

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};