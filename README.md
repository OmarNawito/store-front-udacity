# storeFrontBackend-Udacity
an api backend project for a storefront
## Description

This application provides API endpoints for the Storefront project allowing the following operations in the backend:

- CREATE / READ / UPDATE  **`users`** data
- CREATE / READ / UPDATE  **`products`** data
- CREATE / UPDATE **`orders`** data

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

## Database Schema

The following tables are created in the _postgres_ database

- users

  ```
  | Column Name | Data Type             |
  | ----------- | --------------------- |
  | id          | integer (PRIMARY KEY) |
  | firstname   | varchar               |
  | lastname    | varchar               |
  | username    | varchar               |
  | password    | varchar               |
  ```

- orders

  ```
  | Column Name | Data Type                            |
  | ----------- | ------------------------------------ |
  | id          | integer (PRIMARY KEY)                |
  | status      | varchar                              |
  | user_id     | integer (FOREIGN KEY to users table) |
  ```

- products

  ```
  | Column Name | Data Type              |
  | ----------- | ---------------------- |
  | id          | integer (PRIMARY KEY)  |
  | name        | varchar                |
  | price       | integer                |
  ```

- order_products

  ```
  | Column Name | Data Type                               |
  | ----------- | --------------------------------------- |
  | id          | integer (PRIMARY KEY)                   |
  | quantity    | integer                                 |
  | order_id    | integer (FOREIGN KEY to orders table)   |
  | product_id  | integer (FOREIGN KEY to products table) |
  ```        

## Project features

This application provides the following API routes

### Product

- `Index: '/api/products' [GET]`

  > http://localhost:3000/api/products

- `Show: '/api/products/:id' [GET]`

  > http://localhost:3000/api/products/1

- `Create [token required]: '/api/products' [POST]`

  > http://localhost:3000/api/products

  Sample JSON to be passed in body

  ```
  {
    "name": "IPHONE",
    "price": 15000,
    "category": "mobiles"
  }
  ```

- `Update [token required]: '/api/products/:id' [PUT]`

  > http://localhost:3000/api/products/1

  Sample JSON to be passed in body

  ```
  {
    "name": "IPHONE",
    "price": 13000,
    "category": "mobiles"
  }
  ```

- `[OPTIONAL] Top 5 most popular products: '/products/top-five-most-popular' [GET]`

  > http://localhost:3000/api/products/top-five-most-popular

### Users

- `Index [token required]: '/users' [GET]`

  > http://localhost:3000/api/users

- `Show [token required]: '/users/:id' [GET]`

  > http://localhost:3000/api/users/1

- `Create: '/users' [POST]`

  > http://localhost:3000/api/users

  Sample JSON to be passed in body

  ```
  {
    "firstname": "omar",
    "lastname": "nawito",
    "username": "nawito",
    "password": "123456789"
  }
  ```

- `Authenticate:'/api/users/authenticate' [POST]`

  > http://localhost:3000/api/users/authenticate

  Sample JSON to be passed in body

  ```
  {
    "username": "nawito",
    "password": "123456789"
  }
  ```

- `Update [token required]: '/api/users/:id' [PUT]`

  > http://localhost:3000/api/users/1

  Sample JSON to be passed in body

  ```
  {
    "firstname": "fName",
    "lastname": "lName",
    "username": "testuser",
    "password": "testpassword"
  }
  ```

### Orders

- `Get all orders: '/api/orders' [GET]`

  > http://localhost:3000/api/orders
  
- `Create [token required]: '/orders' [POST]`

  > http://localhost:3000/orders

  Sample JSON to be passed in body [Optional]

  ```
  {}
  ```

- `Get Order [token required]: '/orders/:id' [POST]`

> http://localhost:3000/orders/1

- `Add Product to Order [token required]: '/orders/:id' [POST]`

  > http://localhost:3000/orders/1

  Sample JSON to be passed in body

  ```
  {
    "productId": 4,
    "quantity": 5
  }
  ```        

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
