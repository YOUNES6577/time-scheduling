const mysql = require('mysql');

exports.pool = mysql.createPool ({
    // user: 'anes',
    // host: '127.0.0.1',
    // password: 'suaccount01',
    // database: 'tsh',
    user: 'Ul7GSWN7H4',
    host: 'remotemysql.com',
    password: '7ta6yPF8OR',
    database: 'Ul7GSWN7H4',
    port:'3306',
    debug: false,
    connectionLimit: 5,
	waitForConnections: true, 
	queueLimit: 0 
});
