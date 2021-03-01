import React, { useState, useEffect } from "react";
import ListEditForm from "./ListEditForm";
import { toast } from "react-toastify";
// import * as listsApi from "../../api/listsApi";
// import * as userApi from "../../api/userApi";
import MessageList from "../messages/MessageList";
import { API, graphqlOperation } from "aws-amplify";
import { updateList, createList } from "../../graphql/mutations";
import { getList } from "../../graphql/queries";

const ListEditPage = ({ user, match, history, checkUser }) => {
  const id = match.params.id ? match.params.id : null;
  const [errors, setErrors] = useState({});
  const [list, setList] = useState({
    id: null,
    name: "",
    listOwnerId: user.id,
  });

  useEffect(() => {
    if (id) {
      API.graphql(graphqlOperation(getList, { id: id })).then((res) => {
        setList(res.data.getList);
      });
    }
  }, [id]);

  function handleChange({ target }) {
    setList({
      ...list,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!list.name) _errors.name = "Name is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    if (list.id) {
      try {
        await API.graphql(
          graphqlOperation(updateList, {
            input: {
              id: list.id,
              name: list.name,
            },
          })
        );
        toast.success("List Saved.");
        checkUser();
        history.push("/lists");
      } catch (error) {
        console.log(`error updated list:`);
        console.log(error);
      }
    } else {
      console.log(list);
      try {
        await API.graphql(graphqlOperation(createList, { input: list }));
        toast.success("List Created!");
        checkUser();
        history.push("/lists");
      } catch (error) {
        console.log(`error creating list:`);
        console.log(error);
      }
    }
  }

  return (
    <>
      <h2>{list.name}</h2>
      <h2>Manage Course</h2>
      <ListEditForm
        errors={errors}
        list={list}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <br></br>
      <br></br>
      <h2>Messages</h2>
      <MessageList list={list} user={user} />
    </>
  );
};

export default ListEditPage;
