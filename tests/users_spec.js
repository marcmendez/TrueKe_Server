var dbController = require('../trueke_utils_db.js');
dbController.initDBConnection();

var frisby = require('frisby');

dbController.clearDB();
frisby.create('Put one user to db with ONLY mandatory attributes')
    .post('http://localhost:3000/api/users', {
        "phone": 654654654,
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
    .toss();

dbController.clearDB();
frisby.create('Put one user to db with ALL attributes')
    .post('http://localhost:3000/api/users', {
        "phone": 654321321,
        "user": "Daniel",
        "password": "passapalabra2",
        "email": "daniel@gmail.com",
        "birthDate": "1990-01-01",
        "products": 2,
        "truekes": 10,
        "rating": 4.3
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "Error": false
    })
    .toss();

frisby.create('Get users with admin credentials')
 .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    .get('http://localhost:3000/api/users')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
     "Error" : false,
     "Message" : "Success"
    })
    .expectJSON("Users.*", {
     "Users": [
       {
         "phone": 654321321,
         "user": "Daniel",
         "password": "df8ae44333c082e820de552a04563175",
         "email": "daniel@gmail.com",
         "birthDate": "2000-02-02T23:00:00.000Z",
         "products": 2,
         "truekes": 10,
         "rating": 4.3
       }
     ]   
    })
    .toss();

dbController.clearDB();
frisby.create('Get users with admin credentials and empty db')
 .addHeader("token", "f4493ed183abba6b096f3903a5fc3b64")
    .get('http://localhost:3000/api/users')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
     "Error" : false,
     "Message" : "Success",
     "Users": []   
    })
    .toss();

frisby.create('Get users without credentials')
    .get('http://localhost:3000/api/users')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "Error": true,
        "Message": "Fail to access to API REST. You are not authenticated"
    })
    .toss();

frisby.create('Get users with user credentials')
    .get('http://localhost:3000/api/users')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "Error": true,
        "Message": "Fail to access to API REST. You are not authenticated"
    })
    .toss();


dbController.closeDBConnection();
