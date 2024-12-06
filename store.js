import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './src/Slices/apiSlice'; // Import your API
import authReducer from './src/Slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, // Add auth reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
