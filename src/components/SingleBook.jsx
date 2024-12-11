/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   useGetBookByIdQuery,
//   useUpdateBookAvailabilityMutation,
//   useLazyGetReservationsQuery,
// } from '../Slices/apiSlice';
// import { useSelector } from 'react-redux';
// import { useState } from 'react';

// const SingleBook = () => {
//   const { id } = useParams();
//   const { data, isLoading, isError } = useGetBookByIdQuery(id);
//   const book = data?.book;
//   const [updateBookAvailability] = useUpdateBookAvailabilityMutation();
//   const [isCheckedOut, setIsCheckedOut] = useState(false);
//   const token = useSelector((state) => state.auth.token);
//   const [refetchReservations] = useLazyGetReservationsQuery();

//   console.log('Book ID:', id);
//   console.log('Book Data:', book);

//   // const handleCheckout = async () => {
//   //   if (!token) {
//   //     alert('Please log in to check out this book.');
//   //     return;
//   //   }
//   //   console.log('Attempting Checkout with:', { bookId: id, available: false });

//   //   //   try {
//   //   //     const response = await updateBookAvailability({
//   //   //       bookId: id,
//   //   //       available: false,
//   //   //     }).unwrap();
//   //   //     console.log('Checkout Response:', response);

//   //   //     // Refetch reservations after successful checkout
//   //   //     console.log('Refetching Reservations...');
//   //   //     const reservationsResponse = await refetchReservations();
//   //   //     console.log('Updated Reservations:', reservationsResponse);

//   //   //     alert('Book checked out successfully!');
//   //   //   } catch (error) {
//   //   //     console.error('Checkout failed:', error);
//   //   //     alert('Failed to check out the book.');
//   //   //   }
//   //   // };

//   const handleCheckout = async () => {
//     if (!token) {
//       alert('Please log in to check out this book.');
//       return;
//     }

//     try {
//       console.log('Attempting Checkout with:', { bookId: id });
//       const response = await updateBookAvailability({
//         bookId: id,
//         available: false,
//       }).unwrap();
//       console.log('Checkout Response:', response);

//       // Refetch reservations after successful checkout
//       await refetchReservations();
//       alert('Book checked out successfully!');
//       setIsCheckedOut(true);
//     } catch (error) {
//       console.error('Checkout failed:', error);
//       alert('Failed to check out the book. Please try again later.');
//     }
//   };

//   if (isLoading) return <p>Loading book details...</p>;
//   if (isError || !book) {
//     console.error('Error or no book data:', { isError, book });
//     return <p>Error loading book details. Please try again later.</p>;
//   }
//   if (!book) return <p>Book not found.</p>;

//   console.log('Book Data:', book);

//   return (
//     <>
//       <img src={book.coverimage} alt={book.title} />
//       <h1>{book.title}</h1>
//       <p>Author: {book.author}</p>
//       <p>Description: {book.description}</p>
//       <p>Available: {book.available ? 'Yes' : 'No'}</p>
//       {/* {token && (
//         <button
//           onClick={handleCheckout}
//           disabled={isCheckedOut}
//           style={{
//             backgroundColor: isCheckedOut ? 'grey' : 'blue',
//             color: 'white',
//             cursor: isCheckedOut ? 'not-allowed' : 'pointer',
//           }}
//         >
//           {isCheckedOut ? 'Checked Out' : 'Checkout'}
//         </button>
//       )} */}
//       {token ? (
//         <button
//           onClick={handleCheckout}
//           disabled={isCheckedOut || !book.available}
//           style={{
//             backgroundColor: isCheckedOut || !book.available ? 'grey' : 'blue',
//             color: 'white',
//             cursor: isCheckedOut || !book.available ? 'not-allowed' : 'pointer',
//           }}
//         >
//           {isCheckedOut
//             ? 'Checked Out'
//             : book.available
//             ? 'Checkout'
//             : 'Unavailable'}
//         </button>
//       ) : (
//         <p>You need to log in to check out this book.</p>
//       )}
//     </>
//   );
// };

// export default SingleBook;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetBookByIdQuery,
  useUpdateBookAvailabilityMutation,
  useLazyGetReservationsQuery,
} from '../Slices/apiSlice';
import { useSelector } from 'react-redux';

const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id);
  const book = data?.book;
  const [updateBookAvailability] = useUpdateBookAvailabilityMutation();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [refetchReservations] = useLazyGetReservationsQuery();

  const handleCheckout = async () => {
    if (!token) {
      alert('Please log in to check out this book.');
      return;
    }

    try {
      console.log('Attempting Checkout with:', { bookId: id });
      const response = await updateBookAvailability({
        bookId: id,
        available: false, // Mark as unavailable after checkout
      }).unwrap();
      console.log('Checkout Response:', response);

      await refetchReservations(); // Refresh reservations
      alert('Book checked out successfully!');
      setIsCheckedOut(true); // Update local state to indicate checkout
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to check out the book. Please try again later.');
    }
  };

  if (isLoading) return <p>Loading book details...</p>;
  if (isError || !book) {
    console.error('Error or no book data:', { isError, book });
    return <p>Error loading book details. Please try again later.</p>;
  }

  return (
    <>
      <div className="book-details">
        <h2>About the Book...</h2>
      </div>
      <div className="scrollable-box">
        <img src={book.coverimage} alt={book.title} />
        <h1>{book.title}</h1>
        <p>Author: {book.author}</p>
        <p>Description: {book.description}</p>
        <p>
          Status:{' '}
          {isCheckedOut
            ? 'Checked Out'
            : book.available
            ? 'Available'
            : 'Unavailable'}
        </p>
        {token ? (
          <button
            onClick={handleCheckout}
            disabled={isCheckedOut}
            className={`btn btn-lg ${
              isCheckedOut ? 'btn-secondary' : 'btn-primary'
            }`}
          >
            {isCheckedOut ? 'Checked Out' : 'Checkout'}
          </button>
        ) : (
          <button
            disabled={true}
            style={{
              backgroundColor: 'grey',
              color: 'white',
              cursor: 'not-allowed',
            }}
          >
            Login to Checkout
          </button>
        )}
      </div>
    </>
  );
};

export default SingleBook;
