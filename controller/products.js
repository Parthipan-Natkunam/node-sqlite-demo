const { database } = require("../dbHelper");
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  PRODUCT_SUCCESS,
} = require("../utils/responseMessages");

const products = {
  getAll: (request, response, next) => {
    database.selectAllAtOnce((err, rows) => {
      if (err) {
        response.status(500).json({ message: INTERNAL_SERVER_ERROR });
      }
      response.json(rows);
      next();
    });
  },
  addItem: async (request, response, next) => {
    const { name, description, price, available_units } = request.body;
    values = [name, description, price, available_units];
    try {
      const addedProductId = await database.addProduct(values);
      response.status(201).json({ id: addedProductId });
    } catch (error) {
      response.status(500).json({ message: INTERNAL_SERVER_ERROR });
    }
    next();
  },
  getItemById: async (request, response, next) => {
    const id = request.params.id;
    try {
      const productData = await database.getById(id);
      response.json(productData);
    } catch (error) {
      if (error && error.customErrorCode === 404) {
        response.status(error.customErrorCode).json({ message: NOT_FOUND });
      } else {
        response.status(500).json({ message: INTERNAL_SERVER_ERROR });
      }
    }
    next();
  },
  updateItemById: async (request, response, next) => {
    const id = request.params.id;
    const { name, description, price, available_units } = request.body;
    try {
      await database.updateByID(id, [
        name,
        description,
        price,
        available_units,
      ]);
      response
        .status(200)
        .json({ message: PRODUCT_SUCCESS.PRODUCT_UPDATED_SUCCESSFULLY });
    } catch (error) {
      if (error && error.customErrorCode === 404) {
        response.status(error.customErrorCode).json({ message: NOT_FOUND });
      } else {
        response.status(500).json({ message: INTERNAL_SERVER_ERROR });
      }
    }
    next();
  },
  deleteItemById: async (request, response, next) => {
    const { id } = request.params;
    try {
      await database.deleteById(id);
      response
        .status(200)
        .json({ message: PRODUCT_SUCCESS.PRODUCT_DELETED_SUCCESSFULLY });
    } catch (error) {
      if (error && error.customErrorCode === 404) {
        response.status(error.customErrorCode).json({ message: NOT_FOUND });
      } else {
        response.status(500).json({ message: INTERNAL_SERVER_ERROR });
      }
    }
    next();
  },
};

module.exports = {
  products,
};
