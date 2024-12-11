/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetBooksQuery,
  useGetReservationsQuery,
  useReturnBookMutation,
} from '../Slices/apiSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const decodedToken = token ? jwtDecode(token) : {};
  const { email, firstname } = decodedToken;

  const {
    data: booksData,
    isLoading: loadingBooks,
    isError: booksError,
  } = useGetBooksQuery();

  const {
    data: reservationsData,
    isLoading: loadingReservations,
    isError: reservationsError,
  } = useGetReservationsQuery(undefined, {
    skip: !token,
  });

  const [returnBook] = useReturnBookMutation();

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    if (booksData && reservationsData) {
      const books = booksData.books || [];
      const reservations = reservationsData.reservation || [];

      const updatedCheckedOutBooks = reservations.map((reservation) => {
        const matchingBook = books.find(
          (book) => book.title === reservation.title
        );
        return matchingBook
          ? { ...matchingBook, reservationId: reservation.id }
          : reservation;
      });

      setCheckedOutBooks(updatedCheckedOutBooks);
    }
  }, [booksData, reservationsData, email, navigate]);

  const handleReturn = async (reservationId) => {
    if (!token) {
      alert('Please log in to return this book.');
      return;
    }

    try {
      const response = await returnBook(reservationId).unwrap();
      console.log('Book returned successfully:', response);

      // Remove the returned book from the UI
      setCheckedOutBooks((prevBooks) =>
        prevBooks.filter((book) => book.reservationId !== reservationId)
      );
      alert('Book successfully return.');
    } catch (error) {
      console.error('Return failed:', error);
      alert('Failed to return the book. Please try again.');
    }
  };

  if (loadingBooks || loadingReservations) return <p>Loading...</p>;
  if (booksError || reservationsError) return <p>Error fetching data.</p>;

  return (
    <>
      <div>
        <h1 className="header">Welcome, {firstname || email}</h1>
        <h3>Your Checked-Out Books:</h3>
        <div className="scrollable-box">
          {checkedOutBooks.length > 0 ? (
            <ul>
              {checkedOutBooks.map((book) => (
                <li key={book.reservationId}>
                  <h4>{book.title}</h4>
                  <p>Author: {book.author}</p>
                  <button
                    onClick={() => handleReturn(book.reservationId)}
                    className="btn btn-danger btn-lg"
                  >
                    Return
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books checked out.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
