import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token');
let decodedToken = null;

if (token) {
  try {
    decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem('token');
      decodedToken = null;
    }
  } catch (error) {
    console.error('Failed to decode token:', error);
    localStorage.removeItem('token');
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: decodedToken,
    token: decodedToken ? token : null,
    loading: false,
    error: null,
  },
  reducers: {
    setToken(state, action) {
      const token = action.payload;
      state.token = token;
      state.user = token ? jwtDecode(token) : null;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
