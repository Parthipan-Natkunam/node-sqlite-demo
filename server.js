const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const {database} = require("./dbHelper");
const {productsController, defaultController} = require("./controller");
const {productsValidator,securityUtils} = require("./middleware");
const { products } = require("./controller/products");

const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

database.init();


app.get("/", defaultController.handleRoot);

app.get("/ping", defaultController.healthCheck);

app.get("/products",productsController.getAll);

app.post("/products",[productsValidator.validateAddProductObject,securityUtils.cleanProductRequestData],products.addItem);


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


const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});