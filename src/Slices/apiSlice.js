// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.token;
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     // Fetch all books
//     getBooks: builder.query({
//       query: () => '/books',
//     }),
//     // Fetch a single book by ID
//     getBookById: builder.query({
//       query: (id) => `/books/${id}`,
//     }),
//     // Create a new user (registration)
//     createUser: builder.mutation({
//       query: (userData) => ({
//         url: '/users/register',
//         method: 'POST',
//         body: userData,
//       }),
//     }),
//     // Login user
//     loginUser: builder.mutation({
//       query: (credentials) => ({
//         url: '/users/login',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     // Check out a book
//     checkoutBook: builder.mutation({
//       query: (bookId) => ({
//         url: `/reservations`,
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
//         },
//         body: { bookId },
//       }),
//     }),
//     getReservations: builder.query({
//       query: () => ({
//         url: '/reservations',
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // or retrieve token from Redux store
//         },
//       }),
//     }),
//     updateBookAvailability: builder.mutation({
//       query: ({ bookId, available }) => ({
//         url: `/books/${bookId}`,
//         method: 'PATCH',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: { available },
//       }),
//     }),
//     returnBook: builder.mutation({
//       query: (reservationId) => ({
//         url: `/reservations/${reservationId}`,
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       }),
//     }),
//   }),
// });

// export const {
//   useGetBooksQuery,
//   useGetBookByIdQuery,
//   useCreateUserMutation,
//   useLoginUserMutation,
//   useCheckoutBookMutation,
//   useReturnBookMutation,
//   useUpdateBookAvailabilityMutation,
//   useGetReservationsQuery,
//   useLazyGetReservationsQuery,
// } = apiSlice;
// export default apiSlice.reducer;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // Retrieve token from Redux state
      console.log('Redux Token:', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      // headers.set('Content-Type', 'application/json');
      console.log('Headers:', headers);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    checkoutBook: builder.mutation({
      query: (bookId) => ({
        url: `/reservations`,
        method: 'POST',
        body: { bookId },
      }),
    }),
    getReservations: builder.query({
      query: () => {
        console.log('Fetching reservations...'); // This works fine here
        return {
          url: '/reservations',
          method: 'GET',
        };
      },
    }),
    updateBookAvailability: builder.mutation({
      query: ({ bookId, available }) => ({
        url: `/books/${bookId}`,
        method: 'PATCH',
        body: { available },
      }),
    }),
    returnBook: builder.mutation({
      query: (reservationId) => ({
        url: `/reservations/${reservationId}`,
        method: 'DELETE',
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
  useUpdateBookAvailabilityMutation,
  useGetReservationsQuery,
  useLazyGetReservationsQuery,
} = apiSlice;
export default apiSlice.reducer;
