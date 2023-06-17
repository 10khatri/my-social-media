import React from "react";
import styles from "../Styles/Navigation.module.css";
export default function Navigation() {
  return (
    <div className={styles.navigation_container}>
      <button>Home</button>
      <button>Explore</button>
      <button>Bookmarks</button>
      <button>Liked Posts</button>
      <button>Posts</button>
    </div>
  );
}
