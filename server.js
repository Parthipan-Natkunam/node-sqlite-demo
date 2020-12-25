const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  if (!exists) {
    db.run(
      "CREATE TABLE tbl_product (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL, available_units INTEGER)"
    );
    console.log("New table tbl_product created!");

    db.serialize(() => {
      db.run(
        'INSERT INTO tbl_product (name,description,price,available_units) VALUES ("Yamaha Acoustic Guitar", "Acoustic guitar with steel strings. Great choice for beginners and intermediate users.", 450.80, 5), ("Coffe Mug","Porcelain mugs with beautiful hand-drawn paintings and vibrant colours", 40.99, 15)'
      );
    });
  } else {
    db.each("SELECT * from tbl_product", (err, row) => {
      if (row) {
        console.log(`record: ${row.name}`);
      }
    });
  }
});


app.get("/", (request, response) => {
  response.send("Use /products endpoint to retrieve existing products");
});

app.get("/ping", (request, response) => {
  response.send("pong");
});

app.get("/products",(request,response)=>{
    db.all("SELECT * FROM tbl_product",(err,rows)=>{
        if(err){
            response.status(500);
            response.json({"message": "Something went wrong. Please try again, later."});
            return;
        }
        response.json(rows);
    });
});


app.post("/products", (request, response) => {
  console.log(`add to products ${JSON.stringify(request.body)}`);
    const {name, description,price,available_units} = request.body;
    if(!name || !description || typeof price !== "number" || typeof available_units !=="number"){
        response.status(400);
        response.json({"message":"the request should contain valid values for name, description, price and available_units"});
        return;
    }
    const cleansedData = cleanInputData([name,description,price,available_units]);
    db.run(`INSERT INTO tbl_product (name, description, price, available_units) VALUES (?,?,?,?)`, [...cleansedData], function(error) {
        if (error) {
            response.status(500);
            response.json({ "message": "Failed to add product. Please try again." });
            return;
        }
        response.json({"id":`${this.lastID}`});
    });
});

// app.get("/deleteendpoint", (request, response) => {
//     db.each(
//       "SELECT * from Dreams",
//       (err, row) => {
//         console.log("row", row);
//         db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
//           if (row) {
//             console.log(`deleted row ${row.id}`);
//           }
//         });
//       },
//       err => {
//         if (err) {
//           response.send({ message: "error!" });
//         } else {
//           response.send({ message: "success" });
//         }
//       }
//     );
// });


const cleanInputData = function(inputDataArray) {
  return inputDataArray.map((datum)=>{
      if(typeof datum === "string"){
          return datum.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      return datum;
  })
};


var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});