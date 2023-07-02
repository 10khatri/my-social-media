import React from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../Context/PostContext";
import { AuthContext } from "../Context/AuthContext";
import styles from "../Styles/Suggestion.module.css";

export default function Suggestion() {
  const { users, handleFollow, handleLatest, handleTrending } =
    React.useContext(PostContext);
  const { userInfo } = React.useContext(AuthContext);

  let suggestedUsers = [];

  if (userInfo.username === "adarshbalika") {
    suggestedUsers = users
      .filter(
        (user) =>
          !userInfo.following.some(
            (followedUser) => followedUser._id === user._id
          )
      )
      .slice(1);
  } else {
    suggestedUsers = users.filter(
      (user) =>
        !userInfo.following.some(
          (followedUser) => followedUser._id === user._id
        )
    );
  }

  return (
    <div className={styles.suggestion_container}>
      <div className={styles.suggestion_container_sort_button}>
        <button
          onClick={() => {
            handleTrending();
          }}
        >
          Trending
        </button>
        <button
          onClick={() => {
            handleLatest();
          }}
        >
          Latest
        </button>
      </div>
      <h1>Suggestion for you</h1>

      <div className={styles.suggestion_profile_container}>
        {suggestedUsers.map((user) => (
          <div className={styles.suggestion_profile} key={user._id}>
            <div>
              <img
                src="https://pbs.twimg.com/profile_images/1209746138/creeper_400x400.png"
                alt="Profile"
              />
            </div>
            <div>
              <span>
                {" "}
                <Link to={`/profile/${user._id}`}>{user.fullName}</Link>
              </span>
              <br /> <span>@{user.username}</span>
              <button onClick={() => handleFollow(user._id)}>Follow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
