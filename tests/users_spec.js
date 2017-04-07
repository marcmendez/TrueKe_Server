var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();
dbController.clearDB();

var frisby = require('frisby');

function test1() {
    dbController.clearDB();
    frisby.create('Put one user to db')
        .waits(200)
        .post('http://localhost:3000/api/users', {
            "phone": "654654654",
            "user": "Manolo",
            "password": "passapalabra",
            "email": "manolo@gmail.com",
            "birthDate": "2000-02-03"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false
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
    frisby.create('Put one user to db')
        .waits(200)
        .post('http://localhost:3000/api/users', {
            "phone": "654654654",
            "user": "Manolo",
            "password": "passapalabra",
            "email": "manolo@gmail.com",
            "birthDate": "2000-02-03"
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false
        })
        .after(function(err, res, body) {
            if (!err) {
                frisby.create('Get users with admin credentials')
                    .waits(200)
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .get('http://localhost:3000/api/users')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "phone": "654654654",
                            "user": "Manolo",
                            "password": "edfd50a85db1fe977d2ad4efa006c6f2",
                            "email": "manolo@gmail.com",
                            "birthDate": "2000-02-03"
                        }]
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            test3();
                        }
                    })
                    .toss();
            }
        })
        .toss();

}


function test3() {

    dbController.clearDB();
    frisby.create('Get users with admin credentials and empty db')
        .waits(200)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .get('http://localhost:3000/api/users')
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
    frisby.create('Get users without admin credentials')
        .waits(200)
        .get('http://localhost:3000/api/users')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated"
        })
        .after(function(err, res, body) {
            if (!err) {
                dbController.closeDBConnection();
            }
        })
        .toss();
}


test1();