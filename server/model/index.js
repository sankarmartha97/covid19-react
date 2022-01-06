/* **********************
    connections file

*  ************************/

const {Client} = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect((err) => {
    if (err) {
      console.error('Database connection error', err.stack);
    } else {
      console.log(process.env.DB_DATABASE,"Database is connected");
    }
});

module.exports = {
    query: (text, params, callback) => {
      return client.query(text, params, callback);
    }
};