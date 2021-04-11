import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Times } from "../../../../assets/Times";
import Button from "react-bootstrap/Button";

export const ListOptions = ({ isDisabled, deleteList, sendHour }) => {
  const [switchState, setSwitchState] = useState(!isDisabled);

  const changeSwitchState = () => {
    setSwitchState(!switchState);
  };

  return (
    <div className="list-options-container">
      <div className="list-options">
        <div className="list-send-time">
          <div className="nothing">{"Sends Daily at:  "}</div>
          <div className="list-send-time-input">
            <Form.Control as="select" defaultValue={sendHour}>
              {Times.map((time, idx) => (
                <option key={idx}>{time}</option>
              ))}
            </Form.Control>
          </div>
        </div>
        <div className="list-state">
          <div className="list-state-switch">
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={switchState}
              onChange={changeSwitchState}
            />
          </div>
          <div className="list-state-label">
            {switchState ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="list-more-options">
          <Button variant="outline-danger" size="sm" onClick={deleteList}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
