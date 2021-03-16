import React, { useState } from "react";
import Modal from "react-modal";
import ListEditPage from "./ListEditPage";

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

function NewListModal({ user, checkUser }) {
  const [newListModalIsOpen, setNewListModalIsOpen] = useState(false);

  function openModal() {
    setNewListModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setNewListModalIsOpen(false);
  }

  return (
    <>
      <button className="list-btn" onClick={openModal}>
        + Add a New List
      </button>
      <Modal
        isOpen={newListModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ListEditPage
          user={user}
          checkUser={checkUser}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
}

export default NewListModal;
