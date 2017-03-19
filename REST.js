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

    router.get("/users", function(req, res) {
        var query = "SELECT * FROM ??";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query" });
            } else {
                res.json({ "Error": false, "Message": "Success", "Users": rows });
            }
        });
    });

    router.get("/users/:phone", function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user", "phone", req.params.phone];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query" });
            } else {
                res.json({ "Error": false, "Message": "Success", "Users": rows });
            }
        });
    });

    router.post("/users", function(req, res) {
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = ["user", "phone", "user", "password", "birthDate", req.body.phone, req.body.user, md5(req.body.password), req.body.birthDate];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query" });
            } else {
                res.json({ "Error": false, "Message": "User Added !" });
            }
        });
    });

    router.put("/users/:phone", function(req, res) {
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        if (req.body.field === "password") {
            var table = ["user", req.body.field, md5(req.body.value), "phone", req.params.phone];
        }
        else {
            var table = ["user", req.body.field, req.body.value, "phone", req.params.phone];
        }
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query" });
            } else {
                res.json({ "Error": false, "Message": "Updated the password for the user with phone " + req.params.phone });
            }
        });
    });

    router.delete("/users/:phone", function(req, res) {
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user", "phone", req.params.phone];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows) {
            if (err) {
                res.json({ "Error": true, "Message": "Error executing MySQL query" });
            } else {
                res.json({ "Error": false, "Message": "Deleted the user with phone " + req.params.phone });
            }
        });
    });
}

module.exports = REST_ROUTER;
