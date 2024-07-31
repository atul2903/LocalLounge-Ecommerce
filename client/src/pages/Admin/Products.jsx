import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Products = () => {
  const [product, setProduct] = useState([]);
  //get all products
  const [auth, setAuth] = useAuth();
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${auth?.user?.slug}`
      );
      setProduct(data.product);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //lifecycle method

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex gap-4">
            {product.map((e) => (
              <Link
                to={`/dashboard/admin/product/${e.slug}`}
                className="product-link"
              >
                <div className="card" style={{ width: "18rem" }} key={e._id}>
                  <img
                    className="card-img-top"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${e._id}`}
                    alt={e.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text">{e.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
