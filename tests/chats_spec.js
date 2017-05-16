var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();

var frisby = require('frisby');

function initializeSamples () {


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

    productData = new Object();
    productData.id = 3;
    productData.user_id = "2";
    productData.title = "Llapisot";
    productData.description = "Rasca nota, pouman";
    productData.category = "electrodomestics";
    productData.min_price = 1;
    productData.max_price = 2;
    dbController.insertProduct(productData);

    var chatData = new Object();
    chatData.id = 1;
    chatData.product_id1 = 1;
    chatData.product_id2 = 2;
    dbController.insertChat(chatData);

    var chatData = new Object();
    chatData.id = 2;
    chatData.product_id1 = 2;
    chatData.product_id2 = 3;
    dbController.insertChat(chatData);

    var productWantsCategoryData = new Object();
    productWantsCategoryData.product_id = 1;
    productWantsCategoryData.category = "electrodomestics";
    dbController.insertProductWantsCategory(productWantsCategoryData);

}

function initializeSamples2 () {

    var chatData = new Object();
    chatData.id = 3;
    chatData.product_id1 = 1;
    chatData.product_id2 = 3;
    dbController.insertChat(chatData);

}



function test1() {
    dbController.clearDB();
  initializeSamples();
    frisby.create('Get all chats without credentials')
        .waits(200)
        .get('http://localhost:3000/api/chats')
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
    frisby.create('Get all chats with user credentials')
        .waits(200)
      .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
        .get('http://localhost:3000/api/chats')
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
    frisby.create('Get all chats with false credentials')
        .waits(200)
      .addHeader("token","tokenmesfalsqueunamonedade15centims")
        .get('http://localhost:3000/api/chats')
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
    frisby.create('Get all chats with admin credentials')
        .waits(200)
      .addHeader("token","f4493ed183abba6b096f3903a5fc3b64")
        .get('http://localhost:3000/api/chats')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "product_id1": 1,
                "product_id2": 2,
          }]
        })
        .after(function(err, res, body) {
            test5();
        })
        .toss();
}

function test5() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Get all chats of a user with admin credentials')
        .waits(200)
      .addHeader("token","f4493ed183abba6b096f3903a5fc3b64")
        .get('http://localhost:3000/api/chats/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "product_id1": 1,
                "product_id2": 2,
          }]
        })
        .after(function(err, res, body) {
            test6();
        })
        .toss();
}

function test6() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Get all chats of a user with user credentials')
        .waits(200)
      .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
        .get('http://localhost:3000/api/chats/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "product_id1": 1,
                "product_id2": 2,
          }]
        })
        .after(function(err, res, body) {
            test7();
        })
        .toss();
}

function test7() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Get all chats of a without credentials')
        .waits(200)
        .get('http://localhost:3000/api/chats/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
         .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated."
        })
        .after(function(err, res, body) {
            test8();
        })
        .toss();
}

function test8() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Get all chats of a without wrong credentials')
        .waits(200)
        .addHeader("token","7e9420e418bcasde9f2662ddbe9cb95b6783")
        .get('http://localhost:3000/api/chats/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
         .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated."
        })
        .after(function(err, res, body) {
            test9();
        })
        .toss();
}

function test9() {
    dbController.clearDB();
    initializeSamples();
    initializeSamples2();
    frisby.create('Get all chats /more than 1/')
        .waits(200)
        .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
        .get('http://localhost:3000/api/chats/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "product_id1": 1,
                "product_id2": 2,
            },{
                "product_id1": 1,
                "product_id2": 3,
            }]
        })
        .after(function(err, res, body) {
            test10();
        })
        .toss();
}

function test10() {
    dbController.clearDB();
    initializeSamples();
    initializeSamples2();
    frisby.create('Delete a chat with admin credentials')
        .waits(200)
        .addHeader("token","f4493ed183abba6b096f3903a5fc3b64")
        .delete('http://localhost:3000/api/chats/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get all chats of a product')
                    .waits(200)
                    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
                    .get('http://localhost:3000/api/chats/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 3,
                            "product_id1": 1,
                            "product_id2": 3,
                        }]
                    })
                    .after(function(err, res, body) {
                        test11();
                    })
                    .toss();
            }
        })
        .toss();
}

function test11() {
    dbController.clearDB();
    initializeSamples();
    initializeSamples2();
    frisby.create('Delete a chat without credentials')
        .waits(200)
        .delete('http://localhost:3000/api/chats/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get all chats of a product')
                    .waits(200)
                    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
                    .get('http://localhost:3000/api/chats/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "product_id1": 1,
                            "product_id2": 2,
                        },{
                            "id": 3,
                            "product_id1": 1,
                            "product_id2": 3,
                        }]
                    })
                    .after(function(err, res, body) {
                        test12();
                    })
                    .toss();
            }
        })
        .toss();
}

function test12() {
    dbController.clearDB();
    initializeSamples();
    initializeSamples2();
    frisby.create('Delete a chat with user credentials')
        .waits(200)
        .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
        .delete('http://localhost:3000/api/chats/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get all chats of a product')
                    .waits(200)
                    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
                    .get('http://localhost:3000/api/chats/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 3,
                            "product_id1": 1,
                            "product_id2": 3,
                        }]
                    })
                    .after(function(err, res, body) {
                        dbController.closeDBConnection();
                    })
                    .toss();
            }
        })
        .toss();
}

test1();

