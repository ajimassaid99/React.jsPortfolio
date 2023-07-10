import React, { useState } from "react";
import FormInput from "../component/FormValidation/formInput";
import FormInputPassword from "../component/FormValidation/formInputPassword";
import logo from "../assets/images/logo.jpg";
import Loading from "../component/loading/loading";
import Popup from "../component/PopUp/popUp";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFullnameValid, setIsFullnameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordConfirmationValid, setIsPasswordConfirmationValid] = useState(true);
  const [error,setError] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }

  function handleFullnameChange(event) {
    const value = event.target.value;
    setFullname(value);
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
  }

  function handlePasswordConfirmationChange(event) {
    const value = event.target.value;
    setPasswordConfirmation(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const emailIsValid = validateEmail(email);
    const fullnameIsValid = validateFullname(fullname);
    const passwordIsValid = validatePassword(password);
    const passwordConfirmationIsValid = validatePasswordConfirmation(passwordConfirmation);

    setIsEmailValid(emailIsValid);
    setIsFullnameValid(fullnameIsValid);
    setIsPasswordValid(passwordIsValid);
    setIsPasswordConfirmationValid(passwordConfirmationIsValid);

    if (emailIsValid && fullnameIsValid && passwordIsValid && passwordConfirmationIsValid) {
      let userData = {"full_name":fullname,"email":email,"password":password};
      setIsLoading(true);
      setTimeout(() => {
        axios.post('https://nice-pear-spider-boot.cyclic.app/api/register', userData)
          .then(() => {
            setIsLoading(false);
            window.location='login';
          })
          .catch((error) => {
            setIsLoading(false);
            setError(error);
          });
      }, 2000);
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateFullname(fullname) {
    return fullname.trim() !== "";
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  function validatePasswordConfirmation(passwordConfirmation) {
    return passwordConfirmation === password;
  }

  const isSubmitEnabled = email !== "" && fullname !== "" && password !== "" && passwordConfirmation !== "";

  const token = localStorage.getItem('token');
  if(token){
    window.location='home';
  }

  return (
    <section className="gradient-form bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center h-screen">
      <div className="container">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-2/3 xl:w-1/2">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="flex flex-col lg:flex-row">
                {/* Left column container */}
                <div className=" lg:w-1/2 p-6 flex justify-center items-center">
                  <img src={logo} alt="belum ada source" className="max-w-xs rounded" />
                </div>

                {/* Right column container register form */}
                <div className="bg-white lg:w-1/2 p-6">
                  <h2 className="login-heading">Register</h2>
                  <form className="login-form" onSubmit={handleSubmit}>
                    <FormInput
                      label="Email"
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      errorMessage={!isEmailValid && "Please enter a valid email address."}
                    />
                    <FormInput
                      label="Fullname"
                      id="fullname"
                      type="text"
                      value={fullname}
                      onChange={handleFullnameChange}
                      errorMessage={!isFullnameValid && "Please enter your fullname."}
                    />
                    <FormInputPassword
                      label="Password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      errorMessage={!isPasswordValid && "Please enter a password with at least 8 characters."}
                    />
                    <FormInputPassword
                      label="Confirm Password"
                      id="passwordConfirmation"
                      value={passwordConfirmation}
                      onChange={handlePasswordConfirmationChange}
                      errorMessage={!isPasswordConfirmationValid && "Passwords do not match."}
                    />
                    <button
                      className={`bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${
                        !isSubmitEnabled ? "opacity-50 cursor-not-allowed" : ""
                     }`}
                      type="submit"
                      disabled={!isSubmitEnabled}
                    >
                      {isLoading ? <Loading /> : "Register"}
                    </button>
                    {error && (
                      <div className="text-red-600 mt-2 text-sm">
                        {error ? (
                          <Popup message={error}  />
                        ) : (
                          <span className="cursor-pointer">
                            {error}
                          </span>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;