import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    newPassword: '', 
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    newPassword: '', 
  });

  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateFields = () => {
    let formErrors = {};
    if (!formData.firstName && action === 'Sign Up') formErrors.firstName = 'First Name is required';
    if (!formData.lastName && action === 'Sign Up') formErrors.lastName = 'Last Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.phoneNumber && action === 'Sign Up') formErrors.phoneNumber = 'Phone Number is required';
    if (!formData.password && (action === 'Sign Up' || action === 'Login')) formErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword && action === 'Sign Up') formErrors.confirmPassword = 'Passwords do not match';
    if (action === 'Forgot Password' && !formData.newPassword) formErrors.newPassword = 'New Password is required';

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      formErrors.email = 'Invalid email format';
    }
  
    const phonePattern = /^[0-9]{10}$/;
    if (formData.phoneNumber && !phonePattern.test(formData.phoneNumber)) {
      formErrors.phoneNumber = 'Phone number must be 10 digits';
    }
  
    if (formData.password && (formData.password.length < 6 || formData.password.length > 20)) {
      formErrors.password = 'Password must be between 6 and 20 characters';
    }
  
    return formErrors;
  };

  const handleSignup = async () => {
    const formErrors = validateFields();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/freshers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert('Sign Up successful!');
        setAction('Login');
      } else {
        alert('Error during sign up');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during sign up');
    }
  };

  const handleLogin = async () => {
    const formErrors = validateFields();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/freshers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert('Login successful!');
        navigate('/Home');  // Navigate to the Home page on successful login
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred during login');
    }
  };

  const handleForgotPassword = async () => {
    const formErrors = validateFields();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/freshers/update/{fresher_Id}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        alert('Password reset successful!');
        setAction('Login');
      } else {
        alert('Error during password reset');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An error occurred during password reset');
    }
  };

  return (
    <form className='container'>
      <div className="header">
        <div className='text'>{action}</div>
        <div className="underline"></div>
      </div>

      <div className='inputs'>
        {action === "Sign Up" && (
          <>
            <div className={`input ${errors.firstName ? 'error' : ''}`}>
              <img src={user_icon} alt="User Icon" />
              <input
                type="text"
                placeholder='First Name *'
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}

            <div className={`input ${errors.lastName ? 'error' : ''}`}>
              <img src={user_icon} alt="User Icon" />
              <input
                type="text"
                placeholder='Last Name *'
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
          </>
        )}

        <div className={`input ${errors.email ? 'error' : ''}`}>
          <img src={email_icon} alt="Email Icon" />
          <input
            type="email"
            placeholder='Email Id *'
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        {errors.email && <div className="error-message">{errors.email}</div>}

        {action === "Sign Up" && (
          <div className={`input ${errors.phoneNumber ? 'error' : ''}`}>
            <img src={user_icon} alt="Phone Icon" />
            <input
              type="text"
              placeholder='Phone Number *'
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {action === "Sign Up" && errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}

        {(action === "Sign Up" || action === "Login") && (
          <div className={`input ${errors.password ? 'error' : ''}`}>
            <img src={password_icon} alt="Password Icon" />
            <input
              type="password"
              placeholder='Password *'
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {(action === "Sign Up" || action === "Login") && errors.password && <div className="error-message">{errors.password}</div>}

        {action === "Sign Up" && (
          <div className={`input ${errors.confirmPassword ? 'error' : ''}`}>
            <img src={password_icon} alt="Password Icon" />
            <input
              type="password"
              placeholder='Confirm Password *'
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {action === "Sign Up" && errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

        {action === "Forgot Password" && (
          <div className={`input ${errors.newPassword ? 'error' : ''}`}>
            <img src={password_icon} alt="Password Icon" />
            <input
              type="password"
              placeholder='New Password *'
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {action === "Forgot Password" && errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
      </div>

      {action === "Login" && <div className='forgot-password' onClick={() => setAction("Forgot Password")}>Forgot Password? <span>Click Here!</span></div>}

      <div className="submit-container">
        {action === "Sign Up" ? (
          <div className="submit" onClick={handleSignup}>Create Account</div>
        ) : action === "Login" ? (
          <div className="submit" onClick={handleLogin}>Login</div>
        ) : (
          <div className="submit" onClick={handleForgotPassword}>Reset Password</div>
        )}
      </div>

      <div className="navigation-links">
        {action === "Login" ? (
          <div className="link" onClick={() => setAction("Sign Up")}>New user?<span> Register</span></div>
        ) : action === "Sign Up" ? (
          <div className="link" onClick={() => setAction("Login")}>Already have an account? <span>Log In</span></div>
        ) : (
          <div className="link" onClick={() => setAction("Login")}>Back to Login</div>
        )}
      </div>
      
     
    </form>
  
    
  );
};


export default LoginSignup;
