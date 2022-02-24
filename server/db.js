const mysql = require('mysql');

exports.pool = mysql.createPool ({
    user: 'anes',
    host: '127.0.0.1',
    password: 'suaccount01',
    database: 'tsh',
    port:'3306',
    debug: false,
    connectionLimit: 5,
	waitForConnections: true, 
	queueLimit: 0 
});
