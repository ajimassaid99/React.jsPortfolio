import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../App/feature/auth/actions';
import FormInput from '../component/FormValidation/formInput';
import FormInputPassword from '../component/FormValidation/formInputPassword';
import logo from '../assets/images/logo.jpg';
import Loading from '../component/loading/loading';
import Popup from '../component/PopUp/popUp';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const data = useSelector((state) => state.auth.user);
  const [loginError, setLoginError] = useState(false);


  useEffect(() => {
    if (error) {
      setEmail('');
      setPassword('');
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      },2000)
    } else if (data) {
        window.location.href = "home";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);
    setIsEmailValid(emailIsValid);
    setIsPasswordValid(passwordIsValid);

    if (emailIsValid && passwordIsValid) {
      dispatch(login({ email, password }));
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  const isSubmitEnabled = email !== '' && password !== '';

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
                <div className="lg:w-1/2 p-6 flex justify-center items-center">
                  <img src={logo} alt="belum ada source" className="max-w-xs rounded" />
                </div>

                {/* Right column container login form */}
                <div className="bg-white lg:w-1/2 p-6">
                  <h2 className="login-heading">Login</h2>
                  <form className="login-form" onSubmit={handleSubmit}>
                    <FormInput
                      label="Email"
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      errorMessage={!isEmailValid && "Please enter a valid email address."}
                    />
                    <FormInputPassword
                      label="Password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      errorMessage={!isPasswordValid && "Please enter a password with at least 8 characters."}
                    />
                    <button className={`bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${!isSubmitEnabled ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit" disabled={!isSubmitEnabled || isLoading}>
                      {isLoading ? <Loading color={'white'}/> : 'Login'}
                    </button>
                    {loginError && (
              <Popup message="Email/Password Salah" bgcolor="red-500" />
            )}
                  </form>
                  <a href="register">Don't have accont? Register Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
