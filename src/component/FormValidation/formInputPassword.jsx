import React, { useState } from "react";
import "./input.css";

const FormInputPassword = (props) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    setFocused(false);
  };

  const toggleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className={`formInput ${focused ? "focused" : ""}`}>
      <label>{label}</label>
      <div className="passwordInput">
        <input
          {...inputProps}
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          focused={focused.toString()}
          className={`border ${
            errorMessage ? "border-red-500 bg-red-100" : ""
          } focus:border-red-500`}
        />
        <button onClick={toggleShowPassword}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInputPassword;
