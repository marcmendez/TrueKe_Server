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
    userData.user = "Pouman";
    userData.password = "passapalabra";
    userData.email = "manolito@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 0;
    userData.truekes = 2;
    dbController.insertUser(userData);

    var userData = new Object();
    userData.id = 2; //988a86b7ae2b7dcfcb38de0ff12dcf93
    userData.phone = "690708912";
    userData.user = "PoumanV2";
    userData.password = "passapalabra";
    userData.email = "manolito2@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 0;
    userData.truekes = 2;
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

function initializeSamples2() {

  var categoryData = new Object();
  categoryData.category = "electrodomestics";
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
  dbController.insertUser(userData);

}

function initializeSamples3 () {


    var categoryData = new Object();
    categoryData.category = "electrodomestics";
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
    dbController.insertUser(userData);

    var userData = new Object();
    userData.id = 2; //988a86b7ae2b7dcfcb38de0ff12dcf93
    userData.phone = "690708912";
    userData.user = "PoumanV2";
    userData.password = "passapalabra";
    userData.email = "manolito2@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 0;
    userData.truekes = 2;
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

    productData = new Object();
    productData.id = 2;
    productData.user_id = "2";
    productData.title = "Llapis rasclet";
    productData.description = "Rasca nota, pouman";
    productData.category = "electrodomestics";
    productData.min_price = 1;
    productData.max_price = 2;
    dbController.insertProduct(productData);

    var chatData = new Object();
    chatData.product_id1 = 1;
    chatData.product_id2 = 2;
    dbController.insertChat(chatData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 1;
    productWantsCategoryData.category = "electrodomestics";
    dbController.insertProductWantsCategory(productWantsCategoryData);


}

function test1() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Get all products without credentials')
	    .waits(200)
	    .get('http://localhost:3000/api/products')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated as admin"
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
	frisby.create('Get all products with user credentials')
	    .waits(200)
      .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .get('http://localhost:3000/api/products')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated as admin"
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
	frisby.create('Get all products with false credentials')
	    .waits(200)
      .addHeader("token","tokenmesfalsqueunamonedade15centims")
	    .get('http://localhost:3000/api/products')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated as admin"
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
	frisby.create('Get all products with admin credentials')
	    .waits(200)
      .addHeader("token","f4493ed183abba6b096f3903a5fc3b64")
	    .get('http://localhost:3000/api/products')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
          "Content": [{
            "id": 1,
            "user_id": 1,
            "title": "Llapis pala",
            "description": "Escava el teu pou, pouman",
            "category": "electrodomestics",
            "min_price": 1,
            "max_price": 2
          }]
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
	frisby.create('Get products of a user with no credentials')
	    .waits(200)
	    .get('http://localhost:3000/api/products/byuser/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated."
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test6()
	        }
	    })
	    .toss();
}

function test6() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Get products of a user false credentials')
	    .waits(200)
      .addHeader("token", "socuntokenmoltfals")
	    .get('http://localhost:3000/api/products/byuser/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated."
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
	frisby.create('Get products of a user different credentials')
	    .waits(200)
      .addHeader("token", "988a86b7ae2b7dcfcb38de0ff12dcf93")
	    .get('http://localhost:3000/api/products/byuser/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated."
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
	frisby.create('Get products of a user with user credentials')
	    .waits(200)
      .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783" )
	    .get('http://localhost:3000/api/products/byuser/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
          "Content": [{
            "id": 1,
            "user_id": 1,
            "title": "Llapis pala",
            "description": "Escava el teu pou, pouman",
            "category": "electrodomestics",
            "min_price": 1,
            "max_price": 2
          }]
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
	frisby.create('Get products of a user with admin credentials')
	    .waits(200)
      .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .get('http://localhost:3000/api/products/byuser/1')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
          "Content": [{
            "id": 1,
            "user_id": 1,
            "title": "Llapis pala",
            "description": "Escava el teu pou, pouman",
            "category": "electrodomestics",
            "min_price": 1,
            "max_price": 2
          }]
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test10();
	        }
	    })
	    .toss();
}


function test10() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Get products of a user that does not exists')
	    .waits(200)
      .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .get('http://localhost:3000/api/products/byuser/2')
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Success",
          "Content": []
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test11();
	        }
	    })
	    .toss();
}

function test11() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Insert a product with no authentification')
	    .waits(200)
	    .post('http://localhost:3000/api/products', {
        "user_id": 1,
        "title": "Pen drive",
        "description": "0GB",
        "category": "electrodomestics",
        "min_price": 1,
        "max_price": 2,
        "wants_categories": "electrodomestics"
      })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated."
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test12();
	        }
	    })
	    .toss();
}

