const {database} = require("../dbHelper");
const CustomError = require("../utils/customError");


const products = {
    getAll: ()=>{
      return new Promise((resolve,reject)=>{
        database.selectAllAtOnce((err,rows)=>{
          if(err){
            reject(new CustomError (500));
          }
          resolve(rows);
        });
      });
    }
}

module.exports = {
    products
}