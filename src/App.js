import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Pages/Profile";
import Blank from "./Pages/Blank";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import { AuthContext } from "./Context/AuthContext";
import Login from "./Pages/Login";
import { useContext, useEffect } from "react";
import MockAPI from "./components/Mockman";

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
        <Route path="/explore" element={<Blank />} />
        <Route path="/bookmarks" element={<Blank />} />
        <Route path="/liked" element={<Blank />} />
        <Route path="/profile/:profileId" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
