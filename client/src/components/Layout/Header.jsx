import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FcShop } from "react-icons/fc";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [categories] = useCategory();
  const [cart] = useCart();
  const logOutHandler = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logged out successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              {" "}
              <FcShop /> LocalLounge
            </Link>
            <ul className="navbar-nav ms-auto mb-2  mb-lg-0">
              <SearchInput />
              {auth?.user ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.role === 1
                      ? auth?.user?.shopname
                      : auth?.user?.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        DashBoard
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <></>
              )}

              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      aria-current="page"
                    >
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      onClick={logOutHandler}
                      className="nav-link"
                      aria-current="page"
                    >
                      LogOut
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link" aria-current="page">
                    Cart
                  </NavLink>
                </Badge>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/category"
                  className="nav-link"
                  aria-current="page"
                ></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
