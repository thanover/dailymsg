import React, { useState } from "react";
import ListEditForm from "./ListEditForm";
import { toast } from "react-toastify";
import { API, graphqlOperation } from "aws-amplify";
import { createList } from "../../graphql/mutations";

const ListEditPage = ({ user, history, checkUser, closeModal }) => {
  const [errors, setErrors] = useState({});
  const [list, setList] = useState({
    id: null,
    name: "",
    listOwnerId: user.id,
    sendHour: "08:00",
    isDisabled: false,
  });

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
    try {
      await API.graphql(graphqlOperation(createList, { input: list }));
      closeModal();
      toast.success("List Created!");
      await checkUser();
      history.push("/lists");
    } catch (error) {
      console.log(`error creating list:`);
      console.log(error);
    }
  }

  return (
    <div className="new-list-form">
      <ListEditForm
        errors={errors}
        list={list}
        onChange={handleChange}
        onSubmit={handleSubmit}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ListEditPage;
