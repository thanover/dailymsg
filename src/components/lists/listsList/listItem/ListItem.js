import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { getList } from "../../../../graphql/queries";
import { ListOptionsDropdown } from "./listOptionsDropdown/listOptionsDropdown";

function ListItem({ listId, active, setActiveList, activeList }) {
  const [isHovering, setIsHovering] = useState(false);
  const [list, setList] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (activeList && activeList.id === listId) {
      setList(activeList);
    }
  }, [activeList, listId]);

  useEffect(() => {
    console.log(listId);
    try {
      API.graphql(graphqlOperation(getList, { id: listId })).then((res) => {
        if (!mountedRef.current) return null;
        const _returnedList = res.data.getList;
        console.log(_returnedList);
        setList(_returnedList);
        console.log(list);
      });
    } catch (err) {
      console.log("error getting a list:");
      console.log(err);
    }
  }, [listId]);

  function listItemNoHover(_list) {
    return (
      <li className={active ? "list-item active" : "list-item"}>
        <Link
          className="list-btn"
          to={"/lists/" + _list.id}
          // onClick={setActiveList(list)}
        >
          <span className="list-name">{_list.name}</span>
          <span className="list-messages-length">
            {_list.messages.items.length}
          </span>
        </Link>
      </li>
    );
  }

  function listItemHover(_list) {
    return (
      <li className={active ? "list-item active" : "list-item"}>
        <Link
          className="list-btn"
          to={"/lists/" + _list.id}
          // onClick={setActiveList(list)}
        >
          <span className="list-name">{_list.name}</span>
          <span className="list-messages-length">
            <ListOptionsDropdown />
          </span>
        </Link>
      </li>
    );
  }

  return (
    <>
      {list && (
        <div
          onMouseEnter={() => {
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        >
          {isHovering ? listItemHover(list) : listItemNoHover(list)}
        </div>
      )}
    </>
  );
}

export default ListItem;
