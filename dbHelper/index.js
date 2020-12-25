const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const {SELECT_ALL,CREATE_PRODUCTS_TABLE,SEED_INITIAL_DATA} = require("./dbQueries");

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
    createProductsTable: ()=>{
      db.run(CREATE_PRODUCTS_TABLE);
      console.log("New table tbl_product created!");
    },
    seedInitialData: ()=>{
      db.serialize(() => db.run(SEED_INITIAL_DATA));
    }
}



module.exports={
  database
}
