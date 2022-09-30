import React, { useEffect, useState } from "react";
import Header from "../../pagecomps/Header";
import "../index.css";
import axios from "axios";

const ReturnBook = () => {
  const [values, setValues] = useState({});
  const [issued, setIssued] = useState([]);
  const [saved, setSaved] = useState(false);

  //submitHandler
  const submitHandler = (issueid) => {
    const returnBook = axios
      .post(`http://localhost:3001/api/users/returnbook/${issueid}`)
      .then((res) => {
        setSaved(true);
        return res;
      });
  };
  if (saved) window.location.reload();

  //fetch the details from issue model during page load
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/issuedlist")
      .then((res) => setIssued(res.data));
  }, []);

  //create loop for issued books
  if (!issued) return null;
  const issuedBooks = issued.map((data) => {
    //Date converter
    const convertDate = (data) => {
      const date = new Date(data);
      return date.toLocaleDateString();
    };

    //days calculator
    const totalDays = (data) => {
      const tdata = Date.now();
      const idata = Date.parse(data);
      const diff = tdata - idata;
      return Math.floor(diff / (24 * 60 * 60 * 1000));
    };
    return (
      <tr key={data._id}>
        <td align="center">
          {data.client.firstname} {data.client.lastname}
        </td>
        <td align="center">{data.book.name}</td>
        <td align="center">{convertDate(data.createdAt)}</td>
        <td align="center">{totalDays(data.createdAt)}</td>
        <td>
          <button type="button" onClick={() => submitHandler(data._id)}>
            Return
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header />
      <div className="contents_container">
        <table className="allbooks">
          <thead>
            <tr>
              <td>Client</td>
              <td>Book Issued</td>
              <td>Issued Date</td>
              <td>Total Days</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{issuedBooks}</tbody>
        </table>
      </div>
    </>
  );
};

export default ReturnBook;
