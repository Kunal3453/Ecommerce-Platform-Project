import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated} = authSlice.actions;
export default authSlice.reducer;
