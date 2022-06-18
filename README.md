# plumbing-store

## Initialize the database
- Setup an SQL connection along with the database. Use any tool of your liking.
- Please add the necessary credentials in `config/config.json` file.
- Make sure you name the database `store` since we need to run the `init.sql` file which references this name.
- Export or copy the script `init.sql` into your database tool and execute the script.
- Make sure all the tables are created without any errors.

## Run the server
To run the server, navigate into backend directory
```ssh
cd backend
```
and then install all the dependencies
```ssh
npm install
```
finally, start the server
```ssh
npm start
```