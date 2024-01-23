To start the application just clone the repository and run the docker-compose file (do "docker-compose up --build" )

The URL of the app is  http://localhost:3000/


============= App description ================

There are two type of users - ADMIN and USER.


    -------Admin Role --------
    The USER role can be changed to ADMIN role only manually in the database

    An admin user is automatically created

    Default admin user credentials:
    -- email: admin@gmail.com
    -- passwod: admin


    An admin can make all CRUD operations to the clothes(items).

    -------User Role --------


    After registration the user get per email a validation link. This link is only 10 min valid.Each user has to validate his registration to be able to login. A message is show with the validation time. If a user do not validate his email in 10 min, he can register again with the same email.

    Reguler user can do: 
    -- buy articles, but they have to add atleast one address and his/her full name
    -- edit and delete there profile
    -- create, edit and delete their addresses


There are some routes access validations (route guards). But not for all urls.

