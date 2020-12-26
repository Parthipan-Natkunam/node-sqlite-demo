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
    },
    addItem: async (request,response,next) =>{
      const {name, description,price,available_units} = request.body;
      values= [name, description,price,available_units];
      try{
        const addedProductId = await database.addProduct(values);
        response.json({"id": addedProductId});
      }catch(error){
        response.status(500).json({"message":INTERNAL_SERVER_ERROR});
      }
      next();
    }
}

module.exports = {
    products
}