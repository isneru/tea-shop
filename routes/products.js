const express = require("express");
const router = express.Router();
const products = require("../controllers/products");
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  isOwner,
  validateProduct,
  isAdmin,
} = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Product = require("../models/product");

router
  .route("/")
  .get(catchAsync(products.index))
  .post(
    isAdmin,
    isLoggedIn,
    upload.array("image"),
    validateProduct,
    catchAsync(products.createProduct)
  );

router.get("/new", isAdmin, isLoggedIn, products.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(products.showProduct))
  .put(
    isLoggedIn,
    isOwner,
    upload.array("image"),
    validateProduct,
    catchAsync(products.updateProduct)
  )
  .delete(isLoggedIn, isOwner, catchAsync(products.deleteProduct));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  catchAsync(products.renderEditForm)
);

module.exports = router;
