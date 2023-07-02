import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import Suggestion from "../components/Suggestion";
import Navigation from "../components/Navigation";
import styles from "../Styles/PostContent.module.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LikeContext } from "../Context/LikedContext";
import {
  faHeart,
  faBookmark,
  faComments,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
export default function IndividualPost() {
  const [post, setPost] = useState([]);
  const { getPostData, users } = useContext(PostContext);
  const { postId } = useParams();
  useEffect(() => {
    const fetchPostData = async () => {
      const postIs = await getPostData(postId);
      console.log(postIs);
      setPost([postIs]);
    };

    fetchPostData();
  }, [getPostData, postId]);
  const { likedPosts, handleLike, handleDislike } = useContext(LikeContext);

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

  return (
    <div>
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
              {post.map((post) => {
                const user = getUserById(post.username);
                const isLiked = isPostLiked(post._id);
                const likeCount = post.likes.likeCount;
                return (
                  <>
                    <div className={styles.post} key={post._id}>
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
                        <p>{post.createdAt}</p>
                        <span>
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </div>
                      <p>{post.content}</p>
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
                            color: "#fff",
                            fontSize: "1.2rem",
                            cursor: "pointer",
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
                    <h1 className={styles.comments}>Comments</h1>
                    <div>
                      {post.comments &&
                        post.comments.map((comm) => {
                          return (
                            <div className={styles.post}>
                              <h2>~ {post.username}</h2>
                              <p className={styles.comment_data}>
                                {comm.comment}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </>
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
    </div>
  );
}
