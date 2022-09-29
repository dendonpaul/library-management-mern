import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../pagecomps/Header";
import "../index.css";

const AllBooks = () => {
  //useState constants
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetch books when loading the page
  useEffect(() => {
    axios.get("http://localhost:3001/api/users/listbooks").then((res) => {
      setLoading(true);
      setDatas(res.data.data);
    });
  }, []);

  if (!datas) return null;
  console.log(datas);

  const bookList = datas.map((data) => {
    return (
      <tr>
        <td align="center">{data.name}</td>
        <td align="center">{data.author}</td>
        <td align="center">{data.description}</td>
        <td align="center">{data.isbn}</td>
        <td align="center">{data.cat}</td>
        <td align="center">{data.copies}</td>
        <td align="center">
          <Link to={`/editbook/${data._id}`}>
            <button>Edit</button>
          </Link>
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
              <td>Name</td>
              <td>Author</td>
              <td>Description</td>
              <td>ISBN</td>
              <td>Category</td>
              <td>Qty</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{bookList}</tbody>
        </table>
      </div>
    </>
  );
};

export default AllBooks;
