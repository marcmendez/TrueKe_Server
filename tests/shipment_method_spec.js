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
    userData.rating = 1.0;

    dbController.insertUser(userData);

    userData.id = 2;
    userData.user = "Danieliete";
    userData.phone = "654987987";
    userData.email = "daniel@gmail.com";
    userData.password = "passapalabra2";

    dbController.insertUser(userData);

    ////////////////////////////
    // INSERT SHIPMENTMETHODS //
    ////////////////////////////

    var shipmentMethodData = new Object();
    shipmentMethodData.id = 1;
    shipmentMethodData.user_id = 1;
    shipmentMethodData.country = "Spain";
    shipmentMethodData.province = "Barcelona";
    shipmentMethodData.city = "Barcelona";
    shipmentMethodData.postalCode = 08006;
    shipmentMethodData.address = "Calle Falsa 123";
    shipmentMethodData.name = "Pepito Mendizabal";
    shipmentMethodData.idCard = 654845616531;
    shipmentMethodData.phone = 654654654;

    dbController.insertShipmentMethod(shipmentMethodData);
    shipmentMethodData.id = 2;
    shipmentMethodData.postalCode = 08029;
    dbController.insertShipmentMethod(shipmentMethodData);
    shipmentMethodData.id = 3;
    shipmentMethodData.postalCode = 08019;
    dbController.insertShipmentMethod(shipmentMethodData);
}

