import React from "react";

const LSInputField = ({ inputFieldData }) => {
  const { type, placeholder, dispatch, validationType, error } = inputFieldData;
  return (
    <div className="ls_input_field">
      <input
        className={`login_form_input`}
        type={type}
        placeholder={placeholder}
        onBlur={(e) => {
          dispatch({
            type: validationType,
            payload: e.target.value,
          });
        }}
      />
      <p className="error_message">{error}</p>
    </div>
  );
};

export default LSInputField;
