import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,  //By default, what will be the initial state.
  reducers: {    //only the functions inside the reducers can access the state, that increases security
  login: (state, action) => {
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  logout: (state) => {
    state.user = null;
    state.isAuthenticated = false;
  },
 },

});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;