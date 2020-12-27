const { products } = require("./products");
const { generals } = require("./general");

module.exports = {
  productsController: products,
  defaultController: generals,
};
