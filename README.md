# TrueKe Server

Server to manage queries from TrueKe application.

## Prerequisites

1. You must have installed the v6.10.0 LTS stable version of [NodeJS](https://nodejs.org/en/).
2. You must have installed [MySql 5.7.17](https://dev.mysql.com/doc/mysql-startstop-excerpt/5.7/en/), setted your user and started the MySql server.
3. You must have gitbash or git installed in order to run the following commands.

## Installation

	$ git clone https://github.com/jordiestape/TrueKe_Server
	$ cd TrueKe_Server
    $ mysql -u <user> -p < database.sql
    $ <password>
	$ npm install
	$ npm install -g jasmine-node

## Usage

	$ node Server.js

Now you have a server running on [http://localhost:3000/api](http://localhost:3000/api). In order to use the [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) you must know that we are using CRUD methods:

	C reate
	R ead
	U pdate
	D elete


To test this API you can use apps like [Postman](https://www.getpostman.com/). We recommend use as a chrome application.

### Usage examples

#### Get all users (Read)

![Get image](https://s18.postimg.org/58n10ifrd/Capture3.png)

#### Get one user (Read)

![Get image](https://s18.postimg.org/92gh9nx3d/Capture1.png)

#### Post (Create)

![Post image](https://s18.postimg.org/81g8kjg3t/Capture2.png)

#### Put (Update)

![Put image](https://s2.postimg.org/w9bcxtqjt/Capture5.png)

#### Delete

![Delete image](https://s18.postimg.org/4x5knqzbd/Capture4.png)

## MySQL considerations

### Use ` and '

 - Use `` ` `` when you need to indicate a **database, table or column names.**
 - Use `'` when you need to **delimite a string.**
