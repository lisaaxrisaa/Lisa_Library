/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetBookByIdQuery,
  useUpdateBookAvailabilityMutation,
  useLazyGetReservationsQuery,
} from '../Slices/apiSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id);
  const book = data?.book;
  const [updateBookAvailability] = useUpdateBookAvailabilityMutation();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [refetchReservations] = useLazyGetReservationsQuery();

  console.log('Book ID:', id);
  console.log('Book Data:', book);

  // const handleCheckout = async () => {
  //   if (!token) {
  //     alert('Please log in to check out this book.');
  //     return;
  //   }
  //   console.log('Attempting Checkout with:', { bookId: id, available: false });

  //   //   try {
  //   //     const response = await updateBookAvailability({
  //   //       bookId: id,
  //   //       available: false,
  //   //     }).unwrap();
  //   //     console.log('Checkout Response:', response);

  //   //     // Refetch reservations after successful checkout
  //   //     console.log('Refetching Reservations...');
  //   //     const reservationsResponse = await refetchReservations();
  //   //     console.log('Updated Reservations:', reservationsResponse);

  //   //     alert('Book checked out successfully!');
  //   //   } catch (error) {
  //   //     console.error('Checkout failed:', error);
  //   //     alert('Failed to check out the book.');
  //   //   }
  //   // };

  const handleCheckout = async () => {
    if (!token) {
      alert('Please log in to check out this book.');
      return;
    }

    try {
      console.log('Attempting Checkout with:', { bookId: id });
      const response = await updateBookAvailability({
        bookId: id,
        available: false, // Marking the book as checked out
      }).unwrap();
      console.log('Checkout Response:', response);

      // Refetch reservations after successful checkout
      await refetchReservations();
      alert('Book checked out successfully!');
      setIsCheckedOut(true);
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
  if (!book) return <p>Book not found.</p>;

  console.log('Book Data:', book);

  return (
    <>
      <img src={book.coverimage} alt={book.title} />
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Available: {book.available ? 'Yes' : 'No'}</p>
      {/* {book.available && token && (
        <button onClick={handleCheckout} disabled={!token}>
          {book.available ? 'Checkout' : 'Attempt Checkout'}
        </button>
      )} */}
      {token && (
        <button
          onClick={handleCheckout}
          disabled={isCheckedOut}
          style={{
            backgroundColor: isCheckedOut ? 'grey' : 'blue',
            color: 'white',
            cursor: isCheckedOut ? 'not-allowed' : 'pointer',
          }}
        >
          {isCheckedOut ? 'Checked Out' : 'Checkout'}
        </button>
      )}
    </>
  );
};

export default SingleBook;
