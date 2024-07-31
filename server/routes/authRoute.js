import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  registerAdminController,
  loginAdminController,
  deleteOrderController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

//router object

const router = express.Router();

//routing

//Register || Method post
//user
router.post("/register", registerController);
//admin

router.post("/register-admin", formidable(), registerAdminController);

//login route
//user login
router.post("/login", loginController);
//admin login
router.post("/admin-login", loginAdminController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//forgot password route

router.post("/forgot-password", forgotPasswordController);

//user protected route

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//admin protected route

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile

router.put("/profile", requireSignIn, updateProfileController);

//user orders

router.get("/orders", requireSignIn, getOrdersController);

//cancel order

router.delete("/delete-order/:oid", requireSignIn, deleteOrderController);

//all orders

router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//status update

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
