import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "./PostContext";

export const BookmarkContext = React.createContext();

export default function BookmarkContextProvider({ children }) {
  const [bookmarkPosts, setBookmarkPosts] = useState([]);
  const { fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch("/api/users/bookmark/", {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setBookmarkPosts(data.bookmarks);
      } else {
        console.log("Error fetching bookmarks:", data.error);
      }
    } catch (error) {
      console.log("Error fetching bookmarks:", error);
    }
  };

  const handleBookmark = async (postId) => {
    try {
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const data = await response.json();

      if (response.status === 200 || response.status === 201) {
        setBookmarkPosts(data.bookmarks);
        fetchPosts();
      } else {
        console.log("Error liking post:", data.error);
      }
    } catch (error) {
      console.log("Error liking post:", error);
    }
  };

  const handleRemoveBookmark = async (postId) => {
    try {
      const response = await fetch(`/api/users/remove-bookmark/${postId}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200 || response.status === 201) {
        setBookmarkPosts((prevBookmarkPosts) =>
          prevBookmarkPosts.filter((bookmark) => bookmark._id !== postId)
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
    <BookmarkContext.Provider
      value={{
        bookmarkPosts,
        handleRemoveBookmark,
        handleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
