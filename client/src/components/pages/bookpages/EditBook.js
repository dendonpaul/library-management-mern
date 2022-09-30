import React, { useEffect, useState } from "react";
import Header from "../../pagecomps/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  //useState constants
  const [values, setValues] = useState({});
  const [messages, setMessages] = useState();
  const [categories, setCategories] = useState([]);

  //get the book id from URL
  const { id } = useParams();

  //handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //Handle submission
  const handleSubmission = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`http://localhost:3001/api/users/editbook/${id}`, values)
        .then((res) => res);
    } catch (err) {
      return err;
    }
  };

  //fetch single book details on page load
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/getbookdetails/${id}`)
      .then((res) => setValues(res.data.message));
  }, []);

  //Fetch category list from Books Model
  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/api/users/getcategories")
        .then((res) => setCategories(res.data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  // map cats and create a loop
  const displayCats = categories.map((cats, index) => {
    return (
      <option key={index} value={cats}>
        {cats}
      </option>
    );
  });

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
        .delete(`http://localhost:3001/api/users/deletebook/${id}`)
        .then((res) => {
          setMessages(res.data[0]);
          window.location = "/allbooks";
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="contents_container">
        <form className="input_form" onSubmit={handleSubmission} id="addbook">
          <h1>Edit book</h1>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Enter Book Name"
            value={values.name}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            id="author"
            name="author"
            placeholder="Enter Author Name"
            value={values.author}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            id="description"
            name="description"
            placeholder="Enter Description"
            value={values.description}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            id="isbn"
            name="isbn"
            placeholder="Enter ISBN"
            value={values.isbn}
            onChange={handleChange}
          />
          <select
            required
            id="cat"
            name="cat"
            value={values.cat}
            onChange={handleChange}
          >
            {displayCats}
          </select>

          <input
            required
            type="number"
            id="copies"
            name="copies"
            placeholder="Enter Qty"
            value={values.copies}
            onChange={handleChange}
          />
          <button type="submit">Save Book</button>
          <button type="button" onClick={handleDelete}>
            Delete Book
          </button>
          {/* <span id="message_s">{messages}</span> */}
        </form>
      </div>
      //delete model
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>Are you sure to delete the Book</p>
          <button type="button" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBook;
