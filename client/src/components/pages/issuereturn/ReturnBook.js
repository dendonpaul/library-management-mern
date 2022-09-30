import React from "react";
import Header from "../../pagecomps/Header";
import "../index.css";

const ReturnBook = () => {
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
          <tbody>
            <tr>
              <td>Denny</td>
              <td>HP1</td>
              <td>29-4-1991</td>
              <td>5</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReturnBook;
