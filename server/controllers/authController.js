import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import fs, { readSync } from "fs";
import JWT from "jsonwebtoken";
import adminModel from "../models/adminModel.js";
import slugify from "slugify";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, pincode, answer } = req.body;

    //validation
    if (!name) {
      res.send({ message: "name is required" });
    }

    if (!email) {
      res.send({ message: "email is required" });
    }
    if (!password) {
      res.send({ message: "password is required" });
    }
    if (!phone) {
      res.send({ message: "phone number is required" });
    }
    if (!address) {
      res.send({ message: "address is required" });
    }

    if (!pincode) {
      res.send({ message: "pincode is required" });
    }

    if (!answer) {
      res.send({ message: "answer is required" });
    }
    //check user

    const existinguser = await userModel.findOne({ email });

    //existing user

    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "email already in use",
      });
    }

    //registering new user

    const hashedPassword = await hashPassword(password);

    //savr user

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      pincode,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "user registered succesfully",
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error in registration",
      e,
    });
  }
};

//register admin

export const registerAdminController = async (req, res) => {
  try {
    const { shopname, email, password, phone, address, pincode, answer } =
      req.fields;

    const { photo } = req.files;

    //validation
    if (!shopname) {
      return res.send({ message: "shop-name is required" });
    }

    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone number is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }

    if (!pincode) {
      return res.send({ message: "pincode is required" });
    }
    if (!photo && photo.size > 1000000) {
      return res.send({
        message: "photo is required and should be less than 1 mb",
      });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }
    //check user

    const existinguser = await adminModel.findOne({ email });

    //existing user

    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "email already in use",
      });
    }

    //registering new user

    const hashedPassword = await hashPassword(password);

    //savr user

    const user = await new adminModel({
      shopname,
      email,
      password: hashedPassword,
      phone,
      address,
      pincode,
      answer,
      slug: slugify(shopname),
    });
    if (photo) {
      user.photo.data = fs.readFileSync(photo.path);
      user.photo.contentType = photo.type;
    }
    await user.save();

    res.status(201).send({
      success: true,
      message: "user(admin) registered succesfully",
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error in registration",
      e,
    });
  }
};

//POST Login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "wrong password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "logged in succesfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        slug: user.slug,
      },
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error in login",
      e,
    });
  }
};

//admin login

export const loginAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    //check user
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "wrong password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "logged in succesfully",
      user: {
        shopname: user.shopname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        slug: user.slug,
      },
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error in login",
      e,
    });
  }
};
export const testController = (req, res) => {
  res.send("protected routes");
};

// forgot password controller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;
    if (!email) {
      res.status(401).send({
        success: false,
        message: "email is not provided",
      });
    }

    if (!answer) {
      res.status(401).send({
        success: false,
        message: "answer is not provided",
      });
    }

    if (!newpassword) {
      res.status(401).send({
        success: false,
        message: "new password is not provided",
      });
    }

    //check

    const user = await userModel.findOne({ email, answer });

    //validation

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email or answer",
      });
    }

    const hashed = await hashPassword(newpassword);

    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "password reset completed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

//update profile

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, pincode, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password

    if (password && password.length < 6) {
      return res.json({
        error: "password is required and should be 6 characters long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        pincode: pincode || user.pincode,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "user updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      success: "false",
      message: error.message,
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "cant get user orders",
      error,
    });
  }
};

//cancel order

export const deleteOrderController = async (req, res) => {
  try {
    const id = req.params.oid;
    const data = await orderModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "order cancelled",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "cant cancel order",
      error,
    });
  }
};

//all orders

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "cant get user orders",
      error,
    });
  }
};

//order status

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};
