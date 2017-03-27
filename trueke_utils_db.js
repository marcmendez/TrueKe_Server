

function DbController() {};

DbController.prototype.initDBConnection = function() {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'pes03',
        database: 'restful_api'
    });
    connection.connect();
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


module.exports = new DbController();
