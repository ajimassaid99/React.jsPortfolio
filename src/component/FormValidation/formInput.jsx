import React, { useState } from "react";
import "./input.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    setFocused(false);
  };

  return (
    <div className={`formInput ${focused ? "focused" : ""}`}>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        focused={focused.toString()}
        className={`border ${
          errorMessage ? "border-red-500 bg-red-100" : ""
        } focus:border-red-500`}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
