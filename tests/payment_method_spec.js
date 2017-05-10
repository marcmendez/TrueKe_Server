var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();

var frisby = require('frisby');

function initializeSamples() {

    //////////////////
    // INSERT USERS //
    //////////////////

    var userData = new Object();
    userData.id = 1;
    userData.phone = "654654654";
    userData.user = "Pepito";
    userData.password = "passapalabra";
    userData.email = "manolito@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 3;
    userData.truekes = 2;

    dbController.insertUser(userData);

    userData.id = 2;
    userData.user = "Danieliete";
    userData.phone = "654987987";
    userData.email = "daniel@gmail.com";
    userData.password = "passapalabra2";

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
    paymentMethodData.postalCode = "08029";
    paymentMethodData.address = "Carrer Diagonal";
    paymentMethodData.phone = "654654654";

    dbController.insertPaymentMethod(paymentMethodData);

    paymentMethodData.id = 2;
    paymentMethodData.number = "987654321";
    dbController.insertPaymentMethod(paymentMethodData);

    paymentMethodData.id = 3;
    paymentMethodData.number = "123456987";
    dbController.insertPaymentMethod(paymentMethodData);
}


function test1() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Get paymentMethod without credentials')
        .waits(100)
        .get('http://localhost:3000/api/paymentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated"
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
    frisby.create('Get paymentMethod with invalid credentials')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b60")
        .waits(100)
        .get('http://localhost:3000/api/paymentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated"
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
    frisby.create('Get paymentMethod with admin credentials')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .waits(100)
        .get('http://localhost:3000/api/paymentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "id": 1,
                "user_id": 1,
                "type": "Visa/4B/Euro6000",
                "number": "123456789",
                "expireDate": "1990-05-06",
                "name": "Sancho Panza",
                "country": "España",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": "08029",
                "address": "Carrer Diagonal",
                "phone": "654654654"
            }, {
                "id": 2,
                "user_id": 1,
                "type": "Visa/4B/Euro6000",
                "number": "987654321",
                "expireDate": "1990-05-06",
                "name": "Sancho Panza",
                "country": "España",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": "08029",
                "address": "Carrer Diagonal",
                "phone": "654654654"
            }, {
                "id": 3,
                "user_id": 1,
                "type": "Visa/4B/Euro6000",
                "number": "123456987",
                "expireDate": "1990-05-06",
                "name": "Sancho Panza",
                "country": "España",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": "08029",
                "address": "Carrer Diagonal",
                "phone": "654654654"
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
    frisby.create('Get paymentMethod with admin credentials of a user without paymentmethods')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .waits(100)
        .get('http://localhost:3000/api/paymentmethods/2')
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
    frisby.create('Get paymentMethod with user credentials')
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .waits(100)
        .get('http://localhost:3000/api/paymentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "id": 1,
                "user_id": 1,
                "type": "Visa/4B/Euro6000",
                "number": "123456789",
                "expireDate": "1990-05-06",
                "name": "Sancho Panza",
                "country": "España",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": "08029",
                "address": "Carrer Diagonal",
                "phone": "654654654"
            }, {
                "id": 2,
                "user_id": 1,
                "type": "Visa/4B/Euro6000",
                "number": "987654321",
                "expireDate": "1990-05-06",
                "name": "Sancho Panza",
                "country": "España",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": "08029",
                "address": "Carrer Diagonal",
                "phone": "654654654"
            }, {
                "id": 3,
                "user_id": 1,
                "type": "Visa/4B/Euro6000",
                "number": "123456987",
                "expireDate": "1990-05-06",
                "name": "Sancho Panza",
                "country": "España",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": "08029",
                "address": "Carrer Diagonal",
                "phone": "654654654"
            }]
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

    var userData = new Object();
    userData.id = 1;
    userData.phone = "654654654";
    userData.user = "Pepito";
    userData.password = "passapalabra";
    userData.email = "manolito@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 3;
    userData.truekes = 2;
    dbController.insertUser(userData);

    frisby.create('New paymentMethod without credentials')
        .waits(100)
        .post('http://localhost:3000/api/paymentmethods', {
            "user_id": 1,
            "type": "Visa/4B/Euro6000",
            "number": "123456987",
            "expireDate": "1990-05-06",
            "name": "Sancho Panza",
            "country": "España",
            "province": "Barcelona",
            "city": "Barcelona",
            "postalCode": "08029",
            "address": "Carrer Diagonal",
            "phone": "654654654"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get paymentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/paymentmethods/1')
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
        })
        .toss();
}

function test7() {
    dbController.clearDB();

    var userData = new Object();
    userData.id = 1;
    userData.phone = "654654654";
    userData.user = "Pepito";
    userData.password = "passapalabra";
    userData.email = "manolito@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 3;
    userData.truekes = 2;
    dbController.insertUser(userData);

    frisby.create('New paymentMethod with admin credentials')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .waits(100)
        .post('http://localhost:3000/api/paymentmethods', {
            "user_id": 1,
            "type": "Visa/4B/Euro6000",
            "number": "123456987",
            "expireDate": "1990-05-06",
            "name": "Sancho Panza",
            "country": "España",
            "province": "Barcelona",
            "city": "Barcelona",
            "postalCode": "08029",
            "address": "Carrer Diagonal",
            "phone": "654654654"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get paymentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/paymentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456987",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }]
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            test8();
                        }
                    })
                    .toss();
            }
        })
        .toss();
}