function test12() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Insert a product with false authentification')
	    .waits(200)
      .addHeader("token", "thistokenissofalse")
	    .post('http://localhost:3000/api/products', {
        "user_id": 1,
        "title": "Pen drive",
        "description": "0GB",
        "category": "electrodomestics",
        "min_price": 1,
        "max_price": 2,
        "wants_categories": "electrodomestics"
      })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated."
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test13();
	        }
	    })
	    .toss();
}

function test13() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with admin authentification')
	      .waits(200)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": false,
	         "Message": "A new product was inserted in the database"
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": [{
                      "user_id": 1,
                      "title": "Pen drive",
                      "description": "0GB",
                      "category": "electrodomestics",
                      "min_price": 1,
                      "max_price": 2
    	    	        }]
                 })
                 .after(function(err, res, body) {
                    var prod = JSON.parse(body);
                    frisby.create('Product wants category of product after creating a new product')
                          .waits(100)
                          .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                          .get('http://localhost:3000/api/productwantscategory/' + prod.Content[0].id)
                          .expectStatus(200)
                          .expectHeaderContains('content-type', 'application/json')
                          .expectJSON({
                             "Error": false,
                             "Message": "Success",
                             "Content": [{
                             "category": "electrodomestics"
                             }]
                          })
                          .after(function(err, res, body) {
                             frisby.create('User quantity of products after creating a new product')
                                   .waits(100)
                                   .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                                   .get('http://localhost:3000/api/users')
                                   .expectStatus(200)
                                   .expectHeaderContains('content-type', 'application/json')
                                   .expectJSON({
                                      "Error": false,
                                      "Message": "Success",
                                      "Content": [{
                                      "products": 1
                                      }]
                                   })
                                   .after(function(err, res, body) {
                                      test14();
                                   })
                                   .toss();
        	    	           })
                           .toss();
                   })
                  .toss();
    	     })
           .toss();
}

function test14() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with user authentification')
	      .waits(200)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": false,
	         "Message": "A new product was inserted in the database"
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": [{
                      "user_id": 1,
                      "title": "Pen drive",
                      "description": "0GB",
                      "category": "electrodomestics",
                      "min_price": 1,
                      "max_price": 2
    	    	        }]
                 })
                 .after(function(err, res, body) {
                    var prod = JSON.parse(body);
                    frisby.create('Product wants category of product after creating a new product')
                          .waits(100)
                          .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                          .get('http://localhost:3000/api/productwantscategory/' + prod.Content[0].id)
                          .expectStatus(200)
                          .expectHeaderContains('content-type', 'application/json')
                          .expectJSON({
                             "Error": false,
                             "Message": "Success",
                             "Content": [{
                             "category": "electrodomestics"
                             }]
                          })
                          .after(function(err, res, body) {
                             frisby.create('User quantity of products after creating a new product')
                                   .waits(100)
                                   .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                                   .get('http://localhost:3000/api/users')
                                   .expectStatus(200)
                                   .expectHeaderContains('content-type', 'application/json')
                                   .expectJSON({
                                      "Error": false,
                                      "Message": "Success",
                                      "Content": [{
                                      "products": 1
                                      }]
                                   })
                                   .after(function(err, res, body) {
                                      test15();
                                   })
                                   .toss();
        	    	           })
                           .toss();
                   })
                  .toss();
    	     })
           .toss();
}

function test15() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with user authentification')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": false,
	         "Message": "A new product was inserted in the database"
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": [{
                      "user_id": 1,
                      "title": "Pen drive",
                      "description": "0GB",
                      "category": "electrodomestics",
                      "min_price": 1,
                      "max_price": 2
    	    	        }]
                 })
                 .after(function(err, res, body) {
                    var prod = JSON.parse(body);
                    frisby.create('Product wants category of product after creating a new product')
                          .waits(100)
                          .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                          .get('http://localhost:3000/api/productwantscategory/' + prod.Content[0].id)
                          .expectStatus(200)
                          .expectHeaderContains('content-type', 'application/json')
                          .expectJSON({
                             "Error": false,
                             "Message": "Success",
                             "Content": [{
                             "category": "electrodomestics"
                             }]
                          })
                          .after(function(err, res, body) {
                             frisby.create('User quantity of products after creating a new product')
                                   .waits(100)
                                   .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                                   .get('http://localhost:3000/api/users')
                                   .expectStatus(200)
                                   .expectHeaderContains('content-type', 'application/json')
                                   .expectJSON({
                                      "Error": false,
                                      "Message": "Success",
                                      "Content": [{
                                      "products": 1
                                      }]
                                   })
                                   .after(function(err, res, body) {
                                      test16();
                                   })
                                   .toss();
        	    	           })
                           .toss();
                   })
                  .toss();
    	     })
           .toss();
}

