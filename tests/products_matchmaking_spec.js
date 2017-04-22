var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();

var frisby = require('frisby');

function initializeSamples() {

    var categoryData = new Object();
    categoryData.category = "category1";
    dbController.insertCategory(categoryData);

    categoryData.category = "category2";
    dbController.insertCategory(categoryData);

    categoryData.category = "category3";
    dbController.insertCategory(categoryData);

    categoryData.category = "category4";
    dbController.insertCategory(categoryData);

    var userData = new Object();
    userData.id = 1; //7e9420e418be9f2662ddbe9cb95b6783
    userData.phone = "619804071";
    userData.user = "Jordi Estape";
    userData.password = "passapalabra";
    userData.email = "estape.jordi@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 0;
    userData.truekes = 0;
    userData.rating = 1.0;
    dbController.insertUser(userData);

    userData.id = 2; //7e9420e418be9f2662ddbe9cb95b6783
    userData.phone = "609772339";
    userData.user = "Aita";
    userData.password = "passapalabra";
    userData.email = "aita@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 0;
    userData.truekes = 0;
    userData.rating = 1.0;
    dbController.insertUser(userData);
   
    var productData = new Object();
    productData.id = 1;
    productData.user_id = "1";
    productData.title = "Llapis pala";
    productData.description = "Escava el teu pou, pouman";
    productData.category = "category1";
    productData.min_price = 3;
    productData.max_price = 6;
    dbController.insertProduct(productData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 1;
    productWantsCategoryData.category = "category1";
    dbController.insertProductWantsCategory(productWantsCategoryData);

    productWantsCategoryData.product_id = 1;
    productWantsCategoryData.category = "category2";
    dbController.insertProductWantsCategory(productWantsCategoryData);

}

function initializeSameUser() {

	var productData = new Object();
    productData.id = 2;
    productData.user_id = "1";
    productData.title = "Product1";
    productData.description = "Description1";
    productData.category = "category1";
    productData.min_price = 1;
    productData.max_price = 2;
    dbController.insertProduct(productData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 2;
    productWantsCategoryData.category = "category1";
    dbController.insertProductWantsCategory(productWantsCategoryData);

}

function initializeOutRangeLow() {

	var productData = new Object();
    productData.id = 3;
    productData.user_id = 2;
    productData.title = "Product2";
    productData.description = "Description2";
    productData.category = "category2";
    productData.min_price = 1;
    productData.max_price = 2;
    dbController.insertProduct(productData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 3;
    productWantsCategoryData.category = "category2";
    dbController.insertProductWantsCategory(productWantsCategoryData);

}

function initializeOutRangeHigh() {

	var productData = new Object();
    productData.id = 4;
    productData.user_id = 2;
    productData.title = "Product3";
    productData.description = "Description3";
    productData.category = "category2";
    productData.min_price = 7;
    productData.max_price = 8;
    dbController.insertProduct(productData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 4;
    productWantsCategoryData.category = "category1";
    dbController.insertProductWantsCategory(productWantsCategoryData);

}

function initializeNotSameCategories1() {

	var productData = new Object();
    productData.id = 5;
    productData.user_id = 2;
    productData.title = "Product4";
    productData.description = "Description4";
    productData.category = "category3";
    productData.min_price = 4;
    productData.max_price = 5;
    dbController.insertProduct(productData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 5;
    productWantsCategoryData.category = "category3";
    dbController.insertProductWantsCategory(productWantsCategoryData);

}

function initializeNotSameCategories2() {

	var productData = new Object();
    productData.id = 6;
    productData.user_id = 2;
    productData.title = "Product5";
    productData.description = "Description5";
    productData.category = "category4";
    productData.min_price = 4;
    productData.max_price = 5;
    dbController.insertProduct(productData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 6;
    productWantsCategoryData.category = "category4";
    dbController.insertProductWantsCategory(productWantsCategoryData);

}

function initializeNotSameCategories3() {

	var productData = new Object();
    productData.id = 7;
    productData.user_id = 2;
    productData.title = "Product6";
    productData.description = "Description6";
    productData.category = "category4";
    productData.min_price = 4;
    productData.max_price = 5;
    dbController.insertProduct(productData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 7;
    productWantsCategoryData.category = "category3";
    dbController.insertProductWantsCategory(productWantsCategoryData);

     var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 7;
    productWantsCategoryData.category = "category4";
    dbController.insertProductWantsCategory(productWantsCategoryData);

}

function initializeExistsMatch() {

	var productData = new Object();
    productData.id = 8;
    productData.user_id = 2;
    productData.title = "Product7";
    productData.description = "Description7";
    productData.category = "category2";
    productData.min_price = 4;
    productData.max_price = 5;
    dbController.insertProduct(productData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 8;
    productWantsCategoryData.category = "category1";
    dbController.insertProductWantsCategory(productWantsCategoryData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 8;
    productWantsCategoryData.category = "category2";
    dbController.insertProductWantsCategory(productWantsCategoryData);

    var matchData = new Object();
    matchData.product_id1 = 1;
    matchData.product_id2 = 8;
    dbController.insertMatch(matchData);

}

function initializeMustGet1() {

	var productData = new Object();
    productData.id = 9;
    productData.user_id = 2;
    productData.title = "ProductOK";
    productData.description = "DescriptionOK";
    productData.category = "category2";
    productData.min_price = 4;
    productData.max_price = 5;
    dbController.insertProduct(productData);

}

function initializeMustGet2() {

	var productData = new Object();
    productData.id = 10;
    productData.user_id = 2;
    productData.title = "ProductOK";
    productData.description = "DescriptionOK";
    productData.category = "category1";
    productData.min_price = 3;
    productData.max_price = 6;
    dbController.insertProduct(productData);

}

function test1() {

  dbController.clearDB();
  initializeSamples();
	frisby.create('Get product matchmaking without credentials')
	    .waits(200)
	    .get('http://localhost:3000/api/products/matchmaking/1')
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
	frisby.create('Get product matchmaking without credentials wrong')
	    .waits(200)
	    .addHeader("token","imfalse")
	    .get('http://localhost:3000/api/products/matchmaking/1')
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
	frisby.create('Get product matchmaking with admin credentials')
	    .waits(200)
        .addHeader("token","f4493ed183abba6b096f3903a5fc3b64")
	    .get('http://localhost:3000/api/products/matchmaking/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
	        "Content": []
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
	frisby.create('Get product matchmaking with user credentials')
	    .waits(200)
        .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .get('http://localhost:3000/api/products/matchmaking/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
	        "Content": []
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test5();
	        }
	    })
	    .toss();
}

function test5() {
  dbController.clearDB();
  initializeSamples();
  initializeSameUser();
	frisby.create('Get product matchmaking same user')
	    .waits(200)
        .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .get('http://localhost:3000/api/products/matchmaking/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
	        "Content": []
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test6();
	        }
	    })
	    .toss();
}

function test6() {
  dbController.clearDB();
  initializeSamples();
  initializeOutRangeHigh();
  initializeOutRangeLow();
	frisby.create('Get product matchmaking out of price range')
	    .waits(200)
        .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .get('http://localhost:3000/api/products/matchmaking/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
	        "Content": []
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test7();
	        }
	    })
	    .toss();
}

function test7() {
  dbController.clearDB();
  initializeSamples();
  initializeNotSameCategories1();
  initializeNotSameCategories2();
  initializeNotSameCategories3();
	frisby.create('Get product matchmaking different categories')
	    .waits(200)
        .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .get('http://localhost:3000/api/products/matchmaking/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
	        "Content": []
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test8();
	        }
	    })
	    .toss();
}

function test8() {
  dbController.clearDB();
  initializeSamples();
  initializeExistsMatch();
	frisby.create('Get product matchmaking exists a match')
	    .waits(200)
        .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .get('http://localhost:3000/api/products/matchmaking/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
	        "Content": []
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test9();
	        }
	    })
	    .toss();
}

function test9() {
  dbController.clearDB();
  initializeSamples();
  initializeSameUser();
  initializeOutRangeLow();
  initializeOutRangeHigh();
  initializeNotSameCategories3();
  initializeNotSameCategories2();
  initializeNotSameCategories1();
  initializeExistsMatch();
  initializeMustGet1();
  initializeMustGet2();

	frisby.create('Get product matchmaking OK 2 products ALL INITIALIZED')
	    .waits(400)
        .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .get('http://localhost:3000/api/products/matchmaking/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
	        "Content": [ {

	        	"id": 9,
            	"user_id": 2,
            	"title": "ProductOK",
            	"description": "DescriptionOK",
            	"category": "category2",
           	 	"min_price": 4,
            	"max_price": 5

	        }, {

	        	"id": 10,
            	"user_id": 2,
            	"title": "ProductOK",
            	"description": "DescriptionOK",
            	"category": "category1",
           	 	"min_price": 3,
            	"max_price": 6

	        }]
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	        	dbController.clearDB();
	            dbController.closeDBConnection();

	        }
	    })
	    .toss();
}

test1();

