import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import EditModal from "../components/EditProfileModal";
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

Modal.setAppElement("#root");

export default function Profile() {
  const { getUserData, posts, handleFollow, handleUnfollow, editUserData } =
    useContext(PostContext);
  const { userInfo, logout } = useContext(AuthContext);
  const { profileId } = useParams();
  const [userData, setUserData] = useState({});
  const userPosts = posts.filter((post) => post.username === userData.username);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    bio: userData.bio,
    website: userData.website,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData(profileId);
      setUserData(user);
      setEditedUserData(user);
    };

    fetchUserData();
  }, [getUserData, profileId]);

  if (!userData) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  const handleFollowClick = () => {
    handleFollow(userData._id);
  };

  const handleUnfollowClick = () => {
    handleUnfollow(userData._id);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    editUserData(editedUserData)
      .then((updatedUser) => {
        setUserData(updatedUser);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log("Error editing user data:", error);
      });
  };

  const handleEdit = () => {
    handleOpenModal();
  };

  return (
    <div>
      <Navbar />
      <div className="app">
        <div className="main-layout">
          <div className="column ">
            <Navigation />
          </div>
          <div className="column">
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

                {userInfo._id === userData._id ? (
                  <span>
                    <button onClick={handleLogoutClick}>Logout</button>
                    <button onClick={handleEdit}>Edit</button>
                  </span>
                ) : userData.followers &&
                  userData.followers.some(
                    (follower) =>
                      follower._id === userInfo._id ||
                      follower._id === userInfo._id
                  ) ? (
                  <button onClick={handleUnfollowClick}>Following</button>
                ) : (
                  <button onClick={handleFollowClick}>Follow</button>
                )}
              </div>
              <div>
                <p>{userData.bio}</p>
                <p>{userData.website}</p>
              </div>
              <div className={styles.profile_footer}>
                <h3>Post {userPosts.length}</h3>
                <h3>
                  Following{" "}
                  {userData.following ? userData.following.length : null}
                </h3>
                <h3>
                  Followers{" "}
                  {userData.followers ? userData.followers.length : null}
                </h3>
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
                  <Link to={`/post/${post._id}`}>
                    {" "}
                    <p>{post.content}</p>
                  </Link>
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
            <Suggestion />
          </div>
        </div>
      </div>
      <EditModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleFormSubmit={handleFormSubmit}
        editedUserData={editedUserData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
