const {database} = require("../dbHelper");
const {INTERNAL_SERVER_ERROR} = require("../utils/errorMessages");


const products = {
    getAll: (request,response,next)=>{
      database.selectAllAtOnce((err,rows)=>{
        if(err){
          response.status(500).json({"message":INTERNAL_SERVER_ERROR});
        }
        response.json(rows);
        next();
      });
    }
}

module.exports = {
    products
}