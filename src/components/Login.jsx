/* TODO - add your code to create a functional React component that renders a login form */

import React, { useState } from 'react';
import { useLoginUserMutation } from '../Slices/apiSlice';
import { useNavigate } from 'react-router-dom';

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
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    console.log('Updated Credentials:', { ...credentials, [name]: value }); // Debugging log
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Login Payload:', credentials);
      const response = await loginUser(credentials).unwrap();
      alert(`Welcome, ${response.user.firstname}!`);
      navigate('/account');
    } catch (error) {
      console.error('Error response:', error); // Log the error details
      alert(`Login failed: ${error.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <>
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
    </>
  );
};

export default Login;