function test16() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with bad user authentification')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb5b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
          test17();
        })
        .toss();
}

function test17() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with no title')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      test18();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test18() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with no category')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      dbController.closeDBConnection();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test17() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with no title')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      test18();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test18() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with no category')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      test19();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test19() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with no min price')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "electrodomestics",
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      test20();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test20() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with no max price')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "category": "electrodomestics",
           "description": "0GB",
           "min_price": 1,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      test21();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test21() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with wrong category')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "falsa",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      test22();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test22() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with no good wanted categories')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "falsa"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      test23();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test23() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with no good wanted categories not first')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics-falsa"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      test24();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test24() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with no description')
	      .waits(200)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": false,
	         "Message": "A new product was inserted in the database"
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": [{
                      "user_id": 1,
                      "title": "Pen drive",
                      "description": null,
                      "category": "electrodomestics",
                      "min_price": 1,
                      "max_price": 2
    	    	        }]
                 })
                 .after(function(err, res, body) {
                    var prod = JSON.parse(body);
                    frisby.create('Product wants category of product after creating a new product')
                          .waits(100)
                          .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                          .get('http://localhost:3000/api/productwantscategory/' + prod.Content[0].id)
                          .expectStatus(200)
                          .expectHeaderContains('content-type', 'application/json')
                          .expectJSON({
                             "Error": false,
                             "Message": "Success",
                             "Content": [{
                             "category": "electrodomestics"
                             }]
                          })
                          .after(function(err, res, body) {
                             frisby.create('User quantity of products after creating a new product')
                                   .waits(100)
                                   .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                                   .get('http://localhost:3000/api/users')
                                   .expectStatus(200)
                                   .expectHeaderContains('content-type', 'application/json')
                                   .expectJSON({
                                      "Error": false,
                                      "Message": "Success",
                                      "Content": [{
                                      "products": 1
                                      }]
                                   })
                                   .after(function(err, res, body) {
                                    test25();
                                   })
                                   .toss();
        	    	           })
                           .toss();
                   })
                  .toss();
    	     })
           .toss();
}

function test25() {
	dbController.clearDB();
  initializeSamples2();
	frisby.create('Insert a product with wrong price range')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 2,
           "max_price": 1,
           "wants_categories": "electrodomestics"
        })
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get product after creating a new product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after creating a new product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {
                      dbController.closeDBConnection();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}


