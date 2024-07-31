import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const Login = () => {
  const [alignment, setAlignment] = React.useState("User");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        navigate(location.state || "/");

        localStorage.setItem("auth", JSON.stringify(res.data));

        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-login`,
        { email, password }
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        navigate(location.state || "/");

        localStorage.setItem("auth", JSON.stringify(res.data));

        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Layout>
      <div className="register">
        <h1>Login</h1>
        <div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="User">User</ToggleButton>
            <ToggleButton value="Shop Owner">Shop Owner</ToggleButton>
          </ToggleButtonGroup>
        </div>
        {alignment === "User" ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>

            <div className="login-btn">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => navigate("/forgot-password")}
              >
                Forgot Password
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAdminSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>

            <div className="login-btn">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => navigate("/forgot-password")}
              >
                Forgot Password
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Login;
