import React from "react";
import styles from "../Styles/Navigation.module.css";
import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <div className={styles.navigation_container}>
      <Link to="/">
        {" "}
        <button>Home</button>
      </Link>
      <Link to="/explore">
        <button>Explore</button>
      </Link>
      <Link to="/bookmark">
        {" "}
        <button>Bookmarks</button>
      </Link>
      <Link to="/liked">
        {" "}
        <button>Liked Posts</button>
      </Link>
    </div>
  );
}
