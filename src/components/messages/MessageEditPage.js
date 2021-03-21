import React, { useState } from "react";
import MessageEditForm from "./MessageEditForm";
import { toast } from "react-toastify";

import { API, graphqlOperation } from "aws-amplify";
import { createMessage } from "../../graphql/mutations";

const MessageEditPage = ({ list, history, closeModal, updateList }) => {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({
    id: null,
    text: "",
    messageListId: list.id,
  });

  // useEffect(() => {
  //   if (listId) {
  //     listsApi.getListById(listId).then((_list) => {
  //       setList(_list);
  //     });
  //   }
  // }, [listId]);

  function handleChange({ target }) {
    setMessage({
      ...message,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!message.text) _errors.text = "text is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    try {
      await API.graphql(graphqlOperation(createMessage, { input: message }));
      closeModal();
      updateList();
      toast.success("Message Created!");
      history.push(`/lists/${list.id}`);
    } catch (error) {
      console.log("error creating message:");
      console.log(error);
    }
  }

  return (
    <div className="new-list-form">
      <MessageEditForm
        errors={errors}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MessageEditPage;
