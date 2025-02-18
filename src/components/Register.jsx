/* TODO - add your code to create a functional React component that renders a registration form */

import React, { useState } from 'react';
import { useCreateUserMutation } from '../Slices/apiSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    password: '',
    email: '',
  });
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData).unwrap();
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert(`Registration failed: ${error.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <>
      <h1 className="header">Register</h1>
      <div className="scrollable-box">
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
          <br />
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
