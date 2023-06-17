import React from "react";
import Navigation from "../components/Navigation";
import Suggestion from "../components/Suggestion";
import PostContent from "../components/PostContent";
import Navbar from "../components/Navbar";
import "../App.css";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="app">
        <div className="main-layout">
          <div className="column ">
            {" "}
            <Navigation />
          </div>
          <div className="column">
            {" "}
            <PostContent />
          </div>
          <div className="column">
            {" "}
            <Suggestion />
          </div>
        </div>
      </div>
    </>
  );
}
