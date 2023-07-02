import React, { useContext } from "react";
import { LikeContext } from "../Context/LikedContext";
import { PostContext } from "../Context/PostContext";
import styles from "../Styles/PostContent.module.css";
import { Link } from "react-router-dom";
import Suggestion from "../components/Suggestion";
import Navigation from "../components/Navigation";
import Navbar from "../components/Navbar";
import { AuthContext } from "../Context/AuthContext";
import { BookmarkContext } from "../Context/BookmarkContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faComments,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
export default function Bookmark() {
  const { posts, users, handleDelete } = useContext(PostContext);
  const { userInfo } = useContext(AuthContext);
  const { likedPosts, handleDislike } = useContext(LikeContext);
  const { bookmarkPosts, handleBookmark, handleRemoveBookmark } =
    useContext(BookmarkContext);
  const bookmarkedPostsToRender = posts.filter((post) =>
    bookmarkPosts.some((bookmark) => bookmark._id === post._id)
  );

  const getUserById = (username) => {
    return users.find((user) => user.username === username);
  };
  const isPostLiked = (post) => {
    return likedPosts.includes(post);
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
              {bookmarkPosts.length ? (
                <>
                  {" "}
                  {[...bookmarkedPostsToRender].reverse().map((post) => {
                    const user = getUserById(post.username);
                    const isLiked = isPostLiked(post._id);
                    const likeCount = post.likes.likeCount;
                    const isBookmarked = isPostBookmarked(post._id);
                    const isCurrentUserPost =
                      post.username === userInfo.username;
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
                            onClick={() => handleDislike(post._id)}
                            icon={faHeart}
                            style={{
                              color: isLiked ? "red" : "#fff",
                              fontSize: "1.2rem",
                              cursor: "pointer",
                            }}
                          />
                          <span className={styles.likecount}>
                            ({likeCount})
                          </span>

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
                </>
              ) : (
                <h1 style={{ textAlign: "center" }}>No Bookmark Posts!</h1>
              )}
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
