const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { database } = require("./dbHelper");
const { productsController, defaultController } = require("./controller");
const { productsValidator, securityUtils } = require("./middleware");
const { products } = require("./controller/products");

const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

database.init();

app.get("/", defaultController.handleRoot);
app.get("/ping", defaultController.healthCheck);

app.get("/products", productsController.getAll);
app.post(
  "/products",
  [
    productsValidator.validateProductObject,
    securityUtils.cleanProductRequestData,
  ],
  products.addItem
);
app.get(
  "/products/:id",
  productsValidator.validateProductId,
  productsController.getItemById
);
app.put(
  "/products/:id",
  [
    productsValidator.validateProductId,
    productsValidator.validateProductObject,
  ],
  productsController.updateItemById
);
app.delete(
  "/products/:id",
  productsValidator.validateProductId,
  productsController.deleteItemById
);

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
