import React, { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import styles from "../Styles/PostContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditPostModal from "./EditPostModal";
import { AuthContext } from "../Context/AuthContext";
import {
  faHeart,
  faBookmark,
  faComments,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { LikeContext } from "../Context/LikedContext";
import { BookmarkContext } from "../Context/BookmarkContext";

export default function PostContent() {
  const { posts, users, createPost, fetchPosts, handleDelete } =
    useContext(PostContext);
  const { userInfo } = useContext(AuthContext);
  const { likedPosts, handleLike, handleDislike } = useContext(LikeContext);
  const { bookmarkPosts, handleRemoveBookmark, handleBookmark } =
    useContext(BookmarkContext);
  const [newPost, setNewPost] = React.useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const [setEditPostContent] = useState("");

  const openEditModal = (postId) => {
    const post = posts.find((p) => p._id === postId);
    setEditPostId(postId);
    setEditPostContent(post.content);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const getUserById = (username) => {
    return users.find((user) => user.username === username);
  };

  const filteredPosts = posts.filter((post) => {
    const isCurrentUserPost = post.username === userInfo.username;
    const isFollowedUserPost = userInfo.following.some(
      (followedUser) => followedUser.username === post.username
    );
    return isCurrentUserPost || isFollowedUserPost;
  });

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      createPost({ content: newPost });
      setNewPost("");
      fetchPosts();
    }
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
    <div>
      <div className={styles.create_post}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your post..."
        ></textarea>
        <br />
        <button onClick={handlePostSubmit}>Post</button>
      </div>
      {[...filteredPosts].reverse().map((post) => {
        const user = getUserById(post.username);
        const isLiked = isPostLiked(post._id);
        const likeCount = post.likes.likeCount;
        const isBookmarked = isPostBookmarked(post._id);
        const isCurrentUserPost = post.username === userInfo.username;

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
                  <Link to={`/profile/${user._id}`}>{post.fullName}</Link>
                </h1>
                <h1>@{post.username}</h1>
              </div>

              <p>{formatDate(post.createdAt)}</p>
              <span>
                {isCurrentUserPost && (
                  <>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => openEditModal(post._id, post.content)}
                    >
                      edit
                    </p>
                    <FontAwesomeIcon
                      onClick={() => handleDelete(post._id)}
                      icon={faTrash}
                    />
                  </>
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
      {editModalOpen && (
        <EditPostModal
          post={posts.find((post) => post._id === editPostId)}
          onCloseModal={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}
