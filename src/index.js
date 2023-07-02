import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { makeServer } from "./server";
import PostContextProvider from "./Context/PostContext";
import LikedContextProvider from "./Context/LikedContext";
import BookmarkContextProvider from "./Context/BookmarkContext";
import AuthContextProvider from "./Context/AuthContext";
// Call make Server
makeServer();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthContextProvider>
      <PostContextProvider>
        <LikedContextProvider>
          <BookmarkContextProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BookmarkContextProvider>
        </LikedContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
