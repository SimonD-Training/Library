const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

database = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

module.exports = database;