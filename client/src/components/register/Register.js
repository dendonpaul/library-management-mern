import React from "react";
import "./register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/api/users/register", values)
        .then((res) => {
          console.log(res);
        });
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sign in
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={submitHandler}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Firstname"
              value={values.firstname}
              name="firstname"
              onChange={onChangeHandle}
            />
            <input
              type="text"
              placeholder="Lastname"
              value={values.lastname}
              name="lastname"
              onChange={onChangeHandle}
            />
            <input
              type="email"
              placeholder="Email"
              value={values.email}
              name="email"
              onChange={onChangeHandle}
            />
            <input
              type="password"
              placeholder="Password"
              value={values.password}
              name="password"
              onChange={onChangeHandle}
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              value={values.re_password}
              name="re_password"
              onChange={onChangeHandle}
            />
            <button type="submit" className="green_btn">
              Register
            </button>
            {errors && <span className="error_msg">{errors}</span>}
            <span className="err_msgs"></span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
