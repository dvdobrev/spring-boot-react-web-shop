There are two type of users - ADMIN and USER.

After registration the user get per email a validation link. This link is only 10 min valid.Each user has to valid his registration to be able to login. If a user not valid his email in 10 min, he can register again with the same email.

You have to register first a user and set his role to be "ADMIN" in the database to add some articles from the "Add Clothes" tab. After that the users can see/buy items.

An admin can make all CRUD operations to the clothes(items).
Reguler user can: 
-- buy articles, but they have to add atleast one address and his/her full name.
-- edit and delete there profile
-- create, edit and delete their addresses

There are some routes access validations (route guards). But not for all urls.

