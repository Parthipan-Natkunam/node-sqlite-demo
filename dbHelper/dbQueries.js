const SELECT_ALL = "SELECT * from tbl_product";
const CREATE_PRODUCTS_TABLE =
  "CREATE TABLE tbl_product (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL, available_units INTEGER)";
const SEED_INITIAL_DATA =
  'INSERT INTO tbl_product (name,description,price,available_units) VALUES ("Yamaha Acoustic Guitar", "Acoustic guitar with steel strings. Great choice for beginners and intermediate users.", 450.80, 5), ("Coffe Mug","Porcelain mugs with beautiful hand-drawn paintings and vibrant colours", 40.99, 15)';
const ADD_PRODUCT = `INSERT INTO tbl_product (name, description, price, available_units) VALUES (?,?,?,?)`;
const GET_PRODUCT_BY_ID = `SELECT * FROM tbl_product WHERE id = ?`;
const CHECK_IF_ID_EXISTS = `SELECT EXISTS (SELECT id FROM tbl_product WHERE id = ?)`;
const UPDATE_PRODUCT_BY_ID = `UPDATE tbl_product SET name = ? , description = ? , price = ?, available_units = ? WHERE id = ?`;
const DELETE_PRODUCT_BY_ID = `DELETE FROM tbl_product WHERE id = ?`;

module.exports = {
  SELECT_ALL,
  CREATE_PRODUCTS_TABLE,
  SEED_INITIAL_DATA,
  ADD_PRODUCT,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  CHECK_IF_ID_EXISTS,
  DELETE_PRODUCT_BY_ID,
};
