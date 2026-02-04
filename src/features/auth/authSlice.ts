import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RegisterUser } from "../../types/users";

interface AuthState {
  user: RegisterUser | null;
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  loading: true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setUserRedux(state, action: PayloadAction<RegisterUser | null>) {
      console.log("ACTION PAYLOAD:", action.payload);
      state.user = action.payload;
    },

    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    }

  },
});

export const { setUserRedux, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;