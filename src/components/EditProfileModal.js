import React from "react";
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
export default function EditModal({
  isModalOpen,
  handleCloseModal,
  handleFormSubmit,
  editedUserData,
  handleInputChange,
}) {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Edit User Data"
        style={customStyles}
      >
        <h2>Edit User Data</h2>
        <form onSubmit={handleFormSubmit}>
          <label style={{ color: "black" }}>
            Bio:
            <textarea
              name="bio"
              value={editedUserData.bio}
              onChange={handleInputChange}
            />
          </label>
          <label style={{ color: "black" }}>
            Website:
            <input
              type="text"
              name="website"
              value={editedUserData.website}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
}
