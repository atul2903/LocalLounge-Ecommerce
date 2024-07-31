import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import cors from "cors";
//rest object

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/owner", shopRoutes);
//config
dotenv.config();

//database config;
connectDB();

//rest api

app.get("/", (req, res) => {
  res.send("<h1>jai shree ram</h1>");
});

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
