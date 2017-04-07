var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();

var frisby = require('frisby');

function initializeSamples() {

    var categoryData = new Object();
    categoryData.category = "electrodomestics";
    dbController.insertCategory(categoryData);

    var userData = new Object();
    userData.id = 1; //7e9420e418be9f2662ddbe9cb95b6783
    userData.phone = "654654654";
    userData.user = "Valvi";
    userData.password = "passapalabra";
    userData.email = "pozuelo@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 0;
    userData.truekes = 2;
    userData.rating = 1.0;
    dbController.insertUser(userData);

    var productData = new Object();
    productData.id = 1;
    productData.user_id = "1";
    productData.title = "Llapis pala";
    productData.description = "Escava el teu pou, pouman";
    productData.category = "electrodomestics";
    productData.min_price = 1;
    productData.max_price = 2;
    dbController.insertProduct(productData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 1;
    productWantsCategoryData.category = "electrodomestics";
    dbController.insertProductWantsCategory(productWantsCategoryData);

}

function test1() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Get all desired categories of a product without credentials')
	    .waits(200)
	    .get('http://localhost:3000/api/productwantscategory/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated."
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
	frisby.create('Get all desired categories of a product without wrong credentials')
	    .waits(200)
      .addHeader("token", "yolocaust")
	    .get('http://localhost:3000/api/productwantscategory/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated."
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test3();
	        }
	    })
	    .toss();
}

function test3() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Get all desired categories of a product with admin credentials')
	    .waits(200)
      .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .get('http://localhost:3000/api/productwantscategory/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
          "Content": [{
            "product_id": 1,
            "category": "electrodomestics"

          }]
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test4();
	        }
	    })
	 .toss();
 }

 function test4() {
 	dbController.clearDB();
   initializeSamples();
 	frisby.create('Get all desired categories of a product with good user credentials')
 	    .waits(200)
       .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
 	    .get('http://localhost:3000/api/productwantscategory/1')
 	    .expectStatus(200)
 	    .expectHeaderContains('content-type', 'application/json')
 	    .expectJSON({
 	        "Error": false,
 	        "Message": "Success",
           "Content": [{
             "product_id": 1,
             "category": "electrodomestics"

           }]
 	    })
 	    .after(function(err, res, body) {
 	        if (!err) {
 	            dbController.closeDBConnection();
 	        }
 	    })
 	 .toss();
  }


test1();
