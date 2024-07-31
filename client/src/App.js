import logo from "./logo.svg";
import "./App.css";
import Header from "../src/components/Layout/Header";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/route/PrivateRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/route/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./Search";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        {/* mine down one */}
        <Route path="/owner/:slug" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          {/* <Route path="homepage" element={<ShopPage />} /> */}
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route
            path="admin/create-product"
            element={<CreateProduct />}
          ></Route>
          <Route path="admin/product/:slug" element={<UpdateProduct />}></Route>
          <Route path="admin/products" element={<Products />}></Route>
          <Route path="admin/users" element={<Users />}></Route>
          <Route path="admin/orders" element={<AdminOrders />}></Route>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
