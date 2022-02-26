# storeFrontBackend-Udacity
an api backend project for a storefront

### Packages
#### express
`npm i -S express`
`npm i -D @types/express`
#### pg
`npm i -S pg`
`npm i -D @types/pg`
#### body-parser
`npm i -S body-parser`
`npm i -D @types/body-parser`
#### typescript
`npm i -D typescript`
#### db-migrate
`npm install -g db-migrate`
#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`
#### jsonwebtoken
`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`
#### jasmine
`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`
#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`
#### dotenv
`npm i dotenv`
`npm i --save-dev @types/dotenv`

# Scripts
- Start:  ``` npm run start ```
- DEV:  ``` npm run dev ```
- Migrate:  ``` npm run migration:run ```
- Build:  ``` npm run build ```
- Lint:  ``` npm run lint ```
- Prettify:  ``` npm run prettify ```
- Test:  ``` **npm run test** ```

## Set up Database
### Create Database
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER shopping_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE shopping;`
    - `CREATE DATABASE shopping_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c shopping`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 
`db-migrate up`

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

```
PORT = 3000
//Database connection
POSTGRES_HOST = localhost
POSTGRES_DB =  shopping
POSTGRES_USER = shopping_user
POSTGRES_PASSWORD = password123

//Database test
ENV=test
POSTGRES_TEST_HOST = localhost
POSTGRES_TEST_DB =  shopping_test
POSTGRES_TEST_USER = shopping_user
POSTGRES_TEST_PASSWORD = password123

//Bcrypt pepper and salt
SALT_ROUNDS = 10
BCRYPT_PASSWORD = changeME
TOKEN_SECRET = changeME
```
### Running Ports 
After start up, the server will start on port `3000` || `3020` and the database on port `5432`
