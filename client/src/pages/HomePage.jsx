import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
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

  //
  const { slug } = useParams();
  //get all products

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}/${slug}`
      );
      setLoading(false);
      setProducts(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("cant get all products");
    }
  };

  // get all categoris
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
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

  //get total count

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //loadmore

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.product]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //get filter products

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("cant filter the products");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  return (
    <div>
      <Layout>
        <div className="row mt-3">
          <div className="col-md-3">
            {/* <h5 className="text-center">Filter By Category</h5>
            <div className="d-flex flex-column">
              {categories?.map((e) => (
                <Checkbox
                  key={e._id}
                  onChange={(c) => handleFilter(c.target.checked, e._id)}
                >
                  {e.name}
                </Checkbox>
              ))}
            </div> */}

            <h5 className="text-center mt-4">Filter By Prices</h5>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(a) => setRadio(a.target.value)}>
                {Prices?.map((e) => (
                  <div key={e._id}>
                    <Radio value={e.array}>{e.name}</Radio>
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
            <h1 className="text-center">All Products</h1>

            <div className="d-flex flex-wrap gap-4">
              {products.map((e) => (
                <div className="card" style={{ width: "18rem" }} key={e._id}>
                  <img
                    className="card-img-top"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${e._id}`}
                    alt={e.name}
                    height={"180px"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text">{e.description}</p>
                    <p className="card-text">{`₹${e.price}`}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${e.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, e]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, e])
                        );

                        toast.success("item added succesfully");
                      }}
                    >
                      Add to Cart
                    </button>
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

export default HomePage;
