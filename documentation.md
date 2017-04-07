# API REST DOCUMENTATION

# AUTHENTICATION

This API has a security layer. In order to use the API is needed to get permissions.

To get permissions make a post to "/authenticate" with the body params **phone or email** and **pass**. If the user exists into the db and the password is correct, the returned value is:
```
{
	"Error" : false,
	"Message" : Success,
	"Token" : [YOUR TOKEN]
}
```

## Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| phone or email  | phone or email of the user            |
| pass            | the password of the user in the system|

# CATEGORY

The API has a group of valid categories prefixed by the admins, the user is just able to get this categories in order to check the valid ones.

## GET /api/categories

The API returns the full set of categories that are valid in the system. It requires no parameters and no authentification. 

### Response

```
{
	"Error" : false,
	"Message" : Success,
	"Content" : [{"category": "cat1"}, {"category": "cat2"}, ... }]
}
```

# PRODUCT

The API contains all the products introduced in the system and offers different functionalities in order to: insert, get and delete this entities. 

## GET /api/products

The API returns the set of products stored in the database. This functionality is only available for the admin of the platform with its special token.

### Response

```
{
	"Error" : false,
	"Message" : Success,
	"Content" : [{"id": 3,
		      "user_id": 1,
                      "title": "Llapis pala",
                      "description": "Pel pou de ASW del baqua",
                      "category": "Uranus",
                      "min_price": 1,
                      "max_price": 2}, 
		     {"id": 4,
		      "user_id": 1,
                      "title": "Pen drive",
                      "description": "0GB",
                      "category": "electrodomestics",
                      "min_price": 1,
                      "max_price": 2}, ... 
		     ]
}
```

## GET /api/products/:user_id

The API returns the set of products stored in the database of a given user. This functionality is only available for autheticated users or admin. In case of accesing to the method with an specific user, it must be the same as the one in the parameter user_id.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during athentification    |

### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| user_id (*)     | id of the current user                |

### Response

If there's an error the error will turn to true and the message will tell wheter if it is due to a bad execution of an SQL query or because of a bad authentification.

```
{
	"Error" : false,
	"Message" : Success,
	"Content" : [{"id": 3,
		      "user_id": 1,
                      "title": "Llapis pala",
                      "description": "Pel pou de ASW del baqua",
                      "category": "Uranus",
                      "min_price": 1,
                      "max_price": 2}, 
		     {"id": 4,
		      "user_id": 1,
                      "title": "Pen drive",
                      "description": "0GB",
                      "category": "electrodomestics",
                      "min_price": 1,
                      "max_price": 2}, ... 
		     ]
}
```

## POST /products

The API is prepared to insert a new product in the DB in order to have it in the storage. This can only be done by authentified users and the admin, as before, the user must give a user_id that coincides with the current user.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during athentification    |

### Body

|       KEY       	|                 VALUE                 |
|-----------------------|---------------------------------------|
| user_id (*)     	| id of the current user                |
| title (*)    	  	| title of the product.                 |
| description     	| description of the product            |
| category (*)    	| category of the product. It must be a valid category|
| min_price (*)	  	| minimum price of the product. Higher that 0. |
| max_price (*)   	| maximum price of the product. Higher than min_price |
| wants_categories (*)  | categories wanted by the product. Separator:"-". |


### Response

If there's an error the error will turn to true and the message will tell wheter if it is due to a bad execution of an SQL query or because of a bad authentification.

```
   {
	"Error" : false,
	"Message" : "A new product was inserted in the database"
   }
```
## DELETE /products/:id

The API deletes the selected product. This can only be done by authentified users and the admin, as before, the user must give a user_id that coincides with the current user.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during athentification    |

### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)    	  | id of the product	                  |

### Response

If there's an error the error will turn to true and the message will tell wheter if it is due to a bad execution of an SQL query or because of a bad authentification.

```
  {
	"Error" : false,
	"Message" : "Product deleted correctly"
   }
   ```

# PRODUCT WANTS CATEGORY

The API is capable of storing the wishes of a product and returning them, this functionality only offers gets, as the inserts and the deletes are done in the product insertion and removal.

## GET /productwantscategory/:product_id

The API returns the wanted category of a given product. This method is only accesible for admins and for the owner of the product with the correct authentification.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during athentification    |

### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| product_id (*)  | id of the product	                  |

### Response

If there's an error the error will turn to true and the message will tell wheter if it is due to a bad execution of an SQL query or because of a bad authentification.


```
{
	"Error" : false,
	"Message" : Success,
	"Content" : [{"product_id": 1
		      "category": "Pouman"}, 
		     {"product_id": 1
		      "category": "Pouman2"},  ... 
		     ]
}
```

