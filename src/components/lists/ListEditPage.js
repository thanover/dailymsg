import React, { useState, useEffect } from "react";
import ListEditForm from "./ListEditForm";
import { toast } from "react-toastify";
import * as listsApi from "../../api/listsApi";
import * as userApi from "../../api/userApi";
import { updateIn } from "immutable";

const ListEditPage = ({ user, setUser, match, history }) => {
  const [errors, setErrors] = useState({});
  const [list, setList] = useState({
    id: "",
    name: "",
    ownerId: user.email,
  });

  useEffect(() => {
    const id = match.params.id;
    if (id) {
      listsApi.getListById(id).then((_list) => {
        console.log(_list);
        setList(_list);
      });
      console.log(listsApi.getListById(id));
    }
  }, [match.params.id]);

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
    listsApi.saveLists(list).then((response) => {
      const newUserState = { ...user };
      newUserState.lists.push(response.id);
      userApi.saveUser(newUserState).then((u) => {
        setUser(u);
        console.log(user);
        history.push("/lists");
        toast.success("Course Saved.");
      });
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <p>{match.params.id}</p>
      <ListEditForm
        errors={errors}
        list={list}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ListEditPage;
