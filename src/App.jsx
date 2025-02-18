import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { logout } from './Slices/authSlice';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import BookList from './components/Books';
import Navigation from './components/Navigation';
import SingleBook from './components/SingleBook';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          console.warn('Token expired, logging out.');
          dispatch(logout());
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        dispatch(logout());
      }
    }
  }, [token, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<SingleBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
