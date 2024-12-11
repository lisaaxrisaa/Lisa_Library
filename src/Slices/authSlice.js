// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { jwtDecode } from 'jwt-decode';

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await fetch('/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to login');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     token: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setToken(state, action) {
//       const token = action.payload;
//       state.token = token;
//       state.user = token ? jwtDecode(token) : null;
//     },
//     logout(state) {
//       state.token = null;
//       state.user = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         const { token } = action.payload;
//         state.token = token;
//         state.user = jwtDecode(token); // Decode and store user info
//         state.loading = false;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to login';
//       });
//   },
// });

// export const { logout, setToken } = authSlice.actions;
// export default authSlice.reducer;

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
      console.log('Clearing token and user data...');
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
