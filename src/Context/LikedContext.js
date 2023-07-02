import React, { createContext, useContext, useState } from "react";
import { PostContext } from "./PostContext";

export const LikeContext = createContext();

export default function LikedContextProvider({ children }) {
  const { fetchPosts } = useContext(PostContext);
  const [likedPosts, setLikedPosts] = useState([]);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200 || response.status === 201) {
        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
        fetchPosts();
      } else {
        console.log("Error liking post:", data.error);
      }
    } catch (error) {
      console.log("Error liking post:", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await fetch(`/api/posts/dislike/${postId}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200 || response.status === 201) {
        setLikedPosts((prevLikedPosts) =>
          prevLikedPosts.filter((id) => id !== postId)
        );
        fetchPosts();
      } else {
        console.log("Error disliking post:", data.error);
      }
    } catch (error) {
      console.log("Error disliking post:", error);
    }
  };

  return (
    <LikeContext.Provider value={{ likedPosts, handleLike, handleDislike }}>
      {children}
    </LikeContext.Provider>
  );
}
