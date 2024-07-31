import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { Categories } from "../components/Categories";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const ShopPage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [pincode, setPincode] = useState("");

  //get all products

  const getAllShops = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/owner/get-shops`
      );
      setLoading(false);
      setProducts(data.shop);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("cant get all products");
    }
  };

  useEffect(() => {
    getAllShops();
  }, []);
  //filter bt cat

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const handleShopFilter = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/owner/get-filter-shops/${pincode}`
    );
    setLoading(false);
    setProducts(data.shops);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/owner/get-filter-category`,
        { radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("cant filter the products");
    }
  };

  useEffect(() => {
    if (radio.length) filterProduct();
  }, [radio]);
  const shopHandler = () => {
    if (pincode.length === 6) handleShopFilter();
    else toast.error("enter a valid pincode");
  };

  useEffect(() => {
    if (!pincode.length || !radio.length) getAllShops();
  }, [pincode.length, radio.length]);

  return (
    <div>
      <Layout>
        <div className="row mt-3">
          <div className="col-md-3">
            <h5 className="text-center">Filter Shops By Location</h5>
            <div className="d-flex flex-column gap-3">
              {/* {categories?.map((e) => (
                <Checkbox
                  key={e._id}
                  onChange={(c) => handleFilter(c.target.checked, e._id)}
                >
                  {e.name}
                </Checkbox>
              ))} */}
              <input
                type="text"
                placeholder="enter pincode"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              ></input>
              <button className="btn btn-primary" onClick={shopHandler}>
                search
              </button>
            </div>

            <h5 className="text-center mt-4">Filter By Prices</h5>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(a) => setRadio(a.target.value)}>
                {Categories?.map((e) => (
                  <div key={e._id}>
                    <Radio value={e.name}>{e.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All Shops</h1>

            <div className="d-flex flex-wrap gap-4">
              {products.map((e) => (
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  key={e._id}
                  onClick={() => {
                    navigate(`/owner/${e.slug}`);
                  }}
                >
                  {
                    <img
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API}/api/v1/owner/shop-photo/${e._id}`}
                      alt={e.name}
                      height={"180px"}
                    />
                  }
                  <div className="card-body">
                    <h5 className="card-title">{e.shopname}</h5>
                    <p className="card-text">{e.address}</p>
                    <p className="card-text">{`${e.phone}`}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "LoadMore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ShopPage;
