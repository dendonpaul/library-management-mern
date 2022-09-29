import React, { useEffect } from "react";
import "../index.css";
import Header from "../../pagecomps/Header";
import { useState } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";

const EditClient = () => {
  const [values, setValues] = useState({});
  const [messages, setMessages] = useState();

  //Update the input field values and store them in state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //Get the id parameter from URL
  const { id } = useParams();

  // save the updated single client data
  const handleSubmission = (e) => {
    e.preventDefault();
    const saveuser = () => {
      try {
        axios
          .put(`http://localhost:3001/api/users/editclient/${id}`, values)
          .then((response) => {
            setMessages(response.message);
          });
      } catch (err) {
        return console.log(err.response.data);
      }
    };
    saveuser();
  };

  //Fetch the single client details when the edit page is loaded
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3001/api/users/clientdetails/${id}`)
        .then((res) => {
          setValues(res.data[0]);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  //open delete confirmation popup
  const handleDelete = (e) => {
    e.preventDefault();
    // Get the modal
    let modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  };

  //Delete user after confirmation
  const deleteHandler = () => {
    try {
      axios
        .delete(`http://localhost:3001/api/users/deleteclient/${id}`)
        .then((res) => {
          setMessages(res.data[0]);
          window.location = "/allclients";
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="contents_container">
        <form className="input_form" onSubmit={handleSubmission} id="adduser">
          <h1>Edit Client</h1>
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
            value={values.userType === "" ? "student" : values.userType}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button type="submit">Save Client</button>
          <button type="button" onClick={handleDelete}>
            Delete User
          </button>
          <span id="message_s">{messages}</span>
        </form>
      </div>
      //delete model
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>Are you sure to delete the user</p>
          <button type="button" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditClient;
