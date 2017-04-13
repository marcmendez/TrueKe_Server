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
        if (err)
            console.log('Error while performing Query: ' + err);
    });

    this.connection.query('DELETE FROM `payment_method`', function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ' + err);
    });

    this.connection.query('DELETE FROM `shipment_method`', function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ' + err);
    });

    this.connection.query('DELETE FROM `category`', function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query.');
    });

    this.connection.query('DELETE FROM `product`', function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query.');
    });

    this.connection.query('DELETE FROM `match`', function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query.');
    });

    this.connection.query('DELETE FROM `chat`', function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query.');
    });
}

/**
 * Inserts a row inside the specified table on the connected database.
 * @param  {String} tablename - table name inside the database.
 * @param  {Object} dataToInsert - dictionary with keys as a names of table columns and the value for insert.
 * @return {[type]}
 */
DbController.prototype.insert = function(tableName, dataToInsert) {
    var fields = "";
    var values = "";
    var table = [tableName];
    var first = true;
    for (var field in dataToInsert) {
        if (first) {
            first = false;
            fields += "??";
            values += "?";
        } else {
            fields += ",??";
            values += ",?";
        }
        table.push(field);
    }
    for (var field in dataToInsert) {
        table.push(dataToInsert[field]);
    }
    var query = "INSERT INTO ??(" + fields + ") VALUES(" + values + ")";
    query = this.mysql.format(query, table);
    this.connection.query(query, function(err, rows, fields) {
        if (err)
            console.log('Error while performing Query: ' + err);
    });
}

DbController.prototype.insertUser = function(userData) {
    this.insert("user", userData);
}

DbController.prototype.insertPaymentMethod = function(paymentMethodData) {
    this.insert("payment_method", paymentMethodData);
}

DbController.prototype.insertShipmentMethod = function(shipmentMethodData) {
    this.insert("shipment_method", shipmentMethodData);
}

DbController.prototype.insertCategory = function(categoryData) {
  this.insert("category", categoryData);
}

DbController.prototype.insertProduct = function(productData) {
  this.insert("product", productData);
}

DbController.prototype.insertProductWantsCategory = function(productWantsCategoryData) {
  this.insert("product_wants_category", productWantsCategoryData);
}

DbController.prototype.insertMatch = function(matchData) {
  this.insert("match", matchData);
}

module.exports = new DbController();
