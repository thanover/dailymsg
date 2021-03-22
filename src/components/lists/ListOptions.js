import React from "react";

function ListOptions({ sendHour, isDisabled, deleteList }) {
  return (
    <>
      <label htmlFor="send-hour">Send Hour:</label>
      <select
        id="list-options"
        name="list-options"
        size="1"
        value={sendHour}
        readOnly
      >
        <option value="01:00">01:00</option>
        <option value="02:00">02:00</option>
        <option value="03:00">03:00</option>
        <option value="04:00">04:00</option>
        <option value="08:00">08:00</option>
      </select>
      <p className="isDisabled">{isDisabled ? "Disabled" : "Active"}</p>
      <button className="delete-list-btn" onClick={deleteList}>
        <i className="far fa-trash-alt"></i>
        {" Delete List"}
      </button>
    </>
  );
}

export default ListOptions;
