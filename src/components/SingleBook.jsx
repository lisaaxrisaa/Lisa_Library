/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

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

  if (isLoading) return <p>Loading book details...</p>;
  if (isError || !book) {
    console.error('Error or no book data:', { isError, book });
    return <p>Error loading book details. Please try again later.</p>;
  }

  const handleCheckout = async () => {
    if (!token) {
      alert('Please log in to check out this book.');
      return;
    }

    try {
      await updateBookAvailability({
        bookId: id,
        available: false,
      }).unwrap();
      await refetchReservations();
      alert('Book checked out successfully!');
      setIsCheckedOut(true);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to check out the book. Please try again later.');
    }
  };

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
