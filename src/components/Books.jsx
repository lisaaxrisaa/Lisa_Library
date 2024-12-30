/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetBooksQuery } from '../Slices/apiSlice';
import { Link } from 'react-router-dom';

const BookList = () => {
  // const token = useSelector((state) => state.auth.token);
  const { data, isLoading, isError } = useGetBooksQuery();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books.</p>;

  const books = data?.books || [];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="header">Welcome to Lisa's Library</h1>
      <div className="page-title">
        <input
          className="search-bar"
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
        <br />
        <h2>Book List:</h2>
      </div>
      <div className="scroll-box-container">
        <div className="scrollable-box">
          <ul>
            {filteredBooks.length ? (
              filteredBooks.map((book) => (
                <li key={book.id}>
                  <Link to={`/books/${book.id}`}>
                    <h3>{book.title}</h3>
                  </Link>
                  <p>Author: {book.author}</p>
                </li>
              ))
            ) : (
              <li>No books match your search.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BookList;
