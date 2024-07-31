import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstace] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((i) => (total += i.price));
      return `₹ ${total}`;
    } catch (error) {}
  };

  //delete item

  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payemnt gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment done successfully");
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  //handle cod

  const handleCod = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/cod`,
        { cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment mode : Cash on Delivery");
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `you have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart.map((p) => {
              return (
                <div className="row m-2 card flex-row">
                  <div className="col-md-4">
                    <img
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      height={"180px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <h4>{p.name}</h4>
                    <p>{p.description}</p>

                    <h4>Price :{p.price}</h4>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            Total | Checkout | Payment
            <hr></hr>
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  {" "}
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstace(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                  <>
                    <br></br>
                    OR
                    <br></br>
                    <button onClick={handleCod} className="btn btn-primary">
                      Cash On Delivery
                    </button>
                  </>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
