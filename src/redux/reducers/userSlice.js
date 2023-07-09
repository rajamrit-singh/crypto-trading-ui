import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  first_name: '',
  last_name: '',
  email: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { first_name, last_name, email, token, user_id } = action.payload;
      state.userId = user_id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.token = token;
    },
    clearUser(state) {
      state.first_name = '';
      state.last_name = '';
      state.email = '';
      state.token = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
