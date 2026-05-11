import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from 'jwt-decode';

const initialState = {
  id: "",          // ← add this
  name: "",
  email: "",
  avatar: null,
  token: "",
  createdAt: "",   // ← add this
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;           // ← add this
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.token = action.payload.token;
      state.createdAt = action.payload.createdAt; // ← add this
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    removeUser: () => ({
      id: "",          // ← add this
      name: "",
      email: "",
      avatar: null,
      token: "",
      createdAt: "",   // ← add this
      isLoggedIn: false
    })
  }
});

export const { setUser, removeUser } = userSlice.actions;

export const getUserAvatar = (state) => state.user.avatar;
export const getName = (state) => state.user.name;
export const getToken = (state) => state.user.token;
export const getIsLoggedIn = (state) => state.user.isLoggedIn;
export const getRole = (state) => {
  if (state.user.token) {
    const userData = jwtDecode(state.user.token);
    return userData.role;
  }
  return "";
};

export default userSlice.reducer;