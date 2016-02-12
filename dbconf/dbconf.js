var mysql = require('./node_modules/mysql');

exports.dbconf=function(dbinfo) {

    return mysql.createConnection({
	host:'__hostname',
	port:'__port',
        user: '__username',
        password: '__password',
        database: '__databasename'
    });
};