# USERS

This API stores the information related to its users and it allows its modification, creation, elimination and consulting its data.

## GET /api/users

The API returns the set of users stored in the database. This functionality is only available for the admin of the platform with its special token.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given to the admin	          |

### Response

If there's an error the error will turn to true and the message will tell wheter if it is due to a bad execution of an SQL query or because of a bad authentification.

```
{
	"Error" : false,
	"Message" : Success,
	"Content" : [{"id": 1,
		      "phone": "691203231",
		      "user": "Albert Pouman",
		      "password": "posuelo",
		      "email": "llapispala@gmail.com",
		      "birthDate": 1996-10-10,
		      "products": 0,
		      "truekes": 3,
		      "rating": 0.0}, 
		     {"id": 2,
		      "phone": "691243231",
		      "user": "Marcs Pouman",
		      "password": "posuelo",
		      "email": "llapisrastrillo@gmail.com",
		      "birthDate": 1996-10-10,
		      "products": 0,
		      "truekes": 3,
		      "rating": 0.0},   ... 
		     ]
}
```

## GET /api/users/byphone/:phone

The API returns the user (selected by the phone number) information stored in the database. This functionality is available for the admin of the platform with its special token and by the users with its authentification token.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during athentification    |

### Parameters


|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| phone	 	  | phone number of the current user      |

### Response

If there's an error the error will turn to true and the message will tell wheter if it is due to a bad execution of an SQL query or because of a bad authentification.

```
{
	"Error" : false,
	"Message" : Success,
	"Content" : [{"id": 1,
		      "phone": "691203231",
		      "user": "Albert Pouman",
		      "password": "posuelo",
		      "email": "llapispala@gmail.com",
		      "birthDate": 1996-10-10,
		      "products": 0,
		      "truekes": 3,
		      "rating": 0.0
		      }]
}
```

## GET /api/users/byemail/:email

the API returns the user (selected by the email) information stored in the database. This functionality is available for the admin of the platform with its special token and by the users with its authentification token.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during athentification    |

### Parameters


|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| email		  | email of the current user    	  |

### Response

If there's an error the error will turn to true and the message will tell wheter if it is due to a bad execution of an SQL query or because of a bad authentification.
```
{
	"Error" : false,
	"Message" : Success,
	"Content" : [{"id": 1,
		      "phone": "691203231",
		      "user": "Albert Pouman",
		      "password": "posuelo",
		      "email": "llapispala@gmail.com",
		      "birthDate": 1996-10-10,
		      "products": 0,
		      "truekes": 3,
		      "rating": 0.0
		      }]
}
```
## POST /api/users

This API URI allows the creation of a new user in the database. It is accesible without any type of authentification.

### Body

|       KEY       	|                 VALUE                 |
|-----------------------|---------------------------------------|
| phone (*)    	  	| phone of the user (UNIQUE)            |
| user  	     	| name of the user                      |
| password (*)    	| password of the user         		|
| birthDate (*)	  	| birth date of the user. FORMAT: YY-MM-DD |
| email	 (*)   		| email of the user (UNIQUE)		|

### Response

```
{
	"Error" : false,
	"Message" : "User Added !",
	"Content" : [{ "token": "thetoken" }]
}
```

## PUT /api/users/:id

The API allows the modification of an existing user in the database. It is accesible with admin authentification or with a normal user authentification that coincides with the modified user.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during athentification    |


### Body


|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| field (*)       | name of the field we want to modify   | 
| value (*)	  | value of the field we want to modify  |


### Response

```
{
	"Error" : false,
	"Message" : "Field Updated !"
}
```	

## DELETE /api/users

The API supplies this functionality in order to give the user the possibility of deleting an existing user in the database.It is accesible with admin authentification or with a normal user authentification that coincides with the deleted user.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during athentification    |


### Body

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)          | id of the user we want to delete /current| 

```
{
	"Error" : false,
	"Message" : "User deleted !"
}
```	




## GET api/paymentinfo/:user_id

Returns the payment methods of an user given its user_id.

### Parameters

- user_id *

## GET /shipmentinfo/:user_id
Returns the shipment methods of an user given its user_id.

### Parameters

- user_id *

# POSTS

## POST /users

Inserts a new user to the DB.

### Parameters

- phone *
- user *
- password *
- birthDate *
- email *

## POST /paymentinfo

Inserts a new method of payment for a user to the DB.

### Parameters

- user_id *
- type *
- number *
- expireDate *
- country *
- province *
- city *
- postalCode *
- adress *
- phone *

