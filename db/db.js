const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createConnection({
    host: config.databaseHost,
    user: config.databaseUser,
    database: config.databaseName,
    password: config.databasePassword
});

module.exports = connection;