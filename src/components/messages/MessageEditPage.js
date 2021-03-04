import React, { useState, useEffect } from "react";
import MessageEditForm from "./MessageEditForm";
import { toast } from "react-toastify";
// import * as listsApi from "../../api/listsApi";
// import * as messageApi from "../../api/messagesApi";

import { API, graphqlOperation } from "aws-amplify";
import { getMessage } from "../../graphql/queries";
import { updateMessage, createMessage } from "../../graphql/mutations";

const MessageEditPage = ({ match, history, checkUser }) => {
  const messageId = match.params.id ? match.params.id : null;
  const listId = match.params.list ? match.params.list : null;
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({
    id: null,
    text: "",
    messageListId: listId,
  });

  console.log(message);

  console.log(`/list/${listId}`);

  useEffect(() => {
    if (messageId) {
      API.graphql(graphqlOperation(getMessage, { id: messageId })).then(
        (res) => {
          setMessage(res.data.getMessage);
        }
      );
    }
  }, [messageId]);

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
    if (message.id) {
      try {
        await API.graphql(
          graphqlOperation(updateMessage, {
            input: {
              id: message.id,
              text: message.text,
            },
          })
        );
        toast.success("Message Saved.");
        history.push(`/list/${listId}`);
      } catch (error) {
        console.log(`error updating message:`);
        console.log(error);
      }
    } else {
      console.log(message);
      try {
        await API.graphql(graphqlOperation(createMessage, { input: message }));
        toast.success("Message Creted!");
        await checkUser();
        history.push(`/list/${listId}`);
      } catch (error) {
        console.log("error creating message:");
        console.log(error);
      }
    }
  }

  return (
    <>
      <h2>{message.text}</h2>
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
