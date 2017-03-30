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
	        "User": [{
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
	        "User": [{
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
	        "User": [{
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
	        "User": [{
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
	initializeSamples();
	frisby.create('Change user "truekes" field with admin credentials')
	    .waits(100)
	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "truekes",
	        "value": 4
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, res, body) {
	    	frisby.create('Get after update "truekes"')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	        "Error": false,
	    	        "Message": "Success",
	    	        "User": [{
	    	            "id": 1,
	    	            "phone": "654654654",
	    	            "user": "Pepito",
	    	            "password": "passapalabra",
	    	            "email": "manolito@gmail.com",
	    	            "birthDate": "1990-01-01",
	    	            "products": 3,
	    	            "truekes": 4,
	    	            "rating": 1
	    	        }]
	    	    })
	    	    .after(function(err, res, body) {
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
	frisby.create('Change user "rating" field with admin credentials')
	    .waits(100)
	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "rating",
	        "value": 2.2
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, res, body) {
	    	frisby.create('Get after update "rating"')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	        "Error": false,
	    	        "Message": "Success",
	    	        "User": [{
	    	            "id": 1,
	    	            "phone": "654654654",
	    	            "user": "Pepito",
	    	            "password": "passapalabra",
	    	            "email": "manolito@gmail.com",
	    	            "birthDate": "1990-01-01",
	    	            "products": 3,
	    	            "truekes": 2,
	    	            "rating": 2.2
	    	        }]
	    	    })
	    	    .after(function(err, res, body) {
	    	        if (!err) {
	    	            test9();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
}

function test9() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Change user "products" field with admin credentials')
	    .waits(100)
	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "products",
	        "value": 4
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, res, body) {
	    	frisby.create('Get after update "products"')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	    	"Error": false,
	    	    	"Message": "Success",
	    	    	"User": [{
	    	    	    "id": 1,
	    	    	    "phone": "654654654",
	    	    	    "user": "Pepito",
	    	    	    "password": "passapalabra",
	    	    	    "email": "manolito@gmail.com",
	    	    	    "birthDate": "1990-01-01",
	    	    	    "products": 4,
	    	    	    "truekes": 2,
	    	    	    "rating": 1
	    	        }]
	    	    })
	    	    .after(function(err, res, body) {
	    	        if (!err) {
	    	            test10();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
}

function test10() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Change user "birthDate" field with admin credentials')
	    .waits(100)
	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "birthDate",
	        "value": "1978-10-12"
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, res, body) {
	    	frisby.create('Get after update "birthDate')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	    	"Error": false,
	    	    	"Message": "Success",
	    	    	"User": [{
	    	    	    "id": 1,
	    	    	    "phone": "654654654",
	    	    	    "user": "Pepito",
	    	    	    "password": "passapalabra",
	    	    	    "email": "manolito@gmail.com",
	    	    	    "birthDate": "1978-10-12",
	    	    	    "products": 3,
	    	    	    "truekes": 2,
	    	    	    "rating": 1
	    	        }]
	    	    })
	    	    .after(function(err, res, body) {
	    	        if (!err) {
	    	            test11();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
}

function test11() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Change user "password" field with admin credentials')
	    .waits(100)
	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "password",
	        "value": "passapalabra2"
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, res, body) {
	    	frisby.create('Get after update "password"')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	    	"Error": false,
	    	    	"Message": "Success",
	    	    	"User": [{
	    	    	    "id": 1,
	    	    	    "phone": "654654654",
	    	    	    "user": "Pepito",
	    	    	    "password": "df8ae44333c082e820de552a04563175",
	    	    	    "email": "manolito@gmail.com",
	    	    	    "birthDate": "1990-01-01",
	    	    	    "products": 3,
	    	    	    "truekes": 2,
	    	    	    "rating": 1
	    	        }]
	    	    })
	    	    .after(function(err, res, body) {
	    	        if (!err) {
	    	            test12();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
}

function test12() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Change user "user" field with admin credentials')
	    .waits(100)
	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "user",
	        "value": "Fulanito"
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, req, body) {
	    	frisby.create('Get after update "user"')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	    	"Error": false,
	    	    	"Message": "Success",
	    	    	"User": [{
	    	    	    "id": 1,
	    	    	    "phone": "654654654",
	    	    	    "user": "Fulanito",
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
	    	            test13();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
}

function test13() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Change user "id" field with admin credentials')
	    .waits(100)
	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "id",
	        "value": 3
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, req, body) {
	    	frisby.create('Get after update "id"')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	    	"Error": false,
	    	    	"Message": "Success",
	    	    	"User": [{
	    	    	    "id": 3,
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
	    	            test14();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
}

function test14() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Change user "phone" field with admin credentials')
	    .waits(100)
	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "phone",
	        "value": "654159159"
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, req, body) {
	    	frisby.create('Get after update "phone"')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/manolito@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	    	"Error": false,
	    	    	"Message": "Success",
	    	    	"User": [{
	    	    	    "id": 1,
	    	    	    "phone": "654159159",
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
	    	            test15();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
	
}

function test15() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Change user "email" field with admin credentials')
	    .waits(100)
	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "email",
	        "value": "tulipan@gmail.com"
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, req, body) {
	    	frisby.create('Get after update "email"')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/tulipan@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	    	"Error": false,
	    	    	"Message": "Success",
	    	    	"User": [{
	    	    	    "id": 1,
	    	    	    "phone": "654654654",
	    	    	    "user": "Pepito",
	    	    	    "password": "passapalabra",
	    	    	    "email": "tulipan@gmail.com",
	    	    	    "birthDate": "1990-01-01",
	    	    	    "products": 3,
	    	    	    "truekes": 2,
	    	    	    "rating": 1
	    	        }]
	    	    })
	    	    .after(function(err, res, body) {
	    	        if (!err) {
	    	            test16();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
	
}

function test16() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Change user field without credentials')
	    .waits(100)
	    .put('http://localhost:3000/api/users/3', {
	        "field": "email",
	        "value": "tulipan@gmail.com"
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": true,
	        "Message": "Fail to access to API REST. You are not authenticated"
	    })
	    .after(function(err, res, body) {
	        if (!err) {
	            test17();
	        }
	    })
	    .toss();
}

function test17() {
	dbController.clearDB();
	initializeSamples();
	frisby.create('Change user "email" field with user credentials')
	    .waits(100)
	    .addHeader("token", "7e9420e418be9f2662ddbe9cb95b6783")
	    .put('http://localhost:3000/api/users/1', {
	        "field": "email",
	        "value": "tulipan@gmail.com"
	    })
	    .expectStatus(200)
	    .expectHeaderContains('content-type', 'application/json')
	    .expectJSON({
	        "Error": false,
	    })
	    .after(function(err, req, body) {
	    	frisby.create('Get after update "email"')
	    	    .waits(100)
	    	    .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
	    	    .get('http://localhost:3000/api/users/byemail/tulipan@gmail.com')
	    	    .expectStatus(200)
	    	    .expectHeaderContains('content-type', 'application/json')
	    	    .expectJSON({
	    	    	"Error": false,
	    	    	"Message": "Success",
	    	    	"User": [{
	    	    	    "id": 1,
	    	    	    "phone": "654654654",
	    	    	    "user": "Pepito",
	    	    	    "password": "passapalabra",
	    	    	    "email": "tulipan@gmail.com",
	    	    	    "birthDate": "1990-01-01",
	    	    	    "products": 3,
	    	    	    "truekes": 2,
	    	    	    "rating": 1
	    	        }]
	    	    })
	    	    .after(function(err, res, body) {
	    	        if (!err) {
	    	            test18();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
	
}



function test18() {
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
	    	            test19();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
}

function test19() {
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
	    	            test20();
	    	        }
	    	    })
	    	    .toss();
	    })
	    .toss();
}

function test20() {
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
	    	// TODO: esto hay que modificarlo cada vez que se añade un nuevo test
	    	if (!err) {
	    	    dbController.closeDBConnection();
	    	}
	    })
	    .toss();
}

test1();

