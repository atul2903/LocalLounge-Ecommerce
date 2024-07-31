import productModel from "../models/productModel.js";
import fs, { readSync } from "fs";
import slugify from "slugify";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import { error } from "console";

//payment gateway

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
      sname,
    } = req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });

      case !sname:
        return res.status(500).send({ error: "shop-name is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });

      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is required and should be less than 1mb" });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(201).send({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in creating product",
    });
  }
};

//get all products

export const getProductController = async (req, res) => {
  try {
    const slugi = req.params.slug;
    const product = await productModel
      .find({ sname: slugi })
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
      .populate("category");
    res.status(200).send({
      success: true,
      total: product.length,
      product,
      message: "this are all products",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "unable to get all products",
    });
  }
};

//single produt get

export const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      product,
      message: "this is the product you searched for",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "unable to get single product",
    });
  }
};

//get photo

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    //    console.log(product)
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "cant get photo",
    });
  }
};

//delete product

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete product",
      error,
    });
  }
};

//update product

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });

      case !description:
        return res.status(500).send({ error: "description is required" });

      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      // case !photo :
      //   return res.status(500).send({ error: "photo is required and should be less than 1mb" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(201).send({
      success: true,
      message: "product upated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "cant update product",
    });
  }
};

//filter product

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
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

//product count

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();

    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "product count is not working",
    });
  }
};

//product per page

export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const shopname = req.params.sname;
    console.log(shopname);
    const product = await productModel
      .find({ sname: shopname })
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in product per page",
    });
  }
};

//search product controller

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: error.message,
    });
  }
};

//related product

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "cant get realted product",
    });
  }
};

//payment

//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, result) {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => (total += i.price));
    let transaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (err, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          });
          await order.save();
          res.json({ order: order });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const codController = async (req, res) => {
  try {
    const { cart } = req.body;
    let total = 0;
    cart.map((i) => (total += i.price));
    const order = new orderModel({
      products: cart,
      payment: "cash on delivery",
      buyer: req.user._id,
    });
    await order.save();
    res.json({ order: order });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error,
    });
  }
};
