import React, { useEffect, useState } from "react";
import Header from "../../pagecomps/Header";
import "../index.css";
import axios from "axios";

const IssueBook = () => {
  //useState Const
  const [values, setValues] = useState({});
  const [clients, setClients] = useState();
  const [books, setBooks] = useState();
  const [saved, setSaved] = useState(false);

  //handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //Fetch all clients on page load
  useEffect(() => {
    const allClients = axios
      .get("http://localhost:3001/api/users/listclients")
      .then((res) => {
        return setClients(res.data);
      });
  }, []);

  //Fetch all books with atleast 1 qty left
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/listbookswithqty")
      .then((res) => {
        setBooks(res.data.data);
        setSaved(false);
      });
  }, [saved]);

  //refresh page after saving issue to prevent -ve qty
  // if (saved) window.location = "/issuebook";

  //function to create options for clients
  if (!clients) return null;
  const clientList = clients.map((client) => {
    return (
      <option
        value={client._id}
      >{`${client.firstname} ${client.lastname}`}</option>
    );
  });

  //function to create option for books
  if (!books) return null;
  const bookList = books.map((book) => {
    return <option value={book._id}>{book.name}</option>;
  });

  //Handle Submission
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    const saveIssue = axios
      .post(
        `http://localhost:3001/api/users/issuebook/${values.client}/${values.book}`
      )
      .then((res) => {
        setSaved(true);
        return res;
      });
  };
  return (
    <>
      <Header />
      <div className="contents_container">
        <form className="input_form" id="addbook" onSubmit={submitHandler}>
          <select
            required
            name="client"
            id="client"
            value={values.client}
            onChange={handleChange}
          >
            <option value="">Select a user</option>
            {clientList}
          </select>
          <select
            required
            name="book"
            id="book"
            value={values.book}
            onChange={handleChange}
          >
            <option value="">Select a book</option>
            {bookList}
          </select>
          <button type="submit">Issue Book</button>
        </form>
      </div>
    </>
  );
};

export default IssueBook;
