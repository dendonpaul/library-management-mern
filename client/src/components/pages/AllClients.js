import React, { useEffect, useState } from "react";
import Contents from "../pagecomps/Contents";
import Header from "../pagecomps/Header";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const AllClients = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  //   const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
  const baseURL = "http://localhost:3001/api/users/listclients";
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setLoading(false);
      setData(response.data);
    });
  }, []);

  if (!data) return null;

  const clientList = data.map((element) => {
    return (
      <tr>
        <td align="center">{element.firstname + element.lastname}</td>
        <td align="center">{element.email}</td>
        <td align="center">{element.mobile}</td>
        <td align="center">{element.userType}</td>
        <td align="center">
          <Link to={`/editclient/${element._id}`}>
            <button>Edit</button>
          </Link>
          <Link to={`/deleteclient/${element._id}`}>
            <button>Delete</button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header />
      <div className="contents_container">
        <table className="allclients">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Client Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{clientList}</tbody>
        </table>
      </div>
    </>
  );
};

export default AllClients;
