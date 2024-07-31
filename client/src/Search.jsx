import React from "react";
import Layout from "./components/Layout/Layout";
import { useSearch } from "./context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values.results.length}`}
          </h6>
          {values.results.map((e) => (
            <div className="card" style={{ width: "18rem" }} key={e._id}>
              <img
                className="card-img-top"
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${e._id}`}
                alt={e.name}
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
                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
