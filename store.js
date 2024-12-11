import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './src/Slices/apiSlice';
import authReducer from './src/Slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
