import { User } from "@/Services/modules/users/getUser";
import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  user: User | null;
  error: string;
}

const initialState: initialState = {
  user: null,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.error = "";
    },
    clearUser: (state) => {
      state.user = null;
      state.error = "";
    },
    getUserError: (state, { payload }) => {
      state.user = null;
      state.error = payload;
    },
  },
});
const { actions, reducer } = userSlice;

export const { getUserSuccess, clearUser, getUserError } = actions;

export default reducer;
