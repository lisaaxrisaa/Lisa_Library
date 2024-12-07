/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import {
//   useGetBooksQuery,
//   useUpdateBookAvailabilityMutation,
// } from '../Slices/apiSlice';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const Account = () => {
//   const navigate = useNavigate();
//   const token = useSelector((state) => state.auth.token);
//   const decodedToken = token ? jwtDecode(token) : {};
//   const { email, firstname } = decodedToken;

//   // Fetch books data
//   const { data, isLoading, isError } = useGetBooksQuery();
//   console.log('API Response:', data);
//   const [updateBookAvailability] = useUpdateBookAvailabilityMutation();

//   // Safely extract books
//   const books = Array.isArray(data?.books) ? data.books : [];
//   console.log('Books Data:', books);

//   // Filter checked-out books
//   const checkedOutBooks = books.filter((book) => !book.available);
//   console.log('Checked-Out Books:', checkedOutBooks);

//   const handleReturn = async (bookId) => {
//     try {
//       await updateBookAvailability({ bookId, available: true }).unwrap();
//       alert('Book returned successfully!');
//     } catch (error) {
//       console.error('Return failed:', error);
//       alert('Failed to return the book.');
//     }
//   };

//   useEffect(() => {
//     if (!email) {
//       console.log('No user found in Account.jsx');
//       navigate('/login');
//     }
//   }, [email, navigate]);

//   if (!email) return null; // Prevent rendering until navigation

//   if (isLoading) return <p>Loading your checked-out books...</p>;
//   if (isError) return <p>Error fetching checked-out books.</p>;

//   return (
//     <>
//       <h2>Welcome, {firstname || email}</h2>
//       <h3>Your Checked-Out Books:</h3>
//       {checkedOutBooks.length ? (
//         <ul>
//           {checkedOutBooks.map((book) => (
//             <li key={book.id}>
//               <h4>{book.title}</h4>
//               <p>Author: {book.author}</p>
//               <p>Due Date: {book.dueDate || 'No due date provided'}</p>
//               <button onClick={() => handleReturn(book.id)}>Return</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>You have no checked-out books.</p>
//       )}
//     </>
//   );
// };

// export default Account;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetBooksQuery,
  useUpdateBookAvailabilityMutation,
  useGetReservationsQuery,
} from '../Slices/apiSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  let decodedToken = {};
  try {
    decodedToken = token ? jwtDecode(token) : {};
  } catch (error) {
    console.error('Error decoding token:', error);
  }
  const { email, firstname } = decodedToken;

  const {
    data: booksData = [],
    isLoading: loadingBooks,
    isError: booksError,
  } = useGetBooksQuery();
  const {
    data: reservations = [],
    isLoading: loadingReservations,
    isError: reservationsError,
  } = useGetReservationsQuery();
  const [updateBookAvailability] = useUpdateBookAvailabilityMutation();

  const books = Array.isArray(booksData) ? booksData : [];
  const reservationsList = Array.isArray(reservations) ? reservations : [];

  const checkedOutBooks = reservationsList
    .map((reservation) => books.find((book) => book.id === reservation.bookId))
    .filter(Boolean);

  console.log('Reservations Data:', reservationsList);
  console.log('Books Data:', books);
  console.log('Checked-Out Books:', checkedOutBooks);

  const handleReturn = async (bookId) => {
    try {
      await updateBookAvailability({ bookId, available: true }).unwrap();
      alert('Book returned successfully!');
    } catch (error) {
      console.error('Return failed:', error);
      alert('Failed to return the book.');
    }
  };

  useEffect(() => {
    if (!email) {
      console.log('No user found in Account.jsx');
      navigate('/login');
    }
  }, [email, navigate]);

  if (!email) return null;
  if (loadingBooks || loadingReservations) return <p>Loading...</p>;
  if (booksError || reservationsError) return <p>Error fetching data.</p>;

  return (
    <>
      <h2>Welcome, {firstname || email}</h2>
      <h3>Your Checked-Out Books:</h3>
      {checkedOutBooks.length > 0 ? (
        <ul>
          {checkedOutBooks.map((book) => (
            <li key={book.id}>
              <h4>{book.title}</h4>
              <p>Author: {book.author}</p>
              <p>Due Date: {book.dueDate || 'No due date provided'}</p>
              <button onClick={() => handleReturn(book.id)}>Return</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no checked-out books.</p>
      )}
    </>
  );
};

export default Account;
