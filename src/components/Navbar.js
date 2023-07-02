import React, { useState } from "react";
import Styles from "../Styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { users } from "../backend/db/users";
import Select from "react-select";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };

  const handleSearchInputChange = (inputValue) => {
    const results = users
      .filter((user) =>
        user.fullName.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((user) => ({
        value: user._id,
        label: user.fullName,
      }));

    setSearchResults(results);
  };

  return (
    <div className={Styles.navbar}>
      <div>
        <Link to="/">
          <h1>SPIRIT</h1>
        </Link>
      </div>
      <div className={Styles.searchContainer}>
        <Select
          className={Styles.searchInput}
          options={searchResults}
          value={selectedUser}
          onChange={handleUserChange}
          onInputChange={handleSearchInputChange}
          placeholder="Search user"
        />
        <div>
          {selectedUser && (
            <Link to={`/profile/${selectedUser.value}`}>
              <h1>{selectedUser.label}</h1>
            </Link>
          )}
        </div>
      </div>
      <div>
        <Link to={`/profile/${user?._id}`}>
          <h1>{user.username}</h1>
        </Link>
      </div>
    </div>
  );
}
