// token generation
var md5 = require("MD5");
var MAGIC_NUMBER_ADMIN = 0x82862484753532;
var MAGIC_PHRASE = "Oro parece, plátano es";
var ADMIN_TOKEN = md5(MAGIC_NUMBER_ADMIN); // f4493ed183abba6b096f3903a5fc3b64
var DEBUG = true;
var fs = require('fs');
var mysql = require("mysql");

function getInsertQueryParameters(dataObj) {
    var fields = "";
    var values = "";
    var table = [];
    var first = true;
    for (var field in dataObj) {
        if (first) {
            first = false;
            fields += "??";
            var toAdd = field == "password" ? "MD5(?)" : "?";
            values += toAdd;
        } else {
            fields += ",??";
            var toAdd = field == "password" ? ",MD5(?)" : ",?";
            values += toAdd;
        }
        table.push(field);
    }
    for (var field in dataObj) {
        table.push(dataObj[field]);
    }
    var objToReturn = new Object();
    objToReturn.table = table;
    objToReturn.fields = fields;
    objToReturn.values = values;
    return table;
}

function getUpdateQueryParameters(dataObj) {
    var assignments = "";
    var table = [];
    var first = true;
    for (var field in dataObj) {
        if (first) {
            first = false;
            var toAdd = field == "password" ? "??=MD5(?)" : "??=?";
            assignments += toAdd;
        } else {
            var toAdd = field == "password" ? ",??=MD5(?)" : ",??=?";
            assignments += toAdd;
        }
        table.push(field);
        table.push(dataObj[field]);
    }
    var objToReturn = new Object();
    objToReturn.table = table;
    objToReturn.assignments = assignments;
    return objToReturn;
}

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}
REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {
    var self = this;
    router.get("/", function(req, res) {
        res.json({
            "Message": "We are working hard on TrueKe!"
        });
    });
    // AUTHENTICATION MECHANISM
    // ----- ----- ----- -----
    router.post("/authenticate", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
        if (req.body.email) {
            var table = ["user", "email", req.body.email, "password", md5(req.body.password)];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (!err && typeof(rows[0]) != 'undefined') {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": {
                            user: rows[0],
                            token: md5(rows[0].id + MAGIC_PHRASE)
                        }
                    });
                } else {
                    if (err) console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                }
            });
        } else if (req.body.phone) {
            var table = ["user", "phone", req.body.phone, "password", md5(req.body.password)];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (!err && typeof(rows[0]) != 'undefined') {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": {
                            user: rows[0],
                            token: md5(rows[0].id + MAGIC_PHRASE)
                        }
                    });
                } else {
                    if (err) console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                }
            });
        } else {
            res.json({
                "Error": true,
                "Message": "Error executing the query"
            });
        }
    });
    // USER TABLE
    // ----- ----- ----- -----
    // Get all the db users.
    router.get("/users", function(req, res) {
        var token = req.headers["token"];
        if (token == ADMIN_TOKEN) {
            var query = "SELECT * FROM ??";
            var table = ["user"];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": rows
                    });
                }
            });
        } else {
            res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated"
            });
        }
    });

    router.get("/users/:id", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user", "id", req.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing the query"
                });
            } else {
                var token = req.headers["token"];
                if (ADMIN_TOKEN === token || (typeof(rows[0]) != 'undefined' && token === md5(rows[0].id + MAGIC_PHRASE))) {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": rows
                    });
                } else {
                    res.json({
                        "Error": true,
                        "Message": "Fail to access to API REST. You are not authenticated"
                    });
                }
            }
        });
    });

    // Get specific user data by phone.
    router.get("/users/byphone/:phone", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user", "phone", req.params.phone];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing the query"
                });
            } else {
                var token = req.headers["token"];
                if (ADMIN_TOKEN === token || (typeof(rows[0]) != 'undefined' && token === md5(rows[0].id + MAGIC_PHRASE))) {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": rows
                    });
                } else {
                    res.json({
                        "Error": true,
                        "Message": "Fail to access to API REST. You are not authenticated"
                    });
                }
            }
        });
    });
    // Get specific user data by email.
    router.get("/users/byemail/:email", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user", "email", req.params.email];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing the query"
                });
            } else {
                var token = req.headers["token"];
                if (ADMIN_TOKEN === token || (typeof(rows[0]) != 'undefined' && token === md5(rows[0].id + MAGIC_PHRASE))) {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": rows
                    });
                } else {
                    res.json({
                        "Error": true,
                        "Message": "Fail to access to API REST. You are not authenticated"
                    });
                }
            }
        });
    });
    // Insert an user into the db.
    router.post("/users", function(req, res) {
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        var table = ["user", "phone", "user", "password", "birthDate", "email", req.body.phone, req.body.user, md5(req.body.password), req.body.birthDate, req.body.email];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing the query"
                });
            } else {
                res.json({
                    "Error": false,
                    "Message": "User Added !",
                    "Content": {
                        user: {
                            id: rows.insertId
                        },
                        token: md5(rows.insertId + MAGIC_PHRASE)
                    }
                });
            }
        });
    });
    // Modify an user with a specific id.
    router.put("/users/:id", function(req, res) {
        // For security, we don't allow change id's
        delete req.body["id"];
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.params.id + MAGIC_PHRASE)) {
            var queryParameters = getUpdateQueryParameters(req.body);
            var query = "UPDATE ?? SET " + queryParameters.assignments + " WHERE ??=?";
            var table = ["user"].concat(queryParameters.table.concat(["id", req.params.id]));
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "Field Updated !"
                    });
                }
            });
        } else {
            res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated"
            });
        }
    });
    // Deletes an user with a specific id.
    router.delete("/users/:id", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.params.id + MAGIC_PHRASE)) {
            var query = "DELETE from ?? WHERE ??=?";
            var table = ["user", "phone", req.params.id, "id", MAGIC_PHRASE, token, ADMIN_TOKEN, token];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "User Deleted !"
                    });
                }
            });
        } else {
            res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated"
            });
        }
    });
    // PAYMENT_METHOD TABLE
    // ----- ----- ----- -----
    // Get the user payment data of a specific user.
    router.get("/paymentmethods/:user_id", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.params.user_id + MAGIC_PHRASE)) {
            var query = "SELECT * FROM ?? WHERE ??=?";
            var table = ["payment_method", "user_id", req.params.user_id];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": rows
                    });
                }
            });
        } else {
            res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated"
            });
        }
    });
    // Insert a payment info of an specific user.
    router.post("/paymentmethods", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.body.user_id + MAGIC_PHRASE)) {
            var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            var table = ["payment_method", "user_id", "type", "number", "expireDate", "name", "country", "province", "city", "postalCode", "address", "phone", req.body.user_id,
                req.body.type, req.body.number, req.body.expireDate, req.body.name,
                req.body.country, req.body.province, req.body.city,
                req.body.postalCode, req.body.address, req.body.phone
            ];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": err
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "User Payment Method Added !"
                    });
                }
            });
        } else {
            res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated"
            });
        }
    });
    // Modify a payment info.
    router.put("/paymentmethods/:id", function(req, res) {
        // For security, we don't allow change id's
        delete req.body["id"];
        delete req.body["user_id"];
        var token = req.headers["token"];

        if (ADMIN_TOKEN === token) {
            var queryParameters = getUpdateQueryParameters(req.body);
            var query = "UPDATE ?? SET " + queryParameters.assignments + " WHERE ??=?";
            var table = ["payment_method"].concat(queryParameters.table.concat(["id", req.params.id]));
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "Updated the field !"
                    });
                }
            });
        } else {
            var queryAssertion = "SELECT * FROM ?? WHERE ??=?";
            var tableAssertion = ["payment_method", "id", req.params.id];
            queryAssertion = mysql.format(queryAssertion, tableAssertion);
            connection.query(queryAssertion, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else if (typeof(rows[0]) != 'undefined' && md5(rows[0].user_id + MAGIC_PHRASE) === token) {
                    var queryParameters = getUpdateQueryParameters(req.body);
                    var query = "UPDATE ?? SET " + queryParameters.assignments + " WHERE ??=?";
                    var table = ["payment_method"].concat(queryParameters.table.concat(["id", req.params.id]));
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                            res.json({
                                "Error": true,
                                "Message": "Error executing the query"
                            });
                        } else {
                            res.json({
                                "Error": false,
                                "Message": "Updated the field !"
                            });
                        }
                    });
                } else {
                    res.json({
                        "Error": true,
                        "Message": "Fail to access to API REST. You are not authenticated"
                    });
                }
            });
        }

    });

    // Deletes a payment info.
    router.delete("/paymentmethods/:id", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token) {
            var query = "DELETE FROM ?? WHERE ??=?";
            var table = ["payment_method", "id", req.params.id];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "Payment Method Deleted !"
                    });
                }
            });
        } else {
            var queryAssertion = "SELECT * FROM ?? WHERE ??=?";
            var tableAssertion = ["payment_method", "id", req.params.id];
            queryAssertion = mysql.format(queryAssertion, tableAssertion);
            connection.query(queryAssertion, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else if (typeof(rows[0]) != 'undefined' && md5(rows[0].user_id + MAGIC_PHRASE) === token) {
                    var query = "DELETE FROM ?? WHERE ??=?";
                    var table = ["payment_method", "id", req.params.id];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                            res.json({
                                "Error": true,
                                "Message": "Error executing the query"
                            });
                        } else {
                            res.json({
                                "Error": false,
                                "Message": "Payment Method Deleted !"
                            });
                        }
                    });
                } else {
                    res.json({
                        "Error": true,
                        "Message": "Fail to access to API REST. You are not authenticated"
                    });
                }
            });
        }
    });

    // SHIPMENT_METHOD TABLE
    // ----- ----- ----- -----
    // Get the user shipment info of a specific user.
    router.get("/shipmentmethods/:user_id", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.params.user_id + MAGIC_PHRASE)) {
            var query = "SELECT * FROM ?? WHERE ??=?";
            var table = ["shipment_method", "user_id", req.params.user_id];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": rows
                    });
                }
            });
        } else {
            res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated"
            });
        }
    });
    // Insert a user shipment info of an specific user.
    router.post("/shipmentmethods", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.body.user_id + MAGIC_PHRASE)) {
            var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
            var table = ["shipment_method", "user_id", "country", "province", "city", "postalCode", "address", "name", "idCard", "phone", req.body.user_id,
                req.body.country, req.body.province, req.body.city, req.body.postalCode,
                req.body.address, req.body.name, req.body.idCard, req.body.phone
            ];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": err
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "User Shipment Method Added !"
                    });
                }
            });
        } else {
            res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated"
            });
        }
    });
    // Modify a shipment info.
    router.put("/shipmentmethods/:id", function(req, res) {
        // For security, we don't allow change id's
        delete req.body["id"];
        delete req.body["user_id"];
        var token = req.headers["token"];
        /////////////////////////////////
        // Assert that is a valid user //
        /////////////////////////////////
        if (token === ADMIN_TOKEN) {
            var queryParameters = getUpdateQueryParameters(req.body);
            var query = "UPDATE ?? SET " + queryParameters.assignments + " WHERE ??=?";
            var table = ["shipment_method"].concat(queryParameters.table.concat(["id", req.params.id]));
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "Updated !"
                    });
                }
            });
        } else {
            // Also we can make the assertion inside the query, but then we can't throw a bad token exception.
            var queryAssertion = "SELECT * FROM ?? WHERE ??=?";
            var tableAssertion = ["shipment_method", "id", req.params.id];
            queryAssertion = mysql.format(queryAssertion, tableAssertion);
            connection.query(queryAssertion, function(err, rows) {

                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else if (typeof(rows[0]) != 'undefined' && md5(rows[0].user_id + MAGIC_PHRASE) === token) {
                    var queryParameters = getUpdateQueryParameters(req.body);
                    var query = "UPDATE ?? SET " + queryParameters.assignments + " WHERE ??=?";
                    var table = ["shipment_method"].concat(queryParameters.table.concat(["id", req.params.id]));
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                            res.json({
                                "Error": true,
                                "Message": "Error executing the query"
                            });
                        } else {
                            res.json({
                                "Error": false,
                                "Message": "Updated !"
                            });
                        }
                    });
                } else {
                    res.json({
                        "Error": true,
                        "Message": "Fail to access to API REST. You are not authenticated"
                    });
                }
            });
        }
    });
    // Delete a shipment info.
    router.delete("/shipmentmethods/:id", function(req, res) {
        var token = req.headers["token"];

        if (token === ADMIN_TOKEN) {
            var query = "DELETE FROM ?? WHERE ??=?";
            var table = ["shipment_method", "id", req.params.id];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "Shipment Method Deleted !"
                    });
                }
            });

        } else {
            var queryAssertion = "SELECT * FROM ?? WHERE ??=?";
            var tableAssertion = ["shipment_method", "id", req.params.id];
            queryAssertion = mysql.format(queryAssertion, tableAssertion);
            connection.query(queryAssertion, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else if (typeof(rows[0]) != 'undefined' && md5(rows[0].user_id + MAGIC_PHRASE) === token) {
                    var query = "DELETE FROM ?? WHERE ??=?";
                    var table = ["shipment_method", "id", req.params.id];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                            res.json({
                                "Error": true,
                                "Message": "Error executing the query"
                            });
                        } else {
                            res.json({
                                "Error": false,
                                "Message": "Shipment Method Deleted !"
                            });
                        }
                    });
                } else {
                    res.json({
                        "Error": true,
                        "Message": "Fail to access to API REST. You are not authenticated"
                    });
                }
            });
        }


    });
    // ----- ----- ----- -----
    // CATEGORY TABLE
    // ----- ----- ----- -----
    //  Get all the categories of the db. (It does not need authentication)
    router.get("/categories", function(req, res) {
        var query = "SELECT * FROM ??";
        var table = ["category"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else res.json({
                "Error": false,
                "Message": "Success",
                "Content": rows
            });
        });
    });
    // ----- ----- ----- -----
    // PRODUCT TABLE
    // ----- ----- ----- -----
    router.get("/products", function(req, res) {
        var token = req.headers["token"];
        if (token === ADMIN_TOKEN) {
            var query = "SELECT * FROM ??";
            var table = ["product"];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing MySQL query"
                    });
                } else res.json({
                    "Error": false,
                    "Message": "Success",
                    "Content": rows
                });
            });
        } else res.json({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated as admin"
        });
    });
    //  Get all the products of a given user of the db.
    router.get("/products/:user_id", function(req, res) {
        var token = req.headers["token"];
        if (token === ADMIN_TOKEN || token === md5(req.params.user_id + MAGIC_PHRASE)) {
            var query = "SELECT * FROM ?? WHERE ??=?";
            var table = ["product", "user_id", req.params.user_id];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing MySQL query"
                    });
                } else res.json({
                    "Error": false,
                    "Message": "Success",
                    "Content": rows
                });
            });
        } else res.json({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated."
        });
    });

    function insertProductWantsCategory(insertedId, categories, aux, callback) {
        if (aux < categories.length && categories.length > 0) {
            query = "INSERT INTO ??(??,??) VALUES (?,?)";
            table = ["product_wants_category", "product_id", "category", insertedId, categories[aux]];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    callback(true, insertedId);
                } else if (aux == categories.length - 1) callback(false, insertedId);
                else insertProductWantsCategory(insertedId, categories, aux + 1, callback);
            });
        } else if (categories.length > 0) callback(false, insertedId);
    }
    // Inserts a product of an specific user.
    router.post("/products", function(req, res) {
        var token = req.headers["token"];
        if (token === ADMIN_TOKEN || token === md5(req.body.user_id + MAGIC_PHRASE)) {
            var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
            var table = ["product", "user_id", "title", "description", "category", "min_price", "max_price", req.body.user_id,
                req.body.title, req.body.description, req.body.category, req.body.min_price, req.body.max_price
            ];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing MySQL query"
                    });
                } else {
                    var categories = req.body.wants_categories.split("-");
                    insertProductWantsCategory(rows.insertId, categories, 0, function(err, insertedId) {
                        if (err) {
                            console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                            res.json({
                                "Error": true,
                                "Message": "Error executing MySQL query"
                            });
                            var query = "DELETE FROM ?? WHERE ??=?";
                            var table = ["product", "id", insertedId];
                            query = mysql.format(query, table);
                            connection.query(query, function() {});
                        } else res.json({
                            "Error": false,
                            "Message": "A new product was inserted in the database"
                        });
                    });
                }
            });
        } else res.json({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated."
        });
    });
    // Delete a product.
    router.delete("/products/:id", function(req, res) {
        var token = req.headers["token"];
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["product", "id", req.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else if (token == ADMIN_TOKEN || (typeof(rows[0]) != 'undefined' && token == md5(rows[0].user_id + MAGIC_PHRASE))) {
                var query = "DELETE FROM ?? WHERE ??=?";
                var table = ["product", "id", req.params.id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                        res.json({
                            "Error": true,
                            "Message": "Error executing MySQL query"
                        });
                    } else res.json({
                        "Error": false,
                        "Message": "Product deleted correctly"
                    });
                });
            } else res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated."
            });
        });
    });
    // ----- ----- ----- ----- ----
    // PRODUCT WANTS CATEGORY TABLE
    // ----- ----- ----- ----- ----
    // Inserts a pair of a product and a category to reflect the wanting categories of the product.
    router.get("/productwantscategory/:product_id", function(req, res) {
        var token = req.headers["token"];
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["product", "id", req.params.product_id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else if (token == ADMIN_TOKEN || (typeof(rows[0]) != 'undefined' && token == md5(rows[0].user_id + MAGIC_PHRASE))) {
                var query = "SELECT * FROM ?? WHERE ??=?";
                var table = ["product_wants_category", "product_id", req.params.product_id];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                        res.json({
                            "Error": true,
                            "Message": "Error executing MySQL query"
                        });
                    } else res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": rows
                    });
                });
            } else res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated."
            });
        });
    });

     router.post("/productwantscategory", function(req, res) {

        var token = req.headers["token"];
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["product", "id", req.body.product_id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {

            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });

            } else if (token == ADMIN_TOKEN || (typeof(rows[0]) != 'undefined' && token == md5(rows[0].user_id + MAGIC_PHRASE))) {

                var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                var table = ["product_wants_category", "product_id", "category", req.body.product_id, req.body.category];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                        res.json({
                            "Error": true,
                            "Message": "Error executing MySQL query"
                        });
                    } else 
                        res.json({
                            "Error": false,
                            "Message": "A new wanted category was inserted."
                        });     
                }); 

            } else
                res.json({
                    "Error": true,
                    "Message": "Fail to access to API REST. You are not authenticated."
                });
        });

    });

    router.delete("/productwantscategory", function(req, res) {

        var token = req.headers["token"];
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["product", "id", req.body.product_id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {

            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });

            } else if (token == ADMIN_TOKEN || (typeof(rows[0]) != 'undefined' && token == md5(rows[0].user_id + MAGIC_PHRASE))) {

                var query = "DELETE FROM ?? WHERE product_id=? AND category=?";
                var table = ["product_wants_category", req.body.product_id, req.body.category];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {
                    if (err) {
                        console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                        res.json({
                            "Error": true,
                            "Message": "Error executing MySQL query"
                        });
                    } else 
                        res.json({
                            "Error": false,
                            "Message": "A wanted category was deleted."
                        });     
                }); 

            } else
                res.json({
                    "Error": true,
                    "Message": "Fail to access to API REST. You are not authenticated."
                });
        });

    });


    // ----- ----- ----- -----
    // MATCH TABLE
    // ----- ----- ----- -----

    router.post("/matches", function(req, res) {

        var token = req.headers["token"];
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["product", "id", req.body.product_id1];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {

            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else if (token == ADMIN_TOKEN || (typeof(rows[0]) != 'undefined' && token == md5(rows[0].user_id + MAGIC_PHRASE))) {

                var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
                var table = ["match", "product_id1", "product_id2", "wants", req.body.product_id1, req.body.product_id2, req.body.wants];
                query = mysql.format(query, table);
                connection.query(query, function(err, rows) {

                    if (err) {
                        console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                        res.json({
                            "Error": true,
                            "Message": "Error executing MySQL query"
                        });
                    } else res.json({
                        "Error": false,
                        "Message": "Match Added !",
                    });

                });

            } else res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated."
            });
        });
    });

    // + GETTING PRODUCTS

    router.get("/products/matchmaking/:id", function(req, res) {

        var token = req.headers["token"];
        var query = "SELECT p.id as id, " +
            "p.user_id as user_id, " +
            "p.min_price as min_price, " +
            "p.max_price as max_price, " +
            "pc.category as desired_category " +
            "FROM product p INNER JOIN product_wants_category pc ON  p.id=pc.product_id WHERE p.id=?";
        var table = [req.params.id];
        query = mysql.format(query, table);

        connection.query(query, function(err, rows) {

            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing MySQL query"
                });
            } else if (token == ADMIN_TOKEN || (typeof(rows[0]) != 'undefined' && token == md5(rows[0].user_id + MAGIC_PHRASE))) {
                var query = "SELECT * " +
                    "FROM product p " +
                    "WHERE p.user_id<>" + rows[0].user_id + " AND (" +
                    "(" + rows[0].min_price + " <= p.min_price AND p.min_price <=" + rows[0].max_price + ") OR " +
                    "(" + rows[0].min_price + " <= p.max_price AND p.max_price <=" + rows[0].max_price + ")) AND ";

                for (i = 0; i < rows.length; ++i) {
                    if (i == 0) query = query + "(p.category=" + "'" + rows[i].desired_category + "'";
                    else query = query + " OR p.category=" + "'" + rows[i].desired_category + "'";
                }

                query = query + ") AND 0 >= (SELECT COUNT(*) FROM `match` m WHERE m.product_id2=p.id AND m.product_id1=" + rows[0].id + ")";
                connection.query(query, function(err, rows) {
                    if (err) {
                        console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                        res.json({
                            "Error": true,
                            "Message": "Error executing MySQL query"
                        });
                    } else
                        res.json({
                            "Error": false,
                            "Message": "Success",
                            "Content": rows
                        });

                });
            } else res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated."
            });
        });
    });



    // ----- ----- ----- -----
    // CHAT TABLE
    // ----- ----- ----- -----

    router.get("/chats", function(req, res) {
        var token = req.headers["token"];
        if (token == ADMIN_TOKEN) {
            var query = "SELECT * FROM ??";
            var table = ["chat"];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                } else {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": rows
                    });
                }
            });
        } else {
            res.json({
                "Error": true,
                "Message": "Fail to access to API REST. You are not authenticated"
            });
        }
    });

    // ----

    /////////////////
    // IMAGE TABLE //
    /////////////////

    router.get("/images/:md5", function(req, res) {
        // See if exists the image
        var query = "SELECT * FROM ?? WHERE ??=?"
        var table = ["image", "md5", req.params.md5];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing the query"
                });
            }
            else {

                if (err) {
                    console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                    res.json({
                        "Error": true,
                        "Message": "Error executing the query"
                    });
                }
                else {
                    var dataToReturn = rows[0] ? fs.readFileSync(rows[0].imagePath, 'base64') : "";
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": dataToReturn
                    });
                }
            }
        });
        
    });

    router.post("/images", function(req, res) {
        var data = req.body.image;
        var datamd5 = md5(data);
        // See if exists the image
        var query = "SELECT * FROM ?? WHERE ??=?"
        var table = ["image", "md5", datamd5];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                res.json({
                    "Error": true,
                    "Message": "Error executing the query"
                });
            }
            else {
                // If not exist, insert

                if (rows.length == 0) {
                    var buf = new Buffer(data, "base64");
                    fs.writeFile("images/" + datamd5, buf);
                    
                    
                    var query = "INSERT INTO ??(??,??) VALUES (?,?)"
                    var table = ["image", "md5", "imagePath", datamd5, "images/" + datamd5];
                    query = mysql.format(query, table);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            console.log("DB DEBUG INFO. THE ERROR WAS: " + err);
                            res.json({
                                "Error": true,
                                "Message": "Error executing the query"
                            });
                        }
                        else {
                            res.json({
                                "Error": false,
                                "Message": "Success",
                                "Content": "images/" + datamd5
                            });
                        }
                    });
                }
                else {
                    res.json({
                        "Error": false,
                        "Message": "Success",
                        "Content": "images/" + datamd5
                    });
                }
            }
        });
        
    });
}
module.exports = REST_ROUTER;