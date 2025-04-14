import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
};

const createTeamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    createPending: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    createSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    createFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { actions, reducer } = createTeamSlice;

export const { createPending, createSuccess, createFailed } = actions;

export default reducer;
