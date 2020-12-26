const {PRODUCT_VALIDATION} = require("../utils/errorMessages");

function isValidString(input){
  return !!input && typeof input === "string" && input.trim().length > 0;
}

function isValidPositiveNonZeroNumber(input){
  return !!input && typeof input === "number" && input > 0;
}

function isValidPositiveZeroInclusiveInteger(input){
  return typeof input === "number" && input >= 0 && input === parseInt(input,10);
}

function isValidId (inputId){
  return !!inputId && typeof inputId === "number";
}

function isValidName (name){
  return isValidString(name);
}

function isValidDescription (description){
  return isValidString(description);
}

function isValidPrice (price){
  return isValidPositiveNonZeroNumber(price);
}

function isValidAvailabilityCount(availablityCount){
  return isValidPositiveZeroInclusiveInteger(availablityCount);
}

const productsValidator = {
  validateAddProductObject : (request,response,next) => {
    const {name,description,price,available_units} = request.body;
    const errorMessages = [];
    
    if(!isValidName(name)){
      errorMessages.push(PRODUCT_VALIDATION.INVALID_PRODUCT_NAME);
    }
    if(!isValidDescription(description)){
      errorMessages.push(PRODUCT_VALIDATION.INVALID_PRODUCT_DESCRIPTION);
    }
    if(!isValidPrice(price)){
      errorMessages.push(PRODUCT_VALIDATION.INVALID_PRODUCT_PRICE);
    }
    if(!isValidAvailabilityCount(available_units)){
      errorMessages.push(PRODUCT_VALIDATION.INVALID_PRODUCT_AVAILABILTY);
    }
    
    if(errorMessages.length){
      response.status(400).json({"message":errorMessages});
      return;
    }
    next();
  }
}

module.exports = {
  productsValidator
}