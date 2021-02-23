import React, { useState, useEffect } from "react";
import * as listApi from "../../api/listsApi";
import { Link } from "react-router-dom";

function ListItem({ listId }) {
  const [list, setList] = useState(null);

  useEffect(() => {
    listApi.getListById(listId).then((list) => setList(list));
  }, [listId]);

  return (
    <>
      <td>{listId}</td>
      {list && (
        <>
          <td>
            <Link to={"/list/" + list.id}>{list.name}</Link>
          </td>
          <td>{list.ownerId}</td>
        </>
      )}
    </>
  );
}

export default ListItem;
