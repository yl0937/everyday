const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: '43.200.244.4',
    // host: 'localhost',
    user: 'master',
    port: '3306',
    password: '@master123',
    database: 'capstone'
});

module.exports = {
    pool: pool
};