import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { firstName, lastName, email, token } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.token = token;
    },
    clearUser(state) {
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.token = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
