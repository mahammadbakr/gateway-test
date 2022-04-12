const express = require("express");

const { createProduct, updateProduct, deleteProduct, getProducts } = require("../controllers/products");
const advancedResults = require("../middleware/advancedResults");
const Product = require("../models/product");

const router = express.Router();

// router.post('/createProduct', protect, authorize('SUPERADMIN'), createProduct)
router
  .post("/createProduct", createProduct)
  .patch("/updateProduct/:productId", updateProduct)
  .delete("/deleteProduct/:productId", deleteProduct)
  .get("/products", advancedResults(Product), getProducts);

module.exports = router;
