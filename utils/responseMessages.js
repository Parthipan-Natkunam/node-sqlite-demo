//common errors
const INTERNAL_SERVER_ERROR = "Something went wrong. Please try again, later.";
const NOT_FOUND = "This resource does not exist";

//product validation errors
const INVALID_PRODUCT_ID = "Invalid product id";
const INVALID_PRODUCT_NAME = "Product name should be a string";
const INVALID_PRODUCT_DESCRIPTION = "Product description should be a string";
const INVALID_PRODUCT_PRICE = "Product price should be a number greater than 0";
const INVALID_PRODUCT_AVAILABILTY =
  "Product availabilty count should be an integer";

//product success messages
const PRODUCT_UPDATED_SUCCESSFULLY = "Product details updated successfully";
const PRODUCT_DELETED_SUCCESSFULLY = "Product deleted successfully";

module.exports = {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  PRODUCT_VALIDATION: {
    INVALID_PRODUCT_ID,
    INVALID_PRODUCT_NAME,
    INVALID_PRODUCT_DESCRIPTION,
    INVALID_PRODUCT_PRICE,
    INVALID_PRODUCT_AVAILABILTY,
  },
  PRODUCT_SUCCESS: {
    PRODUCT_UPDATED_SUCCESSFULLY,
    PRODUCT_DELETED_SUCCESSFULLY,
  },
};
