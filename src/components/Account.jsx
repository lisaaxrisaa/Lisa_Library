/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetBooksQuery, useGetReservationsQuery } from '../Slices/apiSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const decodedToken = token ? jwtDecode(token) : {};
  const { email, firstname } = decodedToken;

  const {
    data: booksData,
    isLoading: loadingBooks,
    isError: booksError,
    refetch: refetchBooks,
  } = useGetBooksQuery();
  const {
    data: reservationsData,
    isLoading: loadingReservations,
    isError: reservationsError,
    refetch: refetchReservations,
  } = useGetReservationsQuery();

  useEffect(() => {
    console.log('Raw Books Data:', booksData);
    console.log('Raw Reservations Data:', reservationsData);
    refetchBooks();
    refetchReservations();
  }, [booksData, reservationsData, refetchBooks, refetchReservations]);

  const books = booksData?.books || [];
  const reservations = reservationsData?.reservation || [];

  console.log('Processed Books:', books);
  console.log('Processed Reservations:', reservations);

  if (!email) {
    navigate('/login');
    return null;
  }

  if (loadingBooks || loadingReservations) return <p>Loading...</p>;
  if (booksError || reservationsError) return <p>Error fetching data.</p>;

  return (
    <div>
      <h2>Welcome, {firstname || email}</h2>
      <h3>Your Checked-Out Books:</h3>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <p>{reservation.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books checked out.</p>
      )}
    </div>
  );
};

export default Account;
