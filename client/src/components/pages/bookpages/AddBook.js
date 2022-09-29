import React, { useEffect, useState } from "react";
import Header from "../../pagecomps/Header";
import "../index.css";
import axios from "axios";

const AddBook = () => {
  //useState consts
  const [values, setValues] = useState({
    name: "",
    author: "",
    description: "",
    isbn: "",
    cat: "Romance",
    copies: "",
  });
  const [messages, setMessages] = useState();
  const [categories, setCategories] = useState([]);

  //Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //Submission Handler
  const handleSubmission = (e) => {
    e.preventDefault();
    const saveBook = () => {
      try {
        axios
          .post("http://localhost:3001/api/users/addbook", values)
          .then((res) => setMessages(res.data.message));
      } catch (err) {
        return err;
      }
    };
    saveBook();
  };

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

  return (
    <>
      <Header />
      <div className="contents_container">
        <form className="input_form" onSubmit={handleSubmission} id="addbook">
          <h1>Add a new book</h1>
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
            type="text"
            id="copies"
            name="copies"
            placeholder="Enter Qty"
            value={values.copies}
            onChange={handleChange}
          />
          <button type="submit">Save Book</button>
          <span id="message_s">{messages}</span>
        </form>
      </div>
    </>
  );
};

export default AddBook;
