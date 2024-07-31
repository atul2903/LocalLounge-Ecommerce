import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelHandler = async (id) => {
    try {
      let data = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-order/${id}`
      );
      toast.success("order cancelled successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("cant cancel order");
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col md-3">
            <UserMenu />
          </div>
          <div className="col md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        {o?.status === "Delivered" ? (
                          ""
                        ) : (
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => cancelHandler(o?._id)}
                            >
                              Cancel
                            </button>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => {
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
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