function test25() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Delete a product with admin authentification')
	      .waits(200)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	      .delete('http://localhost:3000/api/products/1')
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": false,
           "Message": "Product deleted correctly"
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get products after deleting a product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after deleting product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {

                     frisby.create('Product wants category of product after deleting a product')
                          .waits(100)
                          .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                          .get('http://localhost:3000/api/productwantscategory/1')
                            .expectStatus(200)
                            .expectHeaderContains('content-type', 'application/json')
                            .expectJSON({
                              "Error": false,
                              "Message": "Success",
                              "Content": []
                            })
                            .after(function(err,res,body) {
                              test26();
                            })
                            .toss();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test26() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Delete a product with user authentification')
	      .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	      .delete('http://localhost:3000/api/products/1')
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": false,
           "Message": "Product deleted correctly"
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get products after deleting a product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
    	    	        "Content": []
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after deleting product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 0
                      }]
                  })
                  .after(function(err, res, body) {

                     frisby.create('Product wants category of product after deleting a product')
                          .waits(100)
                          .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                          .get('http://localhost:3000/api/productwantscategory/1')
                            .expectStatus(200)
                            .expectHeaderContains('content-type', 'application/json')
                            .expectJSON({
                              "Error": false,
                              "Message": "Success",
                              "Content": []
                            })
                            .after(function(err,res,body) {
                              test27();
                            })
                            .toss();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test27() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Delete a product with wrong user')
	      .waits(200)
        .addHeader("token", "7e9420e41f2662ddbe9cb95b6783")
	      .delete('http://localhost:3000/api/products/1')
	      .expectStatus(200)
	      .expectHeaderContains('content-type', 'application/json')
	      .expectJSON({
	         "Error": true
	      })
	      .after(function(err, res, body) {
    	     frisby.create('Get products after deleting a product')
    	           .waits(100)
    	           .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    	           .get('http://localhost:3000/api/products')
    	    	     .expectStatus(200)
    	    	     .expectHeaderContains('content-type', 'application/json')
    	    	     .expectJSON({
    	    	        "Error": false,
    	    	        "Message": "Success",
                    "Content": [{
                      "user_id": 1,
                      "title": "Llapis pala",
                      "description": "Escava el teu pou, pouman",
                      "category": "electrodomestics",
                      "min_price": 1,
                      "max_price": 2
                    }]

                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after deleting product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 1
                      }]
                  })
                  .after(function(err, res, body) {

                     frisby.create('Product wants category of product after deleting a product')
                          .waits(100)
                          .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                          .get('http://localhost:3000/api/productwantscategory/1')
                            .expectStatus(200)
                            .expectHeaderContains('content-type', 'application/json')
                            .expectJSON({
                              "Error": false,
                              "Message": "Success",
                              "Content": [{
                                "category": "electrodomestics"}
                              ]
                            })
                            .after(function(err,res,body) {
                              test28();
                            })
                            .toss();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test28() {
  dbController.clearDB();
  initializeSamples3();
  frisby.create('Delete a product with a open chat')
        .waits(200)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .delete('http://localhost:3000/api/products/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
           "Error": false,
           "Message": "Product not deleted"
        })
        .after(function(err, res, body) {
           frisby.create('Get products after deleting a product')
                 .waits(200)
                 .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                 .get('http://localhost:3000/api/products') 
                 .expectStatus(200)
                 .expectHeaderContains('content-type', 'application/json')
                 .expectJSON({
                    "Error": false,
                    "Message": "Success",
                    "Content": [{
                      "id": 1,
                      "user_id": 1,
                      "title": "Llapis pala",
                      "description": "Escava el teu pou, pouman",
                      "category": "electrodomestics",
                      "min_price": 1,
                      "max_price": 2
                    }]
                 })

                .after(function(err, res, body) {
                  frisby.create('User quantity of products after deleting product')
                  .waits(100)
                  .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                  .get('http://localhost:3000/api/users')
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                      "Error": false,
                      "Message": "Success",
                      "Content": [{
                      "products": 1
                      }]
                  })
                  .after(function(err, res, body) {

                     frisby.create('Product wants category of product after deleting a product')
                          .waits(100)
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
                            .after(function(err,res,body) {
                              test29();
                            })
                            .toss();
                  })
                  .toss();
        })
        .toss();

  })
  .toss();
}

function test29() {
  dbController.clearDB();
  initializeSamples2();
  frisby.create('Insert a product with admin authentification')
        .waits(200)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .post('http://localhost:3000/api/products', {
           "user_id": 1,
           "title": "Pen drive",
           "description": "0GB",
           "category": "electrodomestics",
           "min_price": 1,
           "max_price": 2,
           "wants_categories": "electrodomestics"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
           "Error": false,
           "Message": "A new product was inserted in the database"
        })
        .after(function(err, res, body) {
          var parsedBody = JSON.parse(body);
           frisby.create('Get product after creating a new product and see that the post also returned a good id value')
                 .waits(100)
                 .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                 .get('http://localhost:3000/api/products')
                 .expectStatus(200)
                 .expectHeaderContains('content-type', 'application/json')
                 .expectJSON({
                    "Error": false,
                    "Message": "Success",
                    "Content": [{
                      "id": parsedBody.Content.product.id,
                      "user_id": 1,
                      "title": "Pen drive",
                      "description": "0GB",
                      "category": "electrodomestics",
                      "min_price": 1,
                      "max_price": 2
                    }]
                 })
                 .after(function(err, res, body) {
                    var prod = JSON.parse(body);
                    frisby.create('Product wants category of product after creating a new product')
                          .waits(100)
                          .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                          .get('http://localhost:3000/api/productwantscategory/' + prod.Content[0].id)
                          .expectStatus(200)
                          .expectHeaderContains('content-type', 'application/json')
                          .expectJSON({
                             "Error": false,
                             "Message": "Success",
                             "Content": [{
                             "category": "electrodomestics"
                             }]
                          })
                          .after(function(err, res, body) {
                             frisby.create('User quantity of products after creating a new product')
                                   .waits(100)
                                   .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                                   .get('http://localhost:3000/api/users')
                                   .expectStatus(200)
                                   .expectHeaderContains('content-type', 'application/json')
                                   .expectJSON({
                                      "Error": false,
                                      "Message": "Success",
                                      "Content": [{
                                      "products": 1
                                      }]
                                   })
                                   .after(function(err, res, body) {
                                      dbController.closeDBConnection();
                                   })
                                   .toss();
                           })
                           .toss();
                   })
                  .toss();
           })
           .toss();
}


test1();
