var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();

var frisby = require('frisby');

function initializeSamples() {
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
}

// /users/byphone/:phone

function test1() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Get user by phone without credentials')
        .waits(100)
        .get('http://localhost:3000/api/users/byphone/654654654')
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
    frisby.create('Get user by phone with admin credentials')
        .waits(100)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .get('http://localhost:3000/api/users/byphone/654654654')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "id": 1,
                "phone": "654654654",
                "user": "Pepito",
                "password": "passapalabra",
                "email": "manolito@gmail.com",
                "birthDate": "1990-01-01",
                "products": 3,
                "truekes": 2,
                "rating": 1
            }]
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
    frisby.create('Get user by phone with user credentials')
        .waits(100)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .get('http://localhost:3000/api/users/byphone/654654654')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "id": 1,
                "phone": "654654654",
                "user": "Pepito",
                "password": "passapalabra",
                "email": "manolito@gmail.com",
                "birthDate": "1990-01-01",
                "products": 3,
                "truekes": 2,
                "rating": 1
            }]
        })
        .after(function(err, res, body) {
            if (!err) {
                test4();
            }
        })
        .toss();
}


// /users/byphone/:email

function test4() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Get user by email without credentials')
        .waits(100)
        .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
            "Message": "Fail to access to API REST. You are not authenticated"
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
    frisby.create('Get user by phone with admin credentials')
        .waits(100)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "id": 1,
                "phone": "654654654",
                "user": "Pepito",
                "password": "passapalabra",
                "email": "manolito@gmail.com",
                "birthDate": "1990-01-01",
                "products": 3,
                "truekes": 2,
                "rating": 1
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
    initializeSamples();
    frisby.create('Get user by email with user credentials')
        .waits(100)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
            "Message": "Success",
            "Content": [{
                "id": 1,
                "phone": "654654654",
                "user": "Pepito",
                "password": "passapalabra",
                "email": "manolito@gmail.com",
                "birthDate": "1990-01-01",
                "products": 3,
                "truekes": 2,
                "rating": 1
            }]
        })
        .after(function(err, res, body) {
            if (!err) {
                test7();
            }
        })
        .toss();
}


// /users/:id


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

    frisby.create('Change user attributes with admin credentials')
        .waits(100)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .put('http://localhost:3000/api/users/1', {
            "id": 404,
            "phone": "123456789",
            "user": "Alfredo",
            "password": "asdf",
            "email": "pablo_escobar@gmail.com",
            "birthDate": "1990-05-11",
            "products": 5,
            "truekes": 6,
            "rating": 7.5
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
        })
        .after(function(err, req, body) {
            if (!err) {
                frisby.create("Get users with admin credentials")
                    .waits(100)
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .get('http://localhost:3000/api/users')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "phone": "123456789",
                            "user": "Alfredo",
                            "password": "912ec803b2ce49e4a541068d495ab570",
                            "email": "pablo_escobar@gmail.com",
                            "birthDate": "1990-05-11",
                            "products": 5,
                            "truekes": 6,
                            "rating": 7.5
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

    frisby.create('Change user attributes without credentials')
        .waits(100)
        .put('http://localhost:3000/api/users/1', {
            "id": 404,
            "phone": "123456789",
            "user": "Alfredo",
            "password": "asdf",
            "email": "pablo_escobar@gmail.com",
            "birthDate": "1990-05-11",
            "products": 5,
            "truekes": 6,
            "rating": 7.5
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
        })
        .after(function(err, req, body) {
            if (!err) {
                frisby.create("Get users with admin credentials")
                    .waits(100)
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .get('http://localhost:3000/api/users')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "phone": "654654654",
                            "user": "Pepito",
                            "password": "passapalabra",
                            "email": "manolito@gmail.com",
                            "birthDate": "1990-01-01",
                            "products": 3,
                            "truekes": 2,
                            "rating": 1.0
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

    frisby.create('Change user attributes with user credentials')
        .waits(100)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .put('http://localhost:3000/api/users/1', {
            "id": 404,
            "phone": "123456789",
            "user": "Alfredo",
            "password": "asdf",
            "email": "pablo_escobar@gmail.com",
            "birthDate": "1990-05-11",
            "products": 5,
            "truekes": 6,
            "rating": 7.5
        })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
        })
        .after(function(err, req, body) {
            if (!err) {
                frisby.create("Get users with admin credentials")
                    .waits(100)
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .get('http://localhost:3000/api/users')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "phone": "123456789",
                            "user": "Alfredo",
                            "password": "912ec803b2ce49e4a541068d495ab570",
                            "email": "pablo_escobar@gmail.com",
                            "birthDate": "1990-05-11",
                            "products": 5,
                            "truekes": 6,
                            "rating": 7.5
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
    frisby.create('Delete user with user credentials')
        .waits(100)
        .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
        .delete('http://localhost:3000/api/users/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
        })
        .after(function(err, req, body) {
            if (!err) {
                frisby.create('Get after delete user')
                    .waits(100)
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .get('http://localhost:3000/api/users/byemail/tulipan@gmail.com')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            frisby.create('Get user by phone with admin credentials')
                                .waits(100)
                                .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                                .get('http://localhost:3000/api/users/byphone/654654654')
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
                                .toss();                        }
                    })
                    .toss();
            }
        })
        .toss();
}

function test11() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Delete user with admin credentials')
        .waits(100)
        .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
        .delete('http://localhost:3000/api/users/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": false,
        })
        .after(function(err, req, body) {
            if (!err) {
                frisby.create('Get after delete user')
                    .waits(100)
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .get('http://localhost:3000/api/users/byemail/tulipan@gmail.com')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                    })
                    .after(function(err, res, body) {
                        if (!err) {
                            frisby.create('Get user by phone with admin credentials')
                                .waits(100)
                                .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                                .get('http://localhost:3000/api/users/byphone/654654654')
                                .expectStatus(200)
                                .expectHeaderContains('content-type', 'application/json')
                                .expectJSON({
                                    "Error": false,
                                    "Message": "Success",
                                    "Content": []
                                })
                                .after(function(err, res, body) {
                                    if (!err) {
                                        test12();
                                    }
                                })
                                .toss();                        }
                    })
                    .toss();
            }
        })
        .toss();
}

function test12() {
    dbController.clearDB();
    initializeSamples();
    frisby.create('Delete user without user credentials')
        .waits(100)
        .delete('http://localhost:3000/api/users/1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "Error": true,
        })
        .after(function(err, req, body) {
            if (!err) {
                frisby.create('Get user by phone with admin credentials')
                    .waits(100)
                    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
                    .get('http://localhost:3000/api/users/byphone/654654654')
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        "Error": false,
                        "Message": "Success",
                        "Content": [{
                            "id": 1,
                            "phone": "654654654",
                            "user": "Pepito",
                            "password": "passapalabra",
                            "email": "manolito@gmail.com",
                            "birthDate": "1990-01-01",
                            "products": 3,
                            "truekes": 2,
                            "rating": 1
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