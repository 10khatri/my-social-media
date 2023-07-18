import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../Styles/Login.module.css";
export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isGuestLogin, setIsGuestLogin] = useState(false);
  const { setIsAuthenticated, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isGuestLogin) {
      handleLogin();
    }
    // eslint-disable-next-line
  }, [isGuestLogin]);
  function handleLogin() {
    const fetchLogin = async () => {
      let userData = { username, password };
      console.log(userData);
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        const { encodedToken } = data;
        console.log(data, encodedToken);

        if (response.status === 200 || response.status === 201) {
          console.log("success");
          localStorage.setItem("encodedToken", encodedToken);
          localStorage.setItem("user", JSON.stringify(data.foundUser));
          setUserInfo(data.foundUser);
          setIsAuthenticated(true);
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLogin();
  }

  async function handleGuestLogin() {
    const sampleUserName = "adarshbalika";
    const samplePassword = "adarshBalika123";
    setUserName(sampleUserName);
    setPassword(samplePassword);
    setIsGuestLogin(true);
  }
  function handleEmail(event) {
    setUserName(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  return (
    <div className={styles.login_container}>
      <div className={styles.quote_container}>
        <img
          src="https://www.freepnglogos.com/uploads/logo-twitch-ios-version-png-0.png"
          alt="logo"
        />
      </div>
      <div className={styles.login_form}>
        <h1>Login</h1>
        <div>
          <br />
          <label htmlFor="username">Username</label>

          <input
            type="text"
            required={true}
            id="username"
            value={username}
            onChange={(event) => {
              handleEmail(event);
            }}
          />
          <br />
          <label htmlFor="password">Password</label>

          <input
            type="password"
            required={true}
            id="password"
            value={password}
            onChange={(event) => {
              handlePassword(event);
            }}
          />
          <div className={styles.login_buttons}>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleGuestLogin}>Guest Login</button>
            <button>
              {" "}
              <Link to="/signup">signup</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
