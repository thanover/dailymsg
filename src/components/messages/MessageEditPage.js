import React, { useState, useEffect } from "react";
import MessageEditForm from "./MessageEditForm";
import { toast } from "react-toastify";
import * as listsApi from "../../api/listsApi";
import * as messageApi from "../../api/messagesApi";

const MessageEditPage = ({ match, history }) => {
  const messageId = match.params.id ? match.params.id : null;
  const listId = match.params.list ? match.params.list : null;
  const [errors, setErrors] = useState({});
  const [list, setList] = useState({});
  const [message, setMessage] = useState({
    id: null,
    name: "",
    list: listId,
  });

  useEffect(() => {
    if (messageId) {
      messageApi.getMessageById(messageId).then((_message) => {
        setMessage(_message);
      });
    }
  }, [messageId]);

  useEffect(() => {
    if (listId) {
      listsApi.getListById(listId).then((_list) => {
        setList(_list);
      });
    }
  }, [listId]);

  function handleChange({ target }) {
    setMessage({
      ...message,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!message.name) _errors.name = "Name is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    if (message.id) {
      messageApi.saveMessage(message).then(() => {
        toast.success("Message Saved.");
        history.push(`/list/${list.id}`);
      });
    } else {
      messageApi.saveMessage(message).then((response) => {
        const newListState = { ...list };
        newListState.messages.push(response.id);
        listsApi.saveList(newListState).then((list) => {
          setList(list);
          toast.success("List Saved.");
          history.push(`/list/${list.id}`);
        });
      });
    }
  }

  return (
    <>
      <h2>{message.name}</h2>
      <h2>Manage List</h2>
      <MessageEditForm
        errors={errors}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default MessageEditPage;
