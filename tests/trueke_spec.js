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

    var chatData = new Object();
    chatData.id = 1;
    chatData.product_id1 = 1;
    chatData.product_id2 = 2;
    dbController.insertChat(chatData);

}

function test1() {
  dbController.clearDB();
  initializeSamples();
    frisby.create('Create a trueke without credentials')
        .waits(200)
        .post('http://localhost:3000/api/truekes')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated as admin."
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
    frisby.create('Create a trueke with wrong credentials')
        .waits(200)
        .addHeader("token", "toobad")
        .post('http://localhost:3000/api/truekes')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated as admin."
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
    frisby.create('Create a trueke with adming credentials wrong chat')
        .waits(200)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .post('http://localhost:3000/api/truekes', {
            "chat_id": 25
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Error executing MySQL query"
        })
        .after(function(err, res, body) {
            if (!err) {
                test4()
            }
        })
        .toss();
}

function test4() {
  dbController.clearDB();
  initializeSamples();
    frisby.create('Create a trueke with admin credentials OK')
        .waits(200)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .post('http://localhost:3000/api/truekes', {
            "chat_id": 1
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Trueke Added !"
        })
        .after(function(err, res, body) {
            if (!err) {
                dbController.closeDBConnection();
            }
        })
        .toss();
}


test1();