function test1() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Get shipmentMethod without credentials')
        .waits(100)
        .get('http://localhost:3000/api/shipmentmethods/1')
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
    frisby.create('Get shipmentMethod with invalid credentials')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b60")
        .waits(100)
        .get('http://localhost:3000/api/shipmentmethods/1')
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
    frisby.create('Get shipmentMethod with admin credentials')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .waits(100)
        .get('http://localhost:3000/api/shipmentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "id": 1,
                "user_id": 1,
                "country": "Spain",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": 8006,
                "address": "Calle Falsa 123",
                "name": "Pepito Mendizabal",
                "idCard": "654845616531",
                "phone": "654654654"
            }, {
                "id": 2,
                "user_id": 1,
                "country": "Spain",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": 8029,
                "address": "Calle Falsa 123",
                "name": "Pepito Mendizabal",
                "idCard": "654845616531",
                "phone": "654654654"
            }, {
                "id": 3,
                "user_id": 1,
                "country": "Spain",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": 8019,
                "address": "Calle Falsa 123",
                "name": "Pepito Mendizabal",
                "idCard": "654845616531",
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
    frisby.create('Get shipmentMethod with admin credentials of a user without shipmentmethods')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .waits(100)
        .get('http://localhost:3000/api/shipmentmethods/2')
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
    frisby.create('Get shipmentMethod with user credentials')
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .waits(100)
        .get('http://localhost:3000/api/shipmentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "id": 1,
                "user_id": 1,
                "country": "Spain",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": 8006,
                "address": "Calle Falsa 123",
                "name": "Pepito Mendizabal",
                "idCard": "654845616531",
                "phone": "654654654"
            }, {
                "id": 2,
                "user_id": 1,
                "country": "Spain",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": 8029,
                "address": "Calle Falsa 123",
                "name": "Pepito Mendizabal",
                "idCard": "654845616531",
                "phone": "654654654"
            }, {
                "id": 3,
                "user_id": 1,
                "country": "Spain",
                "province": "Barcelona",
                "city": "Barcelona",
                "postalCode": 8019,
                "address": "Calle Falsa 123",
                "name": "Pepito Mendizabal",
                "idCard": "654845616531",
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
    userData.rating = 1.0;
    dbController.insertUser(userData);

    frisby.create('New shipmentMethod without credentials')
        .waits(100)
        .post('http://localhost:3000/api/shipmentmethods', {
            user_id: 1,
            country: "Spain",
            province: "Barcelona",
            city: "Barcelona",
            postalCode: 08006,
            address: "Calle Falsa 123",
            name: "Pepito Mendizabal",
            idCard: "654845616531",
            phone: "654654654"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get shipmentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/shipmentmethods/1')
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
    userData.rating = 1.0;
    dbController.insertUser(userData);

    frisby.create('New shipmentMethod with admin credentials')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .waits(100)
        .post('http://localhost:3000/api/shipmentmethods', {
            user_id: 1,
            country: "Spain",
            province: "Barcelona",
            city: "Barcelona",
            postalCode: 08006,
            address: "Calle Falsa 123",
            name: "Pepito Mendizabal",
            idCard: "654845616531",
            phone: "654654654"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "User Shipment Method Added !"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get shipmentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/shipmentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8006,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
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
    userData.rating = 1.0;
    dbController.insertUser(userData);

    frisby.create('New shipmentMethod with user credentials')
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .waits(100)
        .post('http://localhost:3000/api/shipmentmethods', {
            user_id: 1,
            country: "Spain",
            province: "Barcelona",
            city: "Barcelona",
            postalCode: 08006,
            address: "Calle Falsa 123",
            name: "Pepito Mendizabal",
            idCard: "654845616531",
            phone: "654654654"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "User Shipment Method Added !"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get shipmentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/shipmentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8006,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
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
    frisby.create('Modify shipment attributes without credentials')
        .waits(100)
        .put('http://localhost:3000/api/shipmentmethods/1', {
            id: 404,
            user_id: 2,
            country: "Switzerland",
            province: "Bern",
            city: "Bern",
            postalCode: 3270,
            address: "Calle Falsa 321",
            name: "Aurelien Ricachel",
            idCard: "135616548456",
            phone: "456456456"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get shipmentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/shipmentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8006,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
                            "phone": "654654654"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8029,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
                            "phone": "654654654"
                        }, {
                            "id": 3,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8019,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
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
    frisby.create('Modify shipment attributes with admin credentials')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .waits(100)
        .put('http://localhost:3000/api/shipmentmethods/1', {
            id: 404,
            user_id: 2,
            country: "Switzerland",
            province: "Bern",
            city: "Bern",
            postalCode: 3270,
            address: "Calle Falsa 321",
            name: "Aurelien Ricachel",
            idCard: "135616548456",
            phone: "456456456"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get shipmentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/shipmentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "user_id": 1,
                            "country": "Switzerland",
                            "province": "Bern",
                            "city": "Bern",
                            "postalCode": 3270,
                            "address": "Calle Falsa 321",
                            "name": "Aurelien Ricachel",
                            "idCard": "135616548456",
                            "phone": "456456456"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8029,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
                            "phone": "654654654"
                        }, {
                            "id": 3,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8019,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
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
    frisby.create('Modify shipment attributes with user credentials')
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .waits(100)
        .put('http://localhost:3000/api/shipmentmethods/1', {
            id: 404,
            user_id: 2,
            country: "Switzerland",
            province: "Bern",
            city: "Bern",
            postalCode: 3270,
            address: "Calle Falsa 321",
            name: "Aurelien Ricachel",
            idCard: "135616548456",
            phone: "456456456"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get shipmentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/shipmentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "user_id": 1,
                            "country": "Switzerland",
                            "province": "Bern",
                            "city": "Bern",
                            "postalCode": 3270,
                            "address": "Calle Falsa 321",
                            "name": "Aurelien Ricachel",
                            "idCard": "135616548456",
                            "phone": "456456456"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8029,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
                            "phone": "654654654"
                        }, {
                            "id": 3,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8019,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
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
    frisby.create('Delete shipmentMethod without credentials')
        .waits(100)
        .delete('http://localhost:3000/api/shipmentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get shipmentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/shipmentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8006,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
                            "phone": "654654654"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8029,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
                            "phone": "654654654"
                        }, {
                            "id": 3,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8019,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
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
    frisby.create('Delete shipmentMethod with admin credentials')
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .waits(100)
        .delete('http://localhost:3000/api/shipmentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Shipment Method Deleted !"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get shipmentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/shipmentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 3,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8019,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
                            "phone": "654654654"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8029,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
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
    frisby.create('Delete shipmentMethod with user credentials')
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .waits(100)
        .delete('http://localhost:3000/api/shipmentmethods/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Shipment Method Deleted !"
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get shipmentMethod with admin credentials')
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .waits(100)
                    .get('http://localhost:3000/api/shipmentmethods/1')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 3,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8019,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
                            "phone": "654654654"
                        }, {
                            "id": 2,
                            "user_id": 1,
                            "country": "Spain",
                            "province": "Barcelona",
                            "city": "Barcelona",
                            "postalCode": 8029,
                            "address": "Calle Falsa 123",
                            "name": "Pepito Mendizabal",
                            "idCard": "654845616531",
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