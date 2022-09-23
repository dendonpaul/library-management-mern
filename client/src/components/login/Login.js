import React from "react";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/api/users/login", values)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", JSON.stringify(res.data));
        });
      window.location = "/";
    } catch (err) {
      setErrors(err.response.data.message);
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <h1>New Here?</h1>
          <Link to="/register">
            <button type="button" className="white_btn">
              Sign in
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={submitHandler}>
            <h1>Login</h1>

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

            <button type="submit" className="green_btn">
              Login
            </button>
            {errors && <span className="error_msg">{errors}</span>}
            <span className="err_msgs"></span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
