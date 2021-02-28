import React, { useState, useEffect } from "react";
import ListEditForm from "./ListEditForm";
import { toast } from "react-toastify";
import * as listsApi from "../../api/listsApi";
import * as userApi from "../../api/userApi";
import MessageList from "../messages/MessageList";

const ListEditPage = ({ user, setUser, match, history }) => {
  const id = match.params.id ? match.params.id : null;
  const [errors, setErrors] = useState({});
  const [list, setList] = useState({
    id: null,
    name: "",
    ownerId: user.email,
    messages: [],
  });

  useEffect(() => {
    if (id) {
      listsApi.getListById(id).then((_list) => {
        setList(_list);
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

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    if (list.id) {
      listsApi.saveList(list).then(() => {
        toast.success("List Saved.");
        history.push("/lists");
      });
    } else {
      listsApi.saveList(list).then((response) => {
        const newUserState = { ...user };
        newUserState.lists.push(response.id);
        userApi.saveUser(newUserState).then((u) => {
          setUser(u);
          toast.success("Course Saved.");
          history.push("/lists");
        });
      });
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
