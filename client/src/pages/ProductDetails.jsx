import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRealtedProducts] = useState([]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  //get similar product

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRealtedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-md-6">
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name:{product.name}</h6>
          <h6>Description:{product.description}</h6>
          <h6>Price:{product.price}</h6>
          <h6>Category:{product?.category?.name}</h6>
          <button className="btn btn-secondary ms-2">Add to Cart</button>
        </div>
      </div>
      <div className="row">
        <h1 className="text-center">Similar Products</h1>
        {relatedProducts.length}
        <div className="d-flex gap-4">
          {relatedProducts.map((e) => (
            <Link to={`/product/${e.slug}`} className="product-link">
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
    </Layout>
  );
};

export default ProductDetails;
