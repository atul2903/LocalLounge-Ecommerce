import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setname] = useState("");
  const [shopname, setshopname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const [photo, setPhoto] = useState("");
  //user register
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, pincode, answer }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  //admin register
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("shopname", shopname);
    productData.append("photo", photo);
    productData.append("email", email);
    productData.append("password", password);
    productData.append("phone", phone);
    productData.append("address", address);
    productData.append("pincode", pincode);
    productData.append("answer", answer);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register-admin`,
        productData
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  //test

  const [alignment, setAlignment] = React.useState("User");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Layout>
      <div className="register">
        <h1>Register</h1>

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
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
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

            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPhone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                PinCode
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAnswer" className="form-label">
                What is your Favourite Sport (used as a password reset question)
                <br></br>
                <i>*It is Case Sensitive</i>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAnswer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        ) : (
          <form onSubmit={handleAdminSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputShopName" className="form-label">
                Shop Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputShopName"
                value={shopname}
                onChange={(e) => setshopname(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo1"
                  id="/image/"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
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

            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPhone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                PinCode
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAnswer" className="form-label">
                What is your Favourite Sport (used as a password reset question)
                <br></br>
                <i>*It is Case Sensitive</i>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputAnswer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Register;
