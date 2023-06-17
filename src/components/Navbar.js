import React from "react";
import Styles from "../Styles/Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={Styles.navbar}>
      <Link to="/">
        <h1>SPIRIT</h1>
      </Link>
      <input placeholder="search user" type="text" />

      <Link to={`/profile/${user?._id}`}>user</Link>

      <Link to="/mock">mo</Link>
    </div>
  );
}
