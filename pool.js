const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "seon",
    password: "Seon12$$",
    database: "freeboards",
});

module.exports = pool;
