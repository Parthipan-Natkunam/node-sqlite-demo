const {database} = require("../dbHelper");
const {customizedErrorHandler} = require("../utils/errorHandler");


const products = {
    getAll: (response)=>{
      database.selectAllAtOnce((err,rows)=>{
        if(err){
          customizedErrorHandler.handleInternalServerError(response);
          return;
        }
        response.json(rows);
      });
    }
}

module.exports = {
    products
}