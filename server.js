const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const {database} = require("./dbHelper");

const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

database.init();


app.get("/", (request, response) => {
  response.send("Use /products endpoint to retrieve existing products");
});

app.get("/ping", (request, response) => {
  response.send("pong");
});

app.get("/products",(request,response)=>{
    database.selectAllAtOnce((err,rows)=>{
        if(err){
            response.status(500);
            response.json({"message": "Something went wrong. Please try again, later."});
            return;
        }
        response.json(rows);
    });
});


// app.post("/products", (request, response) => {
//   console.log(`add to products ${JSON.stringify(request.body)}`);
//     const {name, description,price,available_units} = request.body;
//     if(!name || !description || typeof price !== "number" || typeof available_units !=="number"){
//         response.status(400);
//         response.json({"message":"the request should contain valid values for name, description, price and available_units"});
//         return;
//     }
//     const cleansedData = cleanInputData([name,description,price,available_units]);
//     db.run(`INSERT INTO tbl_product (name, description, price, available_units) VALUES (?,?,?,?)`, [...cleansedData], function(error) {
//         if (error) {
//             response.status(500);
//             response.json({ "message": "Failed to add product. Please try again." });
//             return;
//         }
//         response.json({"id":`${this.lastID}`});
//     });
// });

// app.get("/products/:id",(request,response)=>{
//   const productId = request.params.id;
//   const cleansedId = cleanInputData([productId]);
//   db.get(`SELECT * FROM tbl_product WHERE id = ?`, cleansedId, (error,row)=>{
//     if(error){
//       response.status(500);
//       response.json({ "message": "Failed to add product. Please try again." });
//       return;
//     }
//     if(row){
//       response.json(row);
//       return;
//     }
//     response.sendStatus(404);
//   });
// });

// app.patch("/products/:id",(request,response)=>{
//   const productId = request.params.id;
//   const cleansedId = cleanInputData([productId]);
//   db.get(`SELECT * FROM tbl_product WHERE id = ?`, cleansedId, (error,row)=>{
//     if(error){
//       response.status(500);
//       response.json({ "message": "Failed to modify product. Please try again." });
//       return;
//     }
//     if(!row){
//       response.sendStatus(404);
//       return;
//     }
    
//   });
// });

// // app.get("/deleteendpoint", (request, response) => {
// //     db.each(
// //       "SELECT * from Dreams",
// //       (err, row) => {
// //         console.log("row", row);
// //         db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
// //           if (row) {
// //             console.log(`deleted row ${row.id}`);
// //           }
// //         });
// //       },
// //       err => {
// //         if (err) {
// //           response.send({ message: "error!" });
// //         } else {
// //           response.send({ message: "success" });
// //         }
// //       }
// //     );
// // });


// const cleanInputData = function(inputDataArray) {
//   return inputDataArray.map((datum)=>{
//       if(typeof datum === "string"){
//           return datum.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//       }
//       return datum;
//   })
// };


var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});