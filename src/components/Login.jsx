/* TODO - add your code to create a functional React component that renders a login form */

import React, { useState } from 'react';
import { useLoginUserMutation } from '../Slices/apiSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setToken } from '../Slices/authSlice';
// import { setUser } from '../Slices/authSlice';

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });
//   const [loginUser] = useLoginUserMutation();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await loginUser(credentials).unwrap();
//       alert(`Welcome, ${user.username}!`);
//       navigate('/account');
//     } catch {
//       alert('Login failed. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Username"
//         value={credentials.username}
//         onChange={(e) =>
//           setCredentials({ ...credentials, username: e.target.value })
//         }
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={credentials.password}
//         onChange={(e) =>
//           setCredentials({ ...credentials, password: e.target.value })
//         }
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

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

      const token = response.token;

      if (!token) {
        throw new Error('No token returned from login response');
      }

      // Dispatch setToken, which also decodes and stores the user
      dispatch(setToken(token));
      console.log('Token stored in Redux:', response.token);
      // Optionally store token in localStorage for persistence
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      alert(`Login successful! Welcome, ${decoded.email || 'User'}.`);
      navigate('/account');
    } catch (error) {
      console.error('Login failed:', error);
      alert(`Login failed: ${error.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
