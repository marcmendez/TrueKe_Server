var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");
var app = express();

function REST() {
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'pes03',
        database: 'restful_api',
        dateStrings: 'date',
        debug: false
    });
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log("There was an error with the connection and It will be stopped. Error: " + err);
            self.stop(err);
        } else {
            self.configureExpress(connection);
        }
    });

    function keepAlive() {
        pool.getConnection(function(err, connection) {
            if (err) {console.log("There was an error with the connection and It will be stopped. Error: " + err);}
            // console.log("PING TO MYSQL!");
            connection.ping();
            connection.release();
        });
    }
    setInterval(keepAlive, 30000);
}

REST.prototype.configureExpress = function(connection) {
    var self = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    var router = express.Router();
    app.use('/api', router);
    var rest_router = new rest(router, connection, md5);
    self.startServer();
}

REST.prototype.startServer = function() {
    app.listen(3000, function() {
        console.log("All right ! I am alive at Port 3000.");
    });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();
