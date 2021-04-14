const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'formation_users',
    password: 'nodecomplete'
})

module.exports = pool.promise();

