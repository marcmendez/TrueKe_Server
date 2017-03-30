// token generation
var md5 = require("md5");
var MAGIC_NUMBER_ADMIN = 0x82862484753532;
var MAGIC_PHRASE = "Oro parece, plátano es";
var ADMIN_TOKEN = md5(MAGIC_NUMBER_ADMIN); // f4493ed183abba6b096f3903a5fc3b64

var mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {
    var self = this;
    router.get("/", function(req, res) {
        res.json({ "Message": "We are working hard on TrueKe!" });
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
                    res.json({ "Error": false, "Message": "Success", "Token": md5(rows[0].id + MAGIC_PHRASE) });
                } else {
                    res.json({ "Error": true, "Message": "Error executing the query" });
                }
            });
        } else if (req.body.phone) {
            var table = ["user", "phone", req.body.phone, "password", md5(req.body.password)];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (!err && typeof(rows[0]) != 'undefined') {
                    res.json({ "Error": false, "Message": "Success", "Token": md5(rows[0].id + MAGIC_PHRASE) });
                } else {
                    res.json({ "Error": true, "Message": "Error executing the query" });
                }
            });
        } else {
            res.json({ "Error": true, "Message": "Error executing the query" });
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
                    res.json({ "Error": true, "Message": "Error executing the query" });
                } else {
                    res.json({ "Error": false, "Message": "Success", "Users": rows });
                }
            });
        } else {
            res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
        }
    });

    // Get specific user data by phone.
    router.get("/users/byphone/:phone", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user", "phone", req.params.phone];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing the query" });
            } else {
                var token = req.headers["token"];
                if (ADMIN_TOKEN === token || (typeof(rows[0]) != 'undefined' && token === md5(rows[0].id + MAGIC_PHRASE))) {
                    res.json({ "Error": false, "Message": "Success", "User": rows });
                }
                else {
                    res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
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
                res.json({ "Error": true, "Message": "Error executing the query" });
            } else {
                var token = req.headers["token"];
                if (ADMIN_TOKEN === token || (typeof(rows[0]) != 'undefined' && token === md5(rows[0].id + MAGIC_PHRASE))) {
                    res.json({ "Error": false, "Message": "Success", "User": rows });
                }
                else {
                    res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
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
                res.json({ "Error": true, "Message": "Error executing the query" });
            } else {
                res.json({ "Error": false, "Message": "User Added !" });
            }
        });
    });

    // Modify an user with a specific id.
    router.put("/users/:id", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.params.id + MAGIC_PHRASE)) {
            var query = "UPDATE ?? SET ??=? WHERE ??=?";
            if (req.body.field === "password") {
                var table = ["user", req.body.field, md5(req.body.value), "id", req.params.id];
            } else {
                var table = ["user", req.body.field, req.body.value, "id", req.params.id];
            }
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    res.json({ "Error": true, "Message": "Error executing the query" });
                } else {
                    res.json({ "Error": false, "Message": "Field Updated !" });
                }
            });
        }
        else {
            res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
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
                    res.json({ "Error": true, "Message": "Error executing the query" });
                } else {
                    res.json({ "Error": false, "Message": "User Deleted !" });
                }
            });
        }
        else {
            res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
        }
    });


    // PAYMENT_METHOD TABLE
    // ----- ----- ----- -----

    // Get the user payment data of a specific user.
    router.get("/paymentinfo/:user_id", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.params.user_id + MAGIC_PHRASE)) {
            var query = "SELECT * FROM ?? WHERE ??=?";
            var table = ["payment_method", "user_id", req.params.user_id];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    res.json({ "Error": true, "Message": "Error executing the query" });
                } else {
                    res.json({ "Error": false, "Message": "Success", "Payment Information": rows });
                }
            });
        }
        else {
            res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
        }
    });

    // Insert a payment info of an specific user.
    router.post("/paymentinfo", function(req, res) {
        if (ADMIN_TOKEN === token || token === md5(req.body.user_id + MAGIC_PHRASE)) {
            var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            var token = req.headers["token"];
            var table = ["payment_method", "user_id", "type", "number",
                "expireDate", "name", "country", "province", "city",
                "postalCode", "adress", "phone", req.body.user_id,
                req.body.type, req.body.number, req.body.expireDate, req.body.name,
                req.body.country, req.body.province, req.body.city,
                req.body.postalCode, req.body.adress, req.body.phone];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    res.json({ "Error": true, "Message": err });
                } else {
                    res.json({ "Error": false, "Message": "User Payment Information Added !" });
                }
            });
        }
        else {
            res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
        }
    });

    // Modify a shipment info.
    router.put("/paymentinfo/:id", function(req, res) {
        var token = req.headers["token"];
        var query = "UPDATE ?? SET ??=? WHERE ??=?";
        var table = ["payment_method", req.body.field, req.body.value, "id", req.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing the query" });
            } else {
                if (ADMIN_TOKEN === token || (typeof(rows[0]) != 'undefined' && token === md5(rows[0].user_id + MAGIC_PHRASE))) {
                    res.json({ "Error": false, "Message": "Updated the field !" });
                }
                else {
                    res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
                }
            }
        });
    });

    // Delete a shipment info.
    router.delete("/paymentinfo/:id", function(req, res) {
        var token = req.headers["token"];
        var query = "DELETE FROM ?? WHERE ??=?";
        var table = ["payment_method", "id", req.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing the query" });
            } else {
                if (ADMIN_TOKEN === token || (typeof(rows[0]) != 'undefined' && token === md5(rows[0].user_id + MAGIC_PHRASE))) {
                    res.json({ "Error": false, "Message": "Shipment Information Deleted !" });
                }
                else {
                    res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
                }
            }
        });
    });


    // SHIPMENT_METHOD TABLE
    // ----- ----- ----- -----

    // Get the user shipment info of a specific user.
    router.get("/shipmentinfo/:user_id", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.params.user_id + MAGIC_PHRASE)) {
            var query = "SELECT * FROM ?? WHERE ??=?";
            var table = ["shipment_method", "user_id", req.params.user_id];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    res.json({ "Error": true, "Message": "Error executing the query" });
                } else {
                    res.json({ "Error": false, "Message": "Success", "Shipment Information": rows });
                }
            });
        } else {
            res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
        }
    });

    // Insert a user shipment info of an specific user.
    router.post("/shipmentinfo", function(req, res) {
        var token = req.headers["token"];
        if (ADMIN_TOKEN === token || token === md5(req.body.user_id + MAGIC_PHRASE)) {
            var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
            var table = ["shipment_method", "user_id", "country", "province", "city",
                "postalCode", "adress", "name", "idCard", "phone", req.body.user_id,
                req.body.country, req.body.province, req.body.city, req.body.postalCode,
                req.body.adress, req.body.name, req.body.idCard, req.body.phone
            ];
            query = mysql.format(query, table);
            connection.query(query, function(err, rows) {
                if (err) {
                    res.json({ "Error": true, "Message": err });
                } else {
                    res.json({ "Error": false, "Message": "User Shipment Information Added !" });
                }
            });
        } else {
            res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
        }
    });

    // Modify a shipment info.
    router.put("/shipmentinfo/:id", function(req, res) {
        var token = req.headers["token"];
        var query = "UPDATE ?? SET ??=? WHERE ??=?";
        var table = ["shipment_method", req.body.field, req.body.value, "id", req.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing the query" });
            } else {
                if (ADMIN_TOKEN === token || (typeof(rows[0]) != 'undefined' && token === md5(rows[0].user_id + MAGIC_PHRASE))) {
                    res.json({ "Error": false, "Message": "Updated the field !" });
                }
                else {
                    res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
                }
            }
        });
    });

    // Delete a shipment info.
    router.delete("/shipmentinfo/:id", function(req, res) {
        var token = req.headers["token"];
        var query = "DELETE FROM ?? WHERE ??=?";
        var table = ["shipment_method", "id", req.params.id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing the query" });
            } else {
                if (ADMIN_TOKEN === token || (typeof(rows[0]) != 'undefined' && token === md5(rows[0].user_id + MAGIC_PHRASE))) {
                    res.json({ "Error": false, "Message": "Shipment Information Deleted !" });
                }
                else {
                    res.json({ "Error": true, "Message": "Fail to access to API REST. You are not authenticated" });
                }
            }
        });
    });

    // ----- ----- ----- -----
  // CATEGORY TABLE
  // ----- ----- ----- -----

  //  Get all the categories of the db.
  router.get("/categories", function(req, res) {
      var query = "SELECT * FROM ??";
      var table = ["category"];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows) {
          if (err) {
              res.json({ "Error": true, "Message": "Error executing MySQL query" });
          } else {
              res.json({ "Error": false, "Message": "Success", "Users": rows });
          }
      });
  });

  // ----- ----- ----- -----
  // PRODUCT TABLE
  // ----- ----- ----- -----

  //  Get all the categories of the db.
  router.get("/products", function(req, res) {
      var query = "SELECT * FROM ??";
      var table = ["product", req.params.user_id];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows) {
          if (err) {
              res.json({ "Error": true, "Message": "Error executing MySQL query" });
          } else {
              res.json({ "Error": false, "Message": "Success", "Products": rows });
          }
      });
  });

    //  Get all the products of a given user of the db.
  router.get("/products/:user_id", function(req, res) {
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["product", "user_id", req.params.user_id];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows) {
          if (err) {
              res.json({ "Error": true, "Message": "Error executing MySQL query" });
          } else {
              res.json({ "Error": false, "Message": "Success", "Products": rows });
          }
      });
  });

  function insertProductWantsCategory(insertId, category, callback) {

    query = "INSERT INTO ??(??,??) VALUES (?,?)";
    table = ["product_wants_category", "product_id", "category", insertId, category];
    query = mysql.format(query, table);

    connection.query(query, function(err, rows){
      if (err){
          console.log("error");
          callback(true,insertId);}
      else
          callback(false,rows);
    });

  }

  function insertProduct(user_id, title, description, category, min_price, max_price, callback) {
    var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
    var table = ["product", "user_id", "title", "description", "category", "min_price", "max_price", user_id,
                 title, description, category, min_price, max_price];
    query = mysql.format(query, table);

    connection.query(query, function(err, rows){
      if (err)
          callback(err,"Error executing MySQL query");
      else
          callback(err,rows);
    });

  }

  // Inserts a product of an specific user.
  router.post("/products", function(req, res) {

      var worked = true;

      insertProduct(req.body.user_id, req.body.title, req.body.description, req.body.category,
        req.body.min_price, req.body.max_price, function(err, data) {

          if (err) {
            res.json({ "Error": err, "Message": "Error executing MySQL query" });

          } else {
            var aux = 0; var bAux = 1;
            var categories = req.body.wants_categories.split("-");
            for (var i = 0; i < categories.length && worked; ++i) {

              insertProductWantsCategory(data.insertId, categories[i], function(err,data){
                aux += 1;
                if (bAux == 1 && err) bAux = 0;
                if (bAux == 0 && aux == categories.length) {

                  res.json({"Error": err, "Message": data});
                  var query = "DELETE FROM ?? WHERE ??=?";
                  var table = ["product", "id", data];

                  query = mysql.format(query, table);
                  connection.query(query, function(err, rows) {});

                } else if (bAux == 1 && aux == categories.length) {
                  res.json({"Error": false, "Message": data});
                }
              });
            }
          }
        });
      });


  // Delete a product.
  router.delete("/products/:id", function(req, res) {
      var query = "DELETE FROM ?? WHERE ??=?";
      var table = ["product", "id", req.params.id];
      query = mysql.format(query, table);

      connection.query(query, function(err, rows) {
          if (err) {
              res.json({ "Error": true, "Message": "Error executing MySQL query" });
          } else {
              res.json({ "Error": false, "Message": "Product Deleted !" });
          }
      });
  });

  // ----- ----- ----- ----- ----
  // PRODUCT WANTS CATEGORY TABLE
  // ----- ----- ----- ----- ----

  // Inserts a pair of a product and a category to reflect the wanting categories of the product.
  router.get("/productwantscategory/:id", function(req, res) {
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["product_wants_category", "product_id", req.params.product_id];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows) {
          if (err) {
              res.json({ "Error": true, "Message": "Error executing MySQL query" });
          } else {
              res.json({ "Error": false, "Message": "Success", "Product wants categories": rows });
          }
      });
  });

}

module.exports = REST_ROUTER;
