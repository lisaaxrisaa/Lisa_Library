import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { jwtDecode } from 'jwt-decode';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log('Redux Token:', token);

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (!decodedToken?.exp) {
            console.warn('Token does not have an exp field.');
          } else if (decodedToken.exp * 1000 > Date.now()) {
            headers.set('Authorization', `Bearer ${token}`);
          } else {
            console.warn('Token is expired.');
          }
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
      } else {
        console.warn('No token found, skipping Authorization header.');
      }

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
        console.log('Fetching reservations...');
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
