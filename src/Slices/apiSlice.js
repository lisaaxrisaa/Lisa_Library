import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // Unique key for the API slice in the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api',
  }),
  endpoints: (builder) => ({
    // Fetch all books
    getBooks: builder.query({
      query: () => '/books',
    }),
    // Fetch a single book by ID
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    // Create a new user (registration)
    createUser: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    // Login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    // Check out a book
    checkoutBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}/checkout`,
        method: 'POST',
      }),
    }),
    returnBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}/return`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useCheckoutBookMutation,
  useReturnBookMutation,
} = apiSlice;
export default apiSlice.reducer;
