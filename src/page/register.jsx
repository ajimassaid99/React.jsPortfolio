import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@material-tailwind/react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleRememberMeChange(event) {
    setRememberMe(event.target.checked);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Do something with email, password, and rememberMe state
    console.log(email, password, rememberMe);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input type="email" label="Email address" autoComplete="email" required value={email} onChange={handleEmailChange} />
            <Input type="password" label="Password" autoComplete="current-password" required value={password} onChange={handlePasswordChange} />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" size="lg" block>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}