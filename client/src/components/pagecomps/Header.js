import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header_container">
      <div className="header_left">
        <p>Library Management System</p>
      </div>
      <div className="header_right">
        <ul className="menu">
          <li>
            <Link to="/allclients">
              <button>View Clients</button>
            </Link>
          </li>
          <li>
            <Link to="/addclient">
              <button>Add Client</button>
            </Link>
          </li>
          <li>
            <Link to="/allbooks">
              <button>View Books</button>
            </Link>
          </li>
          <li>
            <Link to="/addbook">
              <button>Add Book</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
