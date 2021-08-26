# Restro-MongoDB

Pre requisites:

To install nodejs run, ( sudo apt install nodejs npm )

To verify, run ( node -v )

To install express, make a directory in your specified destination (mkdir Restro-MongoDB)

Inside the new directory (npm init ), this will prompt for default values just click enter until (entry point :index.js).

When prompted (entry point :index.js) enter app.js

now install express in that directory by running (npm install express --save)

now install mongoose run,(npm install mongoose --save)

Postman should be installed hitting endpoints.

// steps to run the app

After cloning this repository, go to command line.

start the mongodb server (sudo service mongod start (LINUX), for windows run net start mongoDB as administrator by default

open the mongodb compass client and create a database called (rms) and create all collections(restaurants,orders,waiters,dishes,customers)

click on add data and import the .json collection files from the db_scripts folder.

now in local cli navigate to cloned repository.

run command node app to start the app on localhost.

Your node js app is up and running now

now go to web browser.

type localhost:8080/restaurants(to get the list of restaurants from the mongoDb database)

Go to postman.

check routes (localhost:8080/restaurants) - to get list of all restaurants

(localhost:8080/restaurants/:id) - to get the details of one restaurant

(localhost:8080/restaurants/:id)- to update/delete a restauarant

(localhost:8080/restaurants) - to post a new restaurant

Similarly u can check the routes for other collections.
