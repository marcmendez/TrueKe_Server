# API REST DOCUMENTATION

# AUTHENTICATION

This API has a security layer. In order to use the API is needed to get permissions.

To get permissions make a post to "/authenticate" with the body params **phone or email** and **pass**. If the user exists into the db and the password is correct, the returned value is:
```
{
	"Error" : false,
	"Message" : Success,
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
	    "rating": 1
	  },
	  "token": "7e9420e418be9f2662ddbe9cb95b6783"
	}
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
| token	 	  | token given during authentication    |

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

## GET /api/products/matchmaking/:id

The API returns the set of products stored in the database that have a potential possibility to have a match with the product identified by the id given. This functionality is only available for autheticated users or admin. In case of accesing to the method with an specific user, the product must be the same as the owner of the product.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)   	  | id of the product                     |

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
| token	 	  | token given during authentication    |

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
| token	 	  | token given during authentication    |

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
| token	 	  | token given during authentication    |

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
| token	 	  | token given during authentication    |

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
| token	 	  | token given during authentication    |

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
| user (*) 	     	| name of the user                      |
| password (*)    	| password of the user         		|
| birthDate (*)	  	| birth date of the user. FORMAT: YY-MM-DD |
| email	 (*)   		| email of the user (UNIQUE)		|

### Response

```
{
	"Error" : false,
	"Message" : "User Added !",
	"Content" :  "the token of the user added"
}
```

## PUT /api/users/:id

The API allows the modification of an existing user in the database. It is accesible with admin authentification or with a normal user authentification that coincides with the modified user.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |


### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)          | id of the user we want to delete /current| 

### Body

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| \[Attribute to modify\] (*)       | value that we want to put inside the attribute   | 

**You can put more than one attribute to change it**

### Attributes
- phone
- user
- password
- email
- birthDate

### Response

```
{
	"Error" : false,
	"Message" : "Updated !"
}
```	

## DELETE /api/users/:id

The API supplies this functionality in order to give the user the possibility of deleting an existing user in the database.It is accesible with admin authentification or with a normal user authentification that coincides with the deleted user.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |


### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)          | id of the user we want to delete /current| 

```
{
	"Error" : false,
	"Message" : "User deleted !"
}
```	

# PAYMENTMETHODS

## GET /api/paymentmethods/:user_id

Returns the payment methods of an user given its user_id.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Parameters

- user_id *

## POST /api/paymentmethods

Inserts a new method of payment for a user to the DB.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Body

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

## PUT /api/paymentmethods/:id

Modifies the payment method :id

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Body

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| \[Attribute to modify\] (*)       | value that we want to put inside the attribute   | 

### Attributes

- country
- province
- city
- postalCode
- adress
- name
- idCard
- phone

## DELETE /api/paymentmethods/:id

Deletes the payment method :id

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |


### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)          | id of the payment method we want to delete /current| 

```
{
	"Error" : false,
	"Message" : "Payment Method Deleted !"
}
```	

# SHIPMENTMETHODS

## GET /api/shipmentmethods/:user_id

Returns the shipment methods of an user given its user_id.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Parameters

- user_id *

## POST /api/shipmentmethods

Inserts a new shipment method for a user to the DB.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Body

- user_id *
- country *
- province *
- city *
- postalCode *
- adress *
- name *
- idCard *
- phone *

## PUT /api/shipmentmethods/:id

Modifies the shipment method :id

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Body

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| \[Attribute to modify\] (*)       | value that we want to put inside the attribute   | 

### Attributes

- country
- province
- city
- postalCode
- adress
- name
- idCard
- phone

## DELETE /api/shipmentmethods/:id

Deletes the shipment method :id

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |


### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)          | id of the shipment method we want to delete /current| 

### Response

```
{
	"Error" : false,
	"Message" : "Shipment Method Deleted !"
}
```	

# MATCHES

## POST /api/matches

The database saves the response of a given product (product_id1) to a shown product (product_id2) as (wants). You must be logged in or have the admin token. You must have the same token as the one of the owner of the product.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Body

|       KEY       	|                 VALUE                 |
|-----------------------|---------------------------------------|
| product_id1 (*)    	| the id of the product of the matchmaking|
| product_id2 (*) 	| the id of the product shown           |
| wants (*)    		| the response (OK->1, NO->0)		|

### Response

```
{
	"Error" : false,
	"Message" : "Match Added !"
}
```

# IMAGES

## GET /api/images/:md5

Get an image encoded to base64.

### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| md5 (*)          | Image id. This value is the final of the path that the system returns when a image is created (e.g: /images/__3100bf4c8f7cdc238d5e8483e7295a44__) | 

### Response

```
{
	"Error" : false,
	"Message" : "Success",
	"Content" : "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBD..."
}
```

## POST /api/images

Upload an image to the server and retrieve a path to access. 

### Body

|       KEY       	|                 VALUE                 |
|-----------------------|---------------------------------------|
| image (*)    	| Image base64 string |

### Response

```
{
	"Error": false,
	"Message": "Success",
	"Content": "/images/3100bf4c8f7cdc238d5e8483e7295a44"
}
```

# PRODUCT IMAGES

## GET /api/products/:id/images

Get all the image paths of a product.

### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)          | product id | 

### Response

```
{
	"Error": false,
	"Message": "Success",
	"Content": [{
	    imagePath: "/images/3100bf4c8f7cdc238d5e8483e7295a44"
	}]
}
```

## POST /api/products/:id/images

Add an image to a product.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)          | product id | 

### Body

|       KEY       	|                 VALUE                 |
|-----------------------|---------------------------------------|
| product_id (*)    	| the id of a product |
| image_md5 (*) 	| the image md5 |

### Response

```
{
	"Error": false,
	"Message": "Success"
}
```

## DELETE /api/products/:id/images/:md5

Delete a product image.

### Headers

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| token	 	  | token given during authentication    |

### Parameters

|       KEY       |                 VALUE                 |
|-----------------|---------------------------------------|
| id (*)          | product id | 
| md5 (*)          | Image id. This value is the final of the path that the system returns when a image is created (e.g: /images/__3100bf4c8f7cdc238d5e8483e7295a44__) | 

### Response

```
{
	"Error": false,
	"Message": "Success"
}
```