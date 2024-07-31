import express from "express";
import {
  getFilterShop,
  getShopController,
  getShopPhotoController,
  shopFilterController,
} from "../controllers/shopController.js";

const router = express.Router();

//get all shops

router.get("/get-shops", getShopController);

//get shop photo

router.get("/shop-photo/:pid", getShopPhotoController);

//filter shop

router.get("/get-filter-shops/:pin", getFilterShop);

router.post("/get-filter-category", shopFilterController);
export default router;
