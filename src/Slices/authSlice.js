import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/api/users/login', credentials);
      console.log('Login Response:', response.data);
      return response.data; // Return the entire response
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Store decoded user details
    token: null, // Store JWT token
    loading: false,
    error: null,
  },
  reducers: {
    setToken(state, action) {
      const token = action.payload;
      console.log('Setting token in authSlice:', action.payload);
      // state.token = action.payload;
      state.token = token;
      state.user = token ? jwtDecode(token) : null;
    },
    setUser(state, action) {
      console.log('Setting user in authSlice:', action.payload);
      state.user = action.payload;
    },
    logout(state) {
      console.log('Logging out user');
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token } = action.payload;

        // Save the token and decoded user info
        state.token = token;
        state.user = jwtDecode(token); // Decode token to get user details
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error('Login rejected:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to login';
      });
  },
});

export const { logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
