/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetBookByIdQuery } from '../store/slices/apiSlice';

// const SingleBook = () => {
//   const { id } = useParams(); // Get the book ID from the URL
//   const { data: book, isLoading, isError } = useGetBookByIdQuery(id); // Use RTK Query hook

//   if (isLoading) return <p>Loading book details...</p>;
//   if (isError) return <p>Error loading book details.</p>;
//   if (!book) return <p>No book found.</p>;

//   return (
//     <>
//       <img src={book.coverimage} alt={book.title} />
//       <h1>{book.title}</h1>
//       <p>
//         <strong>Author:</strong> {book.author}
//       </p>
//       <p>
//         <strong>Description:</strong> {book.description}
//       </p>
//       <p>
//         <strong>Available:</strong> {book.available ? 'Yes' : 'No'}
//       </p>
//       {book.available && <button>Checkout</button>}{' '}
//       {/* Optional: Checkout button */}
//     </>
//   );
// };

// export default SingleBook;

import React from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetBookByIdQuery,
  useUpdateBookAvailabilityMutation,
} from '../Slices/apiSlice';
import { useSelector } from 'react-redux';

const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id);
  const book = data?.book;
  const [updateBookAvailability] = useUpdateBookAvailabilityMutation();
  // const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  // console.log('User:', user);
  // console.log('Setting user:', user);

  console.log('Book Data:', book);

  const handleCheckout = async () => {
    if (!token) {
      alert('Token is missing. Please log in again.');
      return;
    }
    try {
      await updateBookAvailability({
        bookId: book.id,
        available: false,
      }).unwrap();
      alert('Book checked out successfully!');
      // console.log('Checkout Result:', result);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to check out the book.');
    }
  };

  if (isLoading) return <p>Loading book details...</p>;
  if (isError)
    return <p>Error loading book details. Please try again later.</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <>
      <img src={book.coverimage} alt={book.title} />
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Available: {book.available ? 'Yes' : 'No'}</p>
      {book.available && (
        <button onClick={handleCheckout} disabled={!token}>
          Checkout
        </button>
      )}
    </>
  );
};

export default SingleBook;
