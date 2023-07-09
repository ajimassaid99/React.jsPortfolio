import { useState } from 'react';
import FormInput from './FormValidation/formInput';
import FormInputPassword from './FormValidation/formInputPassword';
import "./style/register.css";
import "./style/input.css";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [nomorTelepon, setNomorTelepon] = useState('');
    const [alamat, setAlamat] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nomorTeleponError, setNomorTeleponError] = useState('');
    const [alamatError, setAlamatError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
    const handleRegister = (event) => {
      event.preventDefault();
      // validasi form
      let isFormValid = true;
  
      if (!firstName) {
        setFirstNameError('Field First Name wajib diisi');
        isFormValid = false;
      } else {
        setFirstNameError('');
      }
      if (!lastName) {
        setLastNameError('Field Last Name wajib diisi');
        isFormValid = false;
      } else {
        setLastNameError('');
      }
      if (!email) {
        setEmailError('Field Email wajib diisi');
        isFormValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError('Email tidak valid');
        isFormValid = false;
      } else {
        setEmailError('');
      }
      if (!nomorTelepon) {
        setNomorTeleponError('Field Nomor Telepon wajib diisi');
        isFormValid = false;
      } else if (!/^\d+$/.test(nomorTelepon)) {
        setNomorTeleponError('Nomor telepon tidak valid');
        isFormValid = false;
      } else {
        setNomorTeleponError('');
      }
      if (!alamat) {
        setAlamatError('Field Alamat wajib diisi');
        isFormValid = false;
      } else {
        setAlamatError('');
      }
      if (!password) {
        setPasswordError('Field Password wajib diisi');
        isFormValid = false;
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)) {
        setPasswordError('Password harus mengandung huruf dan angka');
        isFormValid = false;
      } else {
        setPasswordError('');
      }
      if (!confirmPassword) {
        setConfirmPasswordError('Field confirm Password wajib diisi');
        isFormValid = false;
      } else{
      if (password !== confirmPassword) {
        setConfirmPasswordError('Konfirmasi password tidak sama');
        isFormValid = false;
      } else {
        setConfirmPasswordError('');
      }}
  
      if (isFormValid) {
        alert("Name  : "+ firstName +" "+ lastName+"\nEmail   : "+email+"\ntelp      : "+ nomorTelepon+"\nalamat : "+ alamat);
      }
    }
  
    return (
      <div className="form-container">
        <form onSubmit={handleRegister}>
          <table>
            <tbody>
              <tr>
                <td>
                  <FormInput
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    errorMessage={firstNameError}
                    id="firstName"
                    name="firstName"
                    error={firstNameError}
                  />
                </td>
                <td>
                  <FormInput
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    errorMessage={lastNameError}
                    id="lastName"
                    name="lastName"
                    error={lastNameError}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormInput
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    errorMessage={emailError}
                    id="email"
                    name="email"
                    type="email"
                    error={emailError}
                  />
                </td>
                <td>
                  <FormInput
                    label="Nomor Telepon"
                    value={nomorTelepon}
                    onChange={(e) => setNomorTelepon(e.target.value)}
                    errorMessage={nomorTeleponError}
                    id="nomorTelepon"
                    name="nomorTelepon"
                    type="tel"
                    error={nomorTeleponError}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <FormInput
                    label="Alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    errorMessage={alamatError}
                    id="alamat"
                    name="alamat"
                    type="textarea"
                    error={alamatError}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormInputPassword
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    errorMessage={passwordError}
                    id="password"
                    name="password"
                    error={passwordError}
                  />
                </td>
                <td>
                  <FormInputPassword
                    label="Konfirmasi Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    errorMessage={confirmPasswordError}
                    id="confirmPassword"
                    name="confirmPassword"
                    error={confirmPasswordError}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button className="register-button">Register</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
  const RegisterForm = () => {
    return (
      <div className="register-form">
        <Register />
      </div>
    )
  }
  export default RegisterForm;