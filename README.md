## Node-SQLite Demo Project

A simple and quick REST API implementation demo using Node.js with SQLite as the backing datastore.

---

### Project Setup:

1. clone this repo.
2. cd into the cloned project directory.
3. run `npm install`
4. run `mkdir .data`
5. run `npm start`

### Database Schema:

#### tbl_product

| Column Name     | Type    | Is Primary Key | Is Auto Incremented |
| --------------- | ------- | -------------- | ------------------- |
| id              | INTEGER | yes            | yes                 |
| name            | TEXT    | no             | no                  |
| description     | TEXT    | no             | no                  |
| price           | REAL    | no             | no                  |
| available_units | INTEGER | no             | no                  |

### Endpoints:

#### Gerneral:

`GET /` - gives a 200 OK response.
`GET /ping` - same as `GET /`

#### products

`GET /products` - lists all products in DB as a JSON response.
