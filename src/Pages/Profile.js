import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import { AuthContext } from "../Context/AuthContext";
import Suggestion from "../components/Suggestion";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import styles from "../Styles/PostContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faBookmark,
  faComments,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const { getUserData, posts } = useContext(PostContext);
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo);
  const { profileId } = useParams();
  const [userData, setUserData] = useState({});
  const userPosts = posts.filter((post) => post.username === userData.username);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData(profileId);
      setUserData(user);
    };

    fetchUserData();
  }, [profileId]);

  if (!userData) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

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
            <div className={styles.profile}>
              <div className={styles.profile_header}>
                <img
                  src="https://pbs.twimg.com/profile_images/1209746138/creeper_400x400.png"
                  alt="Profile"
                />
                <div
                  style={{ marginLeft: "19px", marginRight: "19px" }}
                  className={styles.profile_header_username}
                >
                  <h1>
                    <Link>{userData.username}</Link>
                  </h1>
                  <h1>@{userData.username}</h1>
                </div>

                <button>Follow</button>
              </div>
              <div>
                <p>{userData.bio}</p>
                <p>{userData.website}</p>
              </div>
              <div className={styles.profile_footer}>
                <h3>Post {userPosts.length}</h3>
                <h3>Following {}</h3>
                <h3>Followers {}</h3>
              </div>
            </div>
            {userPosts.map((post) => {
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
                      <h1>{post.fullName}</h1>
                      <h1>@{post.username}</h1>
                    </div>

                    <p>{post.createdAt}</p>
                  </div>

                  <p>{post.content}</p>
                  <div className={styles.post_footer}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{
                        color: "#fff",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                      }}
                    />
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
              );
            })}
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
