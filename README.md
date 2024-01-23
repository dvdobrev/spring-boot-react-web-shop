This project does not prioritize extensive design and styling of the pages. Instead, its primary purpose is for me to learn Spring Boot and how to integrate backend and frontend.



To start the application, clone the repository and run the docker-compose file (execute "docker-compose up --build").

The URL of the app is http://localhost:3000/.

============= App Description ================

There are two types of users (of user roles): ADMIN and USER.

------- Admin Role --------

All users have the default "USER" role. 
The USER role can be changed to the ADMIN role only manually in the database.

An admin user is automatically created.

Default admin user credentials:
-- email: admin@gmail.com
-- password: admin

An admin can perform all CRUD operations on the clothes (items).

------- User Role --------

After registration, the user receives a validation link via email. 
This link is valid for only 10 minutes. Each user must validate their registration to be able to log in. 
A message is shown with the validation time. If a user does not validate their email within 10 minutes, they can register again with the same email.

Regular users can:
-- purchase articles, but they must add at least one address and their full name
-- edit and delete their profile
-- create, edit, and delete their addresses

After "buying" items, an invoice will be generated and can be downloaded.

There are some route access validations (route guards), but not for all URLs.

There are also some input validations, but not for everything.
