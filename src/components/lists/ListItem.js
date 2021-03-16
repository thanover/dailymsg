import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { getList } from "../../graphql/queries";

function ListItem({ listId, active }) {
  const [list, setList] = useState(null);

  useEffect(() => {
    API.graphql(graphqlOperation(getList, { id: listId })).then((res) => {
      setList(res.data.getList);
    });
  }, [listId]);

  useEffect(() => {}, [list]);

  return (
    <>
      {list && (
        <Link to={"/lists/" + list.id}>
          <li className={active ? "list-item active" : "list-item"}>
            <i className="far fa-list-alt"></i>
            {" " + list.name}
          </li>
        </Link>
      )}
    </>
  );
}

export default ListItem;
