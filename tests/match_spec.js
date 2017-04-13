var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();

var frisby = require('frisby');

function initializeSamples() {

    var categoryData = new Object();
    categoryData.category = "utils";
    dbController.insertCategory(categoryData);

    var userData = new Object();
    userData.id = 1; //7e9420e418be9f2662ddbe9cb95b6783
    userData.phone = "654654654";
    userData.user = "Pouman";
    userData.password = "passapalabra";
    userData.email = "manolito@gmail.com";
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
    productData.category = "utils";
    productData.min_price = 1;
    productData.max_price = 2;
    dbController.insertProduct(productData);

    var productData = new Object();
    productData.id = 2;
    productData.user_id = "1";
    productData.title = "Llapis arada";
    productData.description = "Pel pages que portes dins";
    productData.category = "utils";
    productData.min_price = 1;
    productData.max_price = 2;
    dbController.insertProduct(productData);

}

function firstMatch(wants) {

  var matchData = new Object();
  matchData.product_id1 = 1;
  matchData.product_id2 = 2;
  matchData.wants = wants;
  dbController.insertMatch(matchData);

}

function test1() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Add a match without credentials')
	    .waits(200)
	    .post('http://localhost:3000/api/matches', {
        "product_id1": 1,
        "product_id2": 2,
        "wants": 0
      })
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
	frisby.create('Add a match without wrong credentials')
	    .waits(200)
      .addHeader("token", "thefalse")
	    .post('http://localhost:3000/api/matches', {
        "product_id1": 1,
        "product_id2": 2,
        "wants": 0
      })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated."
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test3()
	        }
	    })
	    .toss();
}

function test3() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Add a match ok admin (FIRST)')
	    .waits(200)
      .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .post('http://localhost:3000/api/matches', {
        "product_id1": 1,
        "product_id2": 2,
        "wants": 0
      })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Match Added !"
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
	frisby.create('Add a match ok user (FIRST)')
	    .waits(200)
      .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	    .post('http://localhost:3000/api/matches', {
        "product_id1": 1,
        "product_id2": 2,
        "wants": 0
      })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Match Added !"
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
  firstMatch(1);
	frisby.create('Add a match no-ok (SECOND)')
	    .waits(200)
      .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	    .post('http://localhost:3000/api/matches', {
        "product_id1": 2,
        "product_id2": 1,
        "wants": 1
      })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Match Added !"
	    })
	    .after(function(err, res, body) {
        frisby.create('Get chats after creating a new match')
              .waits(100)
              .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
              .get('http://localhost:3000/api/chats')
              .expectStatus(200)
              .expectHeaderContains('content-type', 'application/json')
              .expectJSON({
                 "Error": false,
                 "Message": "Success",
                 "Content": []
              })
              .after(function(err,res,body) {
                if (!err) {
        	            test6();
        	        }
              })
              .toss();
	    })
	    .toss();
}

function test6() {
	dbController.clearDB();
  initializeSamples();
  firstMatch(0);
	frisby.create('Add a match no-no (SECOND)')
	    .waits(200)
      .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	    .post('http://localhost:3000/api/matches', {
        "product_id1": 2,
        "product_id2": 1,
        "wants": 0
      })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Match Added !"
	    })
	    .after(function(err, res, body) {

        frisby.create('Get chats after creating a new match')
              .waits(100)
              .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
              .get('http://localhost:3000/api/chats')
              .expectStatus(200)
              .expectHeaderContains('content-type', 'application/json')
              .expectJSON({
                 "Error": false,
                 "Message": "Success",
                 "Content": []
              })
              .after(function(err,res,body) {
                if (!err) {
        	            test7();
        	        }
              })
              .toss();
	    })
	    .toss();
}

function test7() {
	dbController.clearDB();
  initializeSamples();
  firstMatch(1);
	frisby.create('Add a match ok-no (SECOND)')
	    .waits(200)
      .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	    .post('http://localhost:3000/api/matches', {
        "product_id1": 2,
        "product_id2": 1,
        "wants": 0
      })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Match Added !"
	    })
	    .after(function(err, res, body) {
        frisby.create('Get chats after creating a new match')
              .waits(100)
              .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
              .get('http://localhost:3000/api/chats')
              .expectStatus(200)
              .expectHeaderContains('content-type', 'application/json')
              .expectJSON({
                 "Error": false,
                 "Message": "Success",
                 "Content": []
              })
              .after(function(err,res,body) {
                if (!err) {
        	            test8();
        	        }
              })
              .toss();
	    })
	    .toss();
}

function test8() {
	dbController.clearDB();
  initializeSamples();
  firstMatch(1);
	frisby.create('Add a match ok-ok (SECOND)')
	    .waits(200)
      .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	    .post('http://localhost:3000/api/matches', {
        "product_id1": 2,
        "product_id2": 1,
        "wants": 1
      })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Match Added !"
	    })
	    .after(function(err, res, body) {
        frisby.create('Get chats after creating a new match')
              .waits(100)
              .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
              .get('http://localhost:3000/api/chats')
              .expectStatus(200)
              .expectHeaderContains('content-type', 'application/json')
              .expectJSON({
                 "Error": false,
                 "Message": "Success",
                 "Content": [{
                   "product_id1" : 2,
                   "product_id2" : 1
                 }]
              })
              .after(function(err,res,body) {
                if (!err) {
        	            dbController.closeDBConnection();
        	        }
              })
              .toss();
	    })
	    .toss();
}

test1();
