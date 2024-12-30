/* TODO - add your code to create a functional React component that renders a login form */

import React, { useState } from 'react';
import { useLoginUserMutation } from '../Slices/apiSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setToken } from '../Slices/authSlice';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Login Payload:', credentials);
      const response = await loginUser(credentials).unwrap();
      console.log('Login Response:', response);

      const token = response.token; // Extract token from response
      if (!token) {
        throw new Error('No token returned from login response');
      }

      dispatch(setToken(token));
      console.log('Token stored in Redux:', token);

      // Optionally store token in localStorage for persistence
      localStorage.setItem('token', token);

      // Decode token for user information (optional)
      const decoded = jwtDecode(token);
      alert(`Login successful! Welcome, ${decoded.email || 'User'}.`);
      navigate('/account');
    } catch (error) {
      console.error('Login failed:', error);
      alert(`Login failed: ${error.data?.message || error.message}`);
    }
  };

  return (
    <>
      <h1 className="header">Login</h1>
      <div className="scrollable-box">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
