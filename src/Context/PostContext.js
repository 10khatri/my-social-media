import React from "react";

export const PostContext = React.createContext();

export default function PostContextProvider({ children }) {
  const [posts, setPosts] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserData = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      return data.user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  const createPost = async (postData) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        body: JSON.stringify({ postData }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setPosts((prevPosts) => [data.posts, ...prevPosts]);
      }
    } catch (error) {
      console.log("Error fetching post data:", error);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, users, getUserData, createPost, fetchPosts }}
    >
      {children}
    </PostContext.Provider>
  );
}
