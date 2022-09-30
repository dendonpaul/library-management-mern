import React, { useEffect, useState } from "react";
import Header from "../../pagecomps/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  //useState constants
  const [values, setValues] = useState({});
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
          {/* <span id="message_s">{messages}</span> */}
        </form>
      </div>
    </>
  );
};

export default EditBook;
