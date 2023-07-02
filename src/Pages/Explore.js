import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import styles from "../Styles/PostContent.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar";
import { BookmarkContext } from "../Context/BookmarkContext";
import { LikeContext } from "../Context/LikedContext";
import Navigation from "../components/Navigation";
import Suggestion from "../components/Suggestion";
import { AuthContext } from "../Context/AuthContext";
import {
  faHeart,
  faBookmark,
  faComments,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function ExploreContent() {
  const { posts, users, handleDelete } = useContext(PostContext);
  const { likedPosts, handleLike, handleDislike } = useContext(LikeContext);
  const { bookmarkPosts, handleRemoveBookmark, handleBookmark } =
    useContext(BookmarkContext);
  const { userInfo } = useContext(AuthContext);
  const getUserById = (username) => {
    return users.find((user) => user.username === username);
  };

  const isPostLiked = (postId) => {
    return likedPosts.includes(postId);
  };

  const toggleLike = (postId) => {
    if (isPostLiked(postId)) {
      handleDislike(postId);
    } else {
      handleLike(postId);
    }
  };
  const isPostBookmarked = (postId) => {
    return bookmarkPosts.some((bookmark) => bookmark._id === postId);
  };

  const toggleBookmark = (postId) => {
    if (isPostBookmarked(postId)) {
      handleRemoveBookmark(postId);
    } else {
      handleBookmark(postId);
    }
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

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
            <div>
              {[...posts].reverse().map((post) => {
                const user = getUserById(post.username);
                const isLiked = isPostLiked(post._id);
                const likeCount = post.likes.likeCount;
                const isCurrentUserPost = post.username === userInfo.username;
                const isBookmarked = isPostBookmarked(post._id);
                return (
                  <div className={styles.post} key={post.id}>
                    <div className={styles.post_header}>
                      <img
                        src="https://pbs.twimg.com/profile_images/1209746138/creeper_400x400.png"
                        alt="Profile"
                      />
                      <div
                        style={{ marginLeft: "19px", marginRight: "19px" }}
                        className={styles.post_header_username}
                      >
                        <h1>
                          <Link to={`/profile/${user._id}`}>
                            {post.fullName}
                          </Link>
                        </h1>
                        <h1>@{post.username}</h1>
                      </div>
                      <p>{formatDate(post.createdAt)}</p>
                      <span>
                        {isCurrentUserPost && (
                          <FontAwesomeIcon
                            onClick={() => handleDelete(post._id)}
                            icon={faTrash}
                          />
                        )}
                      </span>
                    </div>
                    <Link to={`/post/${post._id}`}>
                      {" "}
                      <p>{post.content}</p>
                    </Link>
                    <div className={styles.post_footer}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{
                          color: isLiked ? "red" : "#fff",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleLike(post._id)}
                      />
                      <span className={styles.likecount}>({likeCount})</span>

                      <FontAwesomeIcon
                        icon={faBookmark}
                        style={{
                          color: isBookmarked ? "salmon" : "#fff",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          toggleBookmark(post._id);
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faComments}
                        style={{
                          color: "#fff",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faShare}
                        style={{
                          color: "#fff",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
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
