var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();

var frisby = require('frisby');

function initializeSamples() {
    var userData = new Object();
    userData.id = 1;
    userData.phone = "654654654";
    userData.user = "Pepito";
    userData.password = "edfd50a85db1fe977d2ad4efa006c6f2";
    userData.email = "manolito@gmail.com";
    userData.birthDate = "1990-01-01";
    userData.products = 3;
    userData.truekes = 2;

    dbController.insertUser(userData);

    userData.id = 2;
    userData.user = "Danieliete";
    userData.phone = "654987987";
    userData.email = "daniel@gmail.com";
    userData.password = "df8ae44333c082e820de552a04563175";

    dbController.insertUser(userData);
}

function test1() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Get credential by email with correct credentials')
        .waits(100)
        .post('http://localhost:3000/api/authenticate', {
            "email": "manolito@gmail.com",
            "password": "passapalabra"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": {
              "user": {
                "id": 1,
                "phone": "654654654",
                "user": "Pepito",
                "password": "edfd50a85db1fe977d2ad4efa006c6f2",
                "email": "manolito@gmail.com",
                "birthDate": "1990-01-01",
                "products": 3,
                "truekes": 2,
                "imagePath": '',
                "ratingsNumber": 0,
                "ratingsValue": 0
              },
              "token": "7e9420e418be9f2662ddbe9cb95b6783"
            }
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
    frisby.create('Get credential by email with nonexisting user')
        .waits(100)
        .post('http://localhost:3000/api/authenticate', {
            "email": "tioquenoexiste@gmail.com",
            "password": "passapalabra"
        })        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
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
    frisby.create('Get credential by email with incorrect password')
        .waits(100)
        .post('http://localhost:3000/api/authenticate', {
            "email": "manolito@gmail.com",
            "password": "passa"
        })        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
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
    frisby.create('Get credential by phone with correct credentials')
        .waits(100)
        .post('http://localhost:3000/api/authenticate', {
            "phone": "654654654",
            "password": "passapalabra"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": {
              "user": {
                "id": 1,
                "phone": "654654654",
                "user": "Pepito",
                "password": "edfd50a85db1fe977d2ad4efa006c6f2",
                "email": "manolito@gmail.com",
                "birthDate": "1990-01-01",
                "products": 3,
                "truekes": 2,
                "imagePath": '',
                "ratingsNumber": 0,
                "ratingsValue": 0
              },
              "token": "7e9420e418be9f2662ddbe9cb95b6783"
            }
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
    frisby.create('Get credential by phone with incorrect password')
        .waits(100)
        .post('http://localhost:3000/api/authenticate', {
            "phone": "654654654",
            "password": "passa"
        })        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
        })
        .after(function(err, res, body) {
            if (!err) {
                dbController.closeDBConnection();
            }
        })
        .toss();
}

test1();