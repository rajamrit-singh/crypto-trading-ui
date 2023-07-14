import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id: '',
  first_name: '',
  last_name: '',
  email: '',
  token: '',
  balance: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { first_name, last_name, email, token, user_id, balance } = action.payload;
      state.user_id = user_id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.token = token;
      state.balance = Number(balance);
    },
    clearUser(state) {
      state.user_id = '';
      state.first_name = '';
      state.last_name = '';
      state.email = '';
      state.token = '';
      state.balance = 0;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
