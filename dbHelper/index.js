const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const {SELECT_ALL,CREATE_PRODUCTS_TABLE,SEED_INITIAL_DATA,ADD_PRODUCT,GET_PRODUCT_BY_ID} = require("./dbQueries");

const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const db = new sqlite3.Database(dbFile);

const database = {
    init: ()=>{
      db.serialize(() => {
        if (!exists) {
          database.createProductsTable();
          database.seedInitialData();
        } else {
          database.selectAll((row)=>console.log(`record: ${row.name}`));
        }
      });
    },
    selectAll: (callback)=>{
      db.each(SELECT_ALL,(err,row)=>{
        if(row){
          if(callback) callback(row);
        }
      })
    },
    selectAllAtOnce: (callback)=>{
      db.all(SELECT_ALL,(err,rows)=>callback(err,rows));
    },
    createProductsTable: ()=>{
      db.run(CREATE_PRODUCTS_TABLE);
      console.log("New table tbl_product created!");
    },
    seedInitialData: ()=>{
      db.serialize(() => db.run(SEED_INITIAL_DATA));
    },
    addProduct: (values)=>{
      return new Promise((resolve,reject)=>{
        db.run(ADD_PRODUCT,[...values],function(error){
          if(error) reject(error);
          resolve(this.lastID);
        });
      });
    },
    getById: (id)=>{
      return new Promise((resolve,reject)=>{
        db.get(GET_PRODUCT_BY_ID, id, (error,row)=>{
          if(error) reject(error);
          if(!row) reject({"customErrorCode":404});
          resolve(row);
        });
      })
    }
}



module.exports={
  database
}
