import React from "react";
import TextInput from "../common/TextInput";
import PropTypes from "prop-types";

function MessageEditForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="text"
        label="text"
        type="text"
        name="text"
        className="form-control"
        value={props.message.text}
        onChange={props.onChange}
        error={props.errors.text}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

MessageEditForm.propTypes = {
  message: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default MessageEditForm;
