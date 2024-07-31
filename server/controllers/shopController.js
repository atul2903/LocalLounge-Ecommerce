import adminModel from "../models/adminModel.js";

export const getShopController = async (req, res) => {
  try {
    const shop = await adminModel.find({}).select("-photo");
    res.status(201).send({
      success: "true",
      shop,
      message: "all shops",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "cant get shops",
      error,
    });
  }
};

export const getShopPhotoController = async (req, res) => {
  try {
    const product = await adminModel.findById(req.params.pid).select("photo");
    //    console.log(product)
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "cant get photo",
      error,
    });
  }
};

//filtering shop by pincode

export const getFilterShop = async (req, res) => {
  try {
    const shops = await adminModel.find({ pincode: req.params.pin });
    res.status(201).send({
      success: true,
      message: "filtered shops",
      shops,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "cant filter by location",
      error,
    });
  }
};

//filtering shop by categories

export const shopFilterController = async (req, res) => {
  try {
    const { radio } = req.body;
    let args = {};

    if (radio.length) args.name = radio;
    const products = await adminModel.find({ shopname: { $regex: radio } });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: error.message,
    });
  }
};
