function DbController() {};

DbController.prototype.initDBConnection = function() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'pes03',
        database: 'restful_api',
        dateStrings: 'date',
        debug: false
    });
    connection.connect();
    this.mysql = mysql;
    this.connection = connection;
}

DbController.prototype.closeDBConnection = function() {
    this.connection.end();
}

DbController.prototype.clearDB = function() {
    this.connection.query('DELETE FROM `user`', function(err, rows, fields) {
        if (!err)
            console.log('Deleted all the rows from `user` table');
        else
            console.log('Error while performing Query.');
    });

    this.connection.query('DELETE FROM `payment_method`', function(err, rows, fields) {
        if (!err)
            console.log('Deleted all the rows from `payment_method` table');
        else
            console.log('Error while performing Query.');
    });

    this.connection.query('DELETE FROM `shipment_method`', function(err, rows, fields) {
        if (!err)
            console.log('Deleted all the rows from `shipment_method` table');
        else
            console.log('Error while performing Query.');
    });
}

DbController.prototype.insertUser = function(userData) {
    var fields = "";
    var values = "";
    var table = ["user"];
    var first = true;
    for (var field in userData) {
        if (first) {
            first = false;
            fields += "??";
            values += "?";
        }
        else {
            fields += ",??";
            values += ",?";
        }
        table.push(field);
    }
    for (var field in userData) {
        table.push(userData[field]);
    }
    var query = "INSERT INTO ??(" + fields + ") VALUES(" + values + ")";
    query = this.mysql.format(query, table);
    this.connection.query(query, function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query.');
    });
}


module.exports = new DbController();
