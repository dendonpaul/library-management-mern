import React from "react";
import "../index.css";
import Header from "../../pagecomps/Header";
import { useState } from "react";
import axios from "axios";

const AddClient = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    userType: "student",
  });
  const [messages, setMessages] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    const saveuser = () => {
      try {
        axios
          .post("http://localhost:3001/api/users/addclient", values)
          .then((response) => {
            setMessages(response.data.message);
          });
      } catch (err) {
        return err;
      }
    };

    saveuser();
  };
  return (
    <>
      <Header />
      <div className="contents_container">
        <form className="input_form" onSubmit={handleSubmission} id="adduser">
          <h1>Add a new Client</h1>
          <input
            required
            id="firstname"
            type="text"
            name="firstname"
            placeholder="FirstName"
            value={values.firstname}
            onChange={handleChange}
          />
          <input
            required
            id="lastname"
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={values.lastname}
            onChange={handleChange}
          />
          <input
            required
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            required
            id="mobile"
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={values.mobile}
            onChange={handleChange}
          />
          {/* <input
            type="text"
            placeholder="student"
            name="userType"
            value={values.userType}
            onChange={handleChange}
          /> */}
          <select
            placeholder="student"
            name="userType"
            value={values.userType == "" ? "student" : values.userType}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button type="submit">Save Client</button>
          <span id="message_s">{messages}</span>
        </form>
      </div>
    </>
  );
};

export default AddClient;
