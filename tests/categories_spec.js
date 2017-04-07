var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();

var frisby = require('frisby');

function initializeSamples() {

    var categoryData = new Object();
    categoryData.category = "electrodomestics";
    dbController.insertCategory(categoryData);

    categoryData.category = "cuina";
    dbController.insertCategory(categoryData);

}

function test1() {
	dbController.clearDB();
	frisby.create('Get all the categories of the DB and no categories on the DB')
	    .waits(200)
	    .get('http://localhost:3000/api/categories')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
          "Content": []

	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test2();
	        }
	    })
	    .toss();
}

function test2() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Get all the categories of the DB')
	    .waits(200)
	    .get('http://localhost:3000/api/categories')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
          "Content": [
            {"category": "cuina"},
            {"category": "electrodomestics"}
          ]

	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            dbController.closeDBConnection();
	        }
	    })
	    .toss();
}

test1();
