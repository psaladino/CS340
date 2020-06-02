var express = require("express");
var router = express.Router();
var mysql = require("../dbconfig");

router.route("/")
    .get(function(req, res) {
        var query = "SELECT * FROM empoyees;";
        mysql.pool.query(query, function(err, rows) {
            if (err) {
                return;
            }
            res.json({"payload": rows});
        });
    })
    .post(function(req, res) {
        var data = [
            req.body.name
        ];
        var query = "INSERT INTO accessory (name) VALUES (?);";
        query += "SELECT * FROM accessory;";
        mysql.pool.query(query, data, function(err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({"payload": rows[1]});
        });
    })
    .delete(function(req, res) {
        var results = [];
        var query = "DELETE FROM animal_accessory WHERE accessory_id=?;";
        query += "DELETE FROM accessory WHERE accessory_id=?;"
        query += "SELECT * FROM accessory;";
        query += "SELECT a.animal_id AS animal_id, a.name AS animal_name, acc.accessory_id AS accessory_id, acc.name AS accessory_name FROM animal a INNER JOIN animal_accessory aa ON a.animal_id = aa.animal_id INNER JOIN accessory acc ON aa.accessory_id = acc.accessory_id ORDER BY a.animal_id;";
        mysql.pool.query(query, [req.body.id, req.body.id], function(err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            results.push(rows[2]);
            results.push(rows[3]);
            res.json({"payload": results});
        });
    })
    .put(function(req, res) {
        var data = [
            req.body["name"],
            req.body["id"]
        ];
        var query = "UPDATE accessory SET name=? WHERE accessory_id=?;";
        query += "SELECT * FROM accessory;";
        query += "SELECT a.animal_id AS animal_id, a.name AS animal_name, acc.accessory_id AS accessory_id, acc.name AS accessory_name FROM animal a INNER JOIN animal_accessory aa ON a.animal_id = aa.animal_id INNER JOIN accessory acc ON aa.accessory_id = acc.accessory_id ORDER BY a.animal_id;";
        mysql.pool.query(query, data, function(err, rows) {
            var results = [];
            if (err) {
                console.log(err);
                return;
            }
            results.push(rows[1]);
            results.push(rows[2]);
            res.json({"payload": results});
        })
    });

router.route("/animal")
    .get(function(req, res) {
        var query = "SELECT a.animal_id AS animal_id, a.name AS animal_name, acc.accessory_id AS accessory_id, acc.name AS accessory_name FROM animal a INNER JOIN animal_accessory aa ON a.animal_id = aa.animal_id INNER JOIN accessory acc ON aa.accessory_id = acc.accessory_id ORDER BY a.animal_id;";
        mysql.pool.query(query, function(err, rows) {
            if (err) {
                console.log(err);
                return;
            }

            res.json({"payload": rows});
        });
    })
    .post(function(req, res) {
        var data = [
            req.body["animal-id"],
            req.body["accessory-id"]
        ];
        var query = "INSERT INTO animal_accessory (animal_id, accessory_id) VALUES (?,?);";
        query += "SELECT a.animal_id AS animal_id, a.name AS animal_name, acc.accessory_id AS accessory_id, acc.name AS accessory_name FROM animal a INNER JOIN animal_accessory aa ON a.animal_id = aa.animal_id INNER JOIN accessory acc ON aa.accessory_id = acc.accessory_id ORDER BY a.animal_id;";
        mysql.pool.query(query, data, function(err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({"payload": rows[1]});
        });
    })
    .delete(function(req, res) {
        var data = [
            req.body["accessory_id"],
            req.body["animal_id"]
        ];
        var query = "DELETE FROM animal_accessory WHERE accessory_id=? AND animal_id=?;";
        query += "SELECT a.animal_id AS animal_id, a.name AS animal_name, acc.accessory_id AS accessory_id, acc.name AS accessory_name FROM animal a INNER JOIN animal_accessory aa ON a.animal_id = aa.animal_id INNER JOIN accessory acc ON aa.accessory_id = acc.accessory_id ORDER BY a.animal_id;";
        mysql.pool.query(query, data, function(err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({"payload": rows[1]});
        });
    })

router.route("/diff")
    .get(function(req, res) {
        var data = [
            req.query.id || ""
        ];
        var query = "SELECT acc.accessory_id, acc.name FROM accessory acc WHERE acc.accessory_id NOT IN (SELECT an.accessory_id FROM animal_accessory an WHERE an.animal_id = ?);";
        mysql.pool.query(query, data, function(err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({"payload": rows});
        })
    })

module.exports = router;
