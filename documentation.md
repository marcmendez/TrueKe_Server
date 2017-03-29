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
- phone or email : the phone or email of the user.
- pass : the pass of the user into the system.

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
