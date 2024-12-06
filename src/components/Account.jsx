/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import Register from './Register';
import { useReturnBookMutation } from '../Slices/apiSlice';

const Account = () => {
  const user = useSelector((state) => state.auth.user);
  const checkedOutBooks =
    useSelector((state) => state.auth.checkedOutBooks) || [];
  const [showLogin, setShowLogin] = useState(true);
  const [returnBook] = useReturnBookMutation();

  const handleReturn = async (id) => {
    try {
      await returnBook({ bookId: id, userId: user.id }).unwrap();
      alert('Book returned successfully!');
    } catch (error) {
      console.error('Return failed:', error);
      alert('Failed to return the book.');
    }
  };

  return (
    <>
      {user ? (
        <>
          <h2>Welcome, {user.username}</h2>
          <p>Email: {user.email || 'Email not provided'}</p>
          <h3>Your Checked-Out Books:</h3>
          {checkedOutBooks.length ? (
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
      ) : (
        <>
          <h2>Welcome to the Account Page</h2>
          {showLogin ? <Login /> : <Register />}
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'Go to Register' : 'Go to Login'}
          </button>
        </>
      )}
    </>
  );
};

export default Account;