function test8() {
    dbController.clearDB();

    var userData = new Object();
    userData.id = 1;
    userData.phone = "654654654";
    userData.user = "Pepito";
    userData.password = "passapalabra";
    userData.email = "manolito@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 3;
    userData.truekes = 2;
    dbController.insertUser(userData);

    frisby.create('New paymentMethod with user credentials')
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .waits(100)
        .post('http://localhost:3000/api/paymentmethods', {
            "user_id": 1,
            "type": "Visa/4B/Euro6000",
            "number": "123456987",
            "expireDate": "1990-05-06",
            "name": "Sancho Panza",
            "country": "España",
            "province": "Barcelona",
            "city": "Barcelona",
            "postalCode": "08029",
            "address": "Carrer Diagonal",
            "phone": "654654654"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get paymentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/paymentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456987",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }]
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            test9();
                        }
                    })
                    .toss();
            }
        })
        .toss();
}

function test9() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Modify payment attributes without credentials')
        .waits(100)
        .put('http://localhost:3000/api/paymentmethods/1', {
            "id": 404,
            "user_id": 1,
            "type": "Visa/4B/Euro6000",
            "number": "123456987",
            "expireDate": "1990-05-06",
            "name": "Sancho Panza",
            "country": "España",
            "province": "Barcelona",
            "city": "Barcelona",
            "postalCode": "08029",
            "address": "Carrer Diagonal",
            "phone": "654654654"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get paymentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/paymentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456789",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "987654321",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }, {
                            "id": 3,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456987",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }]
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            test10();
                        }
                    })
                    .toss();
            }
        })
        .toss();
}

function test10() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Modify payment attributes with admin credentials')
    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .waits(100)
        .put('http://localhost:3000/api/paymentmethods/1', {
            "id": 404,
            "user_id": 1,
            "type": "MasterCard/4B/Euro6000",
            "number": "159753",
            "expireDate": "1975-10-10",
            "name": "Draco Malfoy",
            "country": "Holand",
            "province": "Quinto Pino",
            "city": "La Ciudad Perdida",
            "postalCode": "0800",
            "address": "Carrer Meridiana",
            "phone": "654159753"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Updated the field !"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get paymentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/paymentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "user_id": 1,
                            "type": "MasterCard/4B/Euro6000",
                            "number": "159753",
                            "expireDate": "1975-10-10",
                            "name": "Draco Malfoy",
                            "country": "Holand",
                            "province": "Quinto Pino",
                            "city": "La Ciudad Perdida",
                            "postalCode": "0800",
                            "address": "Carrer Meridiana",
                            "phone": "654159753"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "987654321",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }, {
                            "id": 3,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456987",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }]
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            test11();
                        }
                    })
                    .toss();
            }
        })
        .toss();
}

function test11() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Modify payment attributes with user credentials')
    .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .waits(100)
        .put('http://localhost:3000/api/paymentmethods/1', {
            "id": 404,
            "user_id": 1,
            "type": "MasterCard/4B/Euro6000",
            "number": "159753",
            "expireDate": "1975-10-10",
            "name": "Draco Malfoy",
            "country": "Holand",
            "province": "Quinto Pino",
            "city": "La Ciudad Perdida",
            "postalCode": "0800",
            "address": "Carrer Meridiana",
            "phone": "654159753"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Updated the field !"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get paymentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/paymentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "user_id": 1,
                            "type": "MasterCard/4B/Euro6000",
                            "number": "159753",
                            "expireDate": "1975-10-10",
                            "name": "Draco Malfoy",
                            "country": "Holand",
                            "province": "Quinto Pino",
                            "city": "La Ciudad Perdida",
                            "postalCode": "0800",
                            "address": "Carrer Meridiana",
                            "phone": "654159753"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "987654321",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }, {
                            "id": 3,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456987",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }]
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            test12();
                        }
                    })
                    .toss();
            }
        })
        .toss();
}

function test12() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Delete paymentMethod without credentials')
        .waits(100)
        .delete('http://localhost:3000/api/paymentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get paymentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/paymentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456789",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "987654321",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }, {
                            "id": 3,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456987",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }]
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            test13();
                        }
                    })
                    .toss();
            }
        })
        .toss();
}

function test13() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Delete paymentMethod with admin credentials')
    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")

        .waits(100)
        .delete('http://localhost:3000/api/paymentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get paymentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/paymentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 3,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456987",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "987654321",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }]
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            test14();
                        }
                    })
                    .toss();
            }
        })
        .toss();
}

function test14() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Delete paymentMethod with user credentials')
    .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")

        .waits(100)
        .delete('http://localhost:3000/api/paymentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get paymentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/paymentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 3,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "123456987",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "type": "Visa/4B/Euro6000",
                            "number": "987654321",
                            "expireDate": "1990-05-06",
                            "name": "Sancho Panza",
                            "country": "España",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": "08029",
                            "address": "Carrer Diagonal",
                            "phone": "654654654"
                        }]
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            dbController.closeDBConnection();
                        }
                    })
                    .toss();
            }
        })
        .toss();
}

test1();