import React from "react";
import DropDownMenu2 from "../common/DropDownMenu2";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Link from "@material-ui/core/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import DropDown from "../dropdown/DropDown";

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
      <DropDown
        icon={<MoreVertIcon />}
        menuOptions={[
          <Link onClick={deleteList}>
            <DeleteIcon />
          </Link>,
        ]}
      ></DropDown>
    </>
  );
}

export default ListOptions;
