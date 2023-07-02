import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
export const PostContext = React.createContext();

export default function PostContextProvider({ children }) {
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const { setUserInfo, userInfo } = useContext(AuthContext);

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
      console.log(data.users);
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

  const getPostData = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}`);
      const data = await res.json();
      return data.post;
    } catch (error) {
      console.log(error.message);
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

      if (response.status === 200) {
        setPosts((prevPosts) => [data.posts, ...prevPosts]);
      }
    } catch (error) {
      console.log("Error fetching post data:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const data = await response.json();

      if (response.status === 200 || response.status === 201) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.log("error deleting post", error);
    }
  };
  const handleFollow = async (followUserId) => {
    try {
      const response = await fetch(`/api/users/follow/${followUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const data = await response.json();
      console.log("folow", data);
      if (response.status === 200) {
        const updatedUserInfo = data.user;
        setUserInfo(updatedUserInfo);
        fetchPosts();
      } else {
        console.log("Invalid response data:", data);
      }
    } catch (error) {
      console.log("Error following user:", error);
    }
  };
  const handleUnfollow = async (followUserId) => {
    try {
      const response = await fetch(`/api/users/unfollow/${followUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      console.log("unfollow", data);
      if (response.status === 200) {
        const updatedUserInfo = data.user;
        setUserInfo(updatedUserInfo);
      } else {
        console.log("Invalid response data:", data);
      }
    } catch (error) {
      console.log("Error unfollowing user:", error);
    }
  };

  function handleLatest() {
    console.log("Fetching latest");
    const sortedPosts = [...posts].sort(
      (b, a) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setPosts(sortedPosts);
  }

  function handleTrending() {
    console.log("trending");
    const sortedPosts = [...posts].sort(
      (a, b) => a.likes.likeCount - b.likes.likeCount
    );
    setPosts(sortedPosts);
  }

  const editPost = async (postId, updatedContent) => {
    try {
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        body: JSON.stringify({ content: updatedContent }),
      });
      const data = await response.json();
      console.log("edit post api", data);
      if (response.status === 200 || response.status === 201) {
        const updatedPosts = [...posts];
        const postIndex = updatedPosts.findIndex((post) => post._id === postId);
        updatedPosts[postIndex].content = updatedContent;
        setPosts(updatedPosts);
        return data;
      }
    } catch (error) {
      console.log("Error editing post:", error);
    }
  };

  const editUserData = async (updatedUserData) => {
    try {
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        body: JSON.stringify({ userData: updatedUserData }),
      });
      const data = await response.json();
      console.log("edit user profile api", data);
      if (response.status === 200 || response.status === 201) {
        setUserInfo(updatedUserData);
        return data;
      }
    } catch (error) {
      console.log("Error editing user profile:", error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        users,
        getUserData,
        createPost,
        fetchPosts,
        handleFollow,
        getPostData,
        handleUnfollow,
        handleLatest,
        handleTrending,
        handleDelete,
        editUserData,
        editPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
