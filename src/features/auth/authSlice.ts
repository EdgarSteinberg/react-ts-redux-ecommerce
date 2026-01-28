import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RegisterUser } from "../../types/users";

interface AuthState {
  user: RegisterUser | null;
}

const initialState: AuthState = {
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setUserRedux(state, action: PayloadAction<RegisterUser | null>) {
      console.log("ACTION PAYLOAD:", action.payload);
      state.user = action.payload;
    }
  },
});

export const { setUserRedux } = authSlice.actions;
export default authSlice.reducer;