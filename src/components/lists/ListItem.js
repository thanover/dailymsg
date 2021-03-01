import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";

import { getList } from "../../graphql/queries";

function ListItem({ listId }) {
  const [list, setList] = useState(null);

  useEffect(() => {
    API.graphql(graphqlOperation(getList, { id: listId })).then((res) => {
      setList(res.data.getList);
    });
  }, [listId]);

  useEffect(() => {
    console.log(`List set:`);
    console.log(list);
  }, [list]);

  return (
    <>
      <td>{listId}</td>
      {list && (
        <>
          <td>
            <Link to={"/list/" + list.id}>{list.name}</Link>
          </td>
        </>
      )}
    </>
  );
}

export default ListItem;
