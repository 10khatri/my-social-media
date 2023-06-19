import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";
import styles from "../Styles/PostContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../Context/AuthContext";
import {
  faHeart,
  faBookmark,
  faComments,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PostContent() {
  const { posts, users, createPost, fetchPosts } = useContext(PostContext);
  const { userInfo } = useContext(AuthContext);
  const [newPost, setNewPost] = React.useState("");

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
  );
}

// import React, { useContext } from "react";
// import { PostContext } from "../Context/PostContext";
// import styles from "../Styles/PostContent.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHeart,
//   faBookmark,
//   faComments,
//   faShare,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

// export default function PostContent() {
//   const { posts, users, createPost, fetchPosts } = useContext(PostContext);
//   const [newPost, setNewPost] = React.useState("");

//   const getUserById = (username) => {
//     return users.find((user) => user.username === username);
//   };
//   const handlePostSubmit = () => {
//     if (newPost.trim() !== "") {
//       createPost({ content: newPost });
//       setNewPost("");
//       fetchPosts();
//     }
//   };

//   return (
//     <div>
//       <div className={styles.create_post}>
//         <textarea
//           value={newPost}
//           onChange={(e) => setNewPost(e.target.value)}
//           placeholder="Write your post..."
//         ></textarea>
//         <br />
//         <button onClick={handlePostSubmit}>Post</button>
//       </div>
//       {[...posts].reverse().map((post) => {
//         const user = getUserById(post.username);
//         return (
//           <div className={styles.post} key={post.id}>
//             <div className={styles.post_header}>
//               <img
//                 src="https://pbs.twimg.com/profile_images/1209746138/creeper_400x400.png"
//                 alt="Profile"
//               />
//               <div
//                 style={{ marginLeft: "19px", marginRight: "19px" }}
//                 className={styles.post_header_username}
//               >
//                 <h1>
//                   <Link to={`/profile/${user._id}`}>{post.fullName}</Link>
//                 </h1>
//                 <h1>@{post.username}</h1>
//               </div>

//               <p>{post.createdAt}</p>
//             </div>

//             <p>{post.content}</p>
//             <div className={styles.post_footer}>
//               <FontAwesomeIcon
//                 icon={faHeart}
//                 style={{
//                   color: "#fff",
//                   fontSize: "1.2rem",
//                   cursor: "pointer",
//                 }}
//               />
//               <FontAwesomeIcon
//                 icon={faBookmark}
//                 style={{
//                   color: "#fff",
//                   fontSize: "1.2rem",
//                   cursor: "pointer",
//                 }}
//               />
//               <FontAwesomeIcon
//                 icon={faComments}
//                 style={{
//                   color: "#fff",
//                   fontSize: "1.2rem",
//                   cursor: "pointer",
//                 }}
//               />
//               <FontAwesomeIcon
//                 icon={faShare}
//                 style={{
//                   color: "#fff",
//                   fontSize: "1.2rem",
//                   cursor: "pointer",
//                 }}
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
