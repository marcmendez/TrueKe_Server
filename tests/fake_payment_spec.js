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

    var paymentMethodData = new Object();
    paymentMethodData.id = 1;
    paymentMethodData.user_id = 1;
    paymentMethodData.type = "Visa/4B/Euro6000";
    paymentMethodData.number = "123456789";
    paymentMethodData.expireDate = "1990-05-06";
    paymentMethodData.name = "Sancho Panza";
    paymentMethodData.country = "España";
    paymentMethodData.province = "Barcelona";
    paymentMethodData.city = "Barcelona";
    paymentMethodData.postalCode = 08029;
    paymentMethodData.address = "Carrer Diagonal";
    paymentMethodData.phone = "654654654";

    dbController.insertPaymentMethod(paymentMethodData);


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

    var paymentMethodData = new Object();
    paymentMethodData.id = 2;
    paymentMethodData.user_id = 2;
    paymentMethodData.type = "Visa/4B/Euro6000";
    paymentMethodData.number = "123456789";
    paymentMethodData.expireDate = "1990-05-06";
    paymentMethodData.name = "Sancho Panza";
    paymentMethodData.country = "España";
    paymentMethodData.province = "Barcelona";
    paymentMethodData.city = "Barcelona";
    paymentMethodData.postalCode = 08029;
    paymentMethodData.address = "Carrer Diagonal";
    paymentMethodData.phone = "654654654";

    dbController.insertPaymentMethod(paymentMethodData);

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

    var productData = new Object();
    productData.id = 3;
    productData.user_id = "1";
    productData.title = "Maquineta Regadora";
    productData.description = "Rega el teu pou, pouman";
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
    chatData.product_id1 = 1;
    chatData.product_id2 = 3;
    dbController.insertChat(chatData);

    var chatData = new Object();
    chatData.id = 3;
    chatData.product_id1 = 2;
    chatData.product_id2 = 3;
    dbController.insertChat(chatData);

}

function test1() {
	dbController.clearDB();
  initializeSamples();
	frisby.create('Pay without credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/1/pay/1')
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
	frisby.create('Pay wrong product-user with credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/1/pay/1')
	    .addHeader("token","Uh")
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
	frisby.create('Pay wrong chat - product with credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/3/pay/1')
	    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Not paid."
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
	frisby.create('Pay wrong chat with credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/25/pay/1')
	    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Not paid."
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
	frisby.create('Pay wrong payment method with credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/1/pay/2')
	    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Not paid."
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
	frisby.create('Pay OK method with credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/1/pay/1')
	    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Paid. Excel·lent"
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
	frisby.create('Pay wrong product with admin credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/4/chats/1/pay/1')
	    .addHeader("token","f4493ed183abba6b096f3903a5fc3b64")
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Not paid."
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
	frisby.create('Pay wrong product-chat with admin credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/3/pay/1')
	    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Not paid."
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
	frisby.create('Pay wrong chat with admin credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/25/pay/1')
	    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Not paid."
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
	frisby.create('Pay wrong payment method with credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/1/pay/2')
	    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Not paid."
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test11();	        }
	    })
	    .toss();
}

function test11() {
  dbController.clearDB();
  initializeSamples();
	frisby.create('Pay OK method with credentials')
	    .waits(200)
	    .put('http://localhost:3000/api/products/1/chats/1/pay/1')
	    .addHeader("token","7e9420e418be9f2662ddbe9cb95b6783")
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	        "Message": "Paid. Excel·lent"
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            dbController.closeDBConnection();
	        }
	    })
	    .toss();
}




test1();


