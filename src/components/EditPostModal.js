import React, { useContext, useState } from "react";
import { PostContext } from "../Context/PostContext";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function EditPostModal({ post, onCloseModal }) {
  const { editPost } = useContext(PostContext);
  const [updatedContent, setUpdatedContent] = useState(post.content);

  const handleSave = () => {
    editPost(post._id, updatedContent)
      .then(() => {
        onCloseModal();
      })
      .catch((error) => {
        console.log("Error editing post:", error);
      });
  };

  return (
    <Modal isOpen={true} onRequestClose={onCloseModal} style={customStyles}>
      <textarea
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
        placeholder="Write your updated post..."
      ></textarea>
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCloseModal}>Cancel</button>
    </Modal>
  );
}
