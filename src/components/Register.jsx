/* TODO - add your code to create a functional React component that renders a registration form */

// function registration() {
//   return <h2>Registration Forms</h2>;
// }

// // eslint-disable-next-line no-undef
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<registration form />);

// export default registration;

// import React, { useState } from 'react';
// import { useCreateUserMutation } from '../Slices/apiSlice';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../Slices/authSlice';

// const Register = () => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   // const [createUser, { isLoading, isError, isSuccess }] =
//   //   useCreateUserMutation();
//   const [createUser] = useCreateUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     console.log('Updated Form Data:', { ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Registration Data:', formData);
//     try {
//       const result = await createUser(formData).unwrap();
//       dispatch(setUser(result));
//       alert(
//         'Registration successful! Welcome, ${result.username}. You can now log in.'
//       );
//       navigate('/login');
//     } catch (error) {
//       alert('Registration failed. Please try again.');
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <>
//       <div>
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Username:</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//         {isSuccess && <p>Registration successful! Please log in.</p>}
//         {isError && <p>Error occurred during registration. Try again.</p>}
//       </div>
//     </>
//   );
// };

// export default Register;

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
    console.log('Updated Form Data:', { ...formData, [name]: value }); // Debugging log
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Payload:', formData); // Debugging log
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
      <h2>Register</h2>
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
    </>
  );
};

export default Register;
