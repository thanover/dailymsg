import React, { useState, useEffect } from "react";
import * as listsApi from "../../api/listsApi";

const ListPage = (props) => {
  const [list, setList] = useState({
    id: null,
    name: "",
    ownerId: "",
  });

  useEffect(() => {
    listsApi.getListById(props.match.params.listId).then((_list) => {
      setList(_list);
    });
  }, [props.match.params.listId]);

  return (
    <>
      <h2>{list.id}</h2>
      <h2>{list.name}</h2>
      <h2>{list.ownerId}</h2>
    </>
  );
};

export default ListPage;
