import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Signup.module.css";
export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSignup() {
    const fetchSignup = async () => {
      let userData = {
        name,
        username,
        email,
        password,
        bio: `Hey there ${name} here`,
        website: "https://github.com/p",
      };

      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        const { encodedToken } = data;
        console.log(data);

        if (response.status === 200 || response.status === 201) {
          console.log("success");
          localStorage.setItem("encodedToken", encodedToken);
          localStorage.setItem("user", JSON.stringify(data.createdUser));
          setIsAuthenticated(true);
          setUserInfo(data.createdUser);
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSignup();
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleUsername1(event) {
    setName(event.target.value);
  }
  function handleUsername2(event) {
    setUsername(event.target.value);
  }

  return (
    <div className={styles.signup_container}>
      <div className={styles.quote_container}>
        <img
          src="https://www.freepnglogos.com/uploads/logo-twitch-ios-version-png-0.png"
          alt="logo"
        />
      </div>
      <div className={styles.signup_form}>
        <h1>Signup</h1> <br />
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              handleUsername1(event);
            }}
          />
          <br />
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(event) => {
              handleUsername2(event);
            }}
          />
          <br />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              handleEmail(event);
            }}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              handlePassword(event);
            }}
          />
          <br />
          <div className={styles.signup_buttons}>
            <button onClick={handleSignup}>Signup</button>
            <button>
              <Link to="/login">Login </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
