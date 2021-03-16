import React, { useState } from "react";
import Modal from "react-modal";
import MessageEditPage from "./MessageListPage";

const customStyles = {
  content: {
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f5f5f5",
    border: "1px solid #cbcbcb",
    borderRadius: "5px",
  },
};

function NewMessageModal({ user, checkUser }) {
  const [newMessageModalIsOpen, setNewMessageModalIsOpen] = useState(false);

  function openModal() {
    setNewMessageModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setNewMessageModalIsOpen(false);
  }

  return (
    <>
      <button className="message-btn" onClick={openModal}>
        + Add a New Message
      </button>
      <Modal
        isOpen={newMessageModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <MessageEditPage
          user={user}
          checkUser={checkUser}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
}

export default NewMessageModal;
