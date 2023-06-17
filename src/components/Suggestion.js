import React from "react";
import { PostContext } from "../Context/PostContext";
export default function Suggestion() {
  const { users } = React.useContext(PostContext);
  console.log(users);
  const currentUser = users[0];

  return <div>Suggestion</div>;
}
