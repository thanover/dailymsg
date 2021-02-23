import React from "react";
import TextInput from "../common/TextInput";
import PropTypes from "prop-types";

function ListEditForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="name"
        label="Name"
        type="text"
        name="name"
        className="form-control"
        value={props.list.name}
        onChange={props.onChange}
        error={props.errors.name}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

ListEditForm.propTypes = {
  list: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ListEditForm;
