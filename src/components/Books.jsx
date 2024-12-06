/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useState } from 'react';
import React from 'react';
import { useGetBooksQuery } from '../Slices/apiSlice';
import { Link } from 'react-router-dom';

const BookList = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books.</p>;

  // Extract the books array from the response
  const books = data?.books || [];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Library Catalog</h1>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredBooks.length ? (
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                <h3>{book.title}</h3>
              </Link>
              <p>Author: {book.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books match your search.</p>
      )}
    </>
  );
};

export default BookList;
