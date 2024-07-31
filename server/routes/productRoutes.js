import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  codController,
  createProductController,
  deleteProductController,
  getProductController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import braintree from "braintree";

const router = express.Router();

//create product

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products

router.get("/get-product/:slug", getProductController);

//get single product

router.get("/single-product/:slug", singleProductController);

//get photo

router.get("/product-photo/:pid", productPhotoController);

//update product

router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//delete product

router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filter product

router.post("/product-filters", productFilterController);

// product count

router.get("/product-count", productCountController);

//product per page

router.get("/product-list/:page/:sname", productListController);

//search product

router.get("/search/:keyword", searchProductController);

//related product

router.get("/related-product/:pid/:cid", relatedProductController);

//payment route
//token

router.get("/braintree/token", braintreeTokenController);

//payment

router.post("/braintree/payment", requireSignIn, braintreePaymentController);

//cod

router.post("/cod", requireSignIn, codController);

export default router;
