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
| user_id     	  | id of the current user                |

### Response

If there's an error the error will turn to true and the message will tell wheter if it is due to a bad execution of an SQL query or because of a bad authentification.

```{
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

# GETS

## GET /users

Returns all the users of the database.

### Parameters

You need no parameters.

## GET /users/byphone/:phone

Returns a user given a phone number.

### Parameters

- phone *

## GET /users/byemail/:email

Returns a user given an email.

### Parameters

- email *

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

# DELETE

## DELETE /users/:id

Deletes an user with an specific id from the DB.

### Parameters

- id *
