import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import { AuthContext } from "./Context/AuthContext";
import Login from "./Pages/Login";
import Bookmark from "./Pages/Bookmark";
import { useContext, useEffect } from "react";
import MockAPI from "./components/Mockman";
import ExploreContent from "./Pages/Explore";
import Liked from "./Pages/Liked";
import IndividualPost from "./Pages/IndividualPost";
function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mock" element={<MockAPI />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:postId" element={<IndividualPost />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/explore" element={<ExploreContent />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/profile/:profileId" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
