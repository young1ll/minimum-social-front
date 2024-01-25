import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

type InitialState = {
  value: AuthState;
};
type AuthState = {
  isAuthenticated: boolean;
  id: string;
  username: string;
  email: string;
  darkmode: boolean;
};

const initialState: InitialState = {
  value: {
    isAuthenticated: false,
    id: "",
    username: "",
    email: "",
    darkmode: false,
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.value = {
        isAuthenticated: true,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        darkmode: false,
      };
    },
    logout: () => {
      return initialState;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.value.darkmode = action.payload;
    },
  },
});

export const { login, logout, setDarkMode } = auth.actions;
export default auth.reducer;

export const useSelectAuth: TypedUseSelectorHook<RootState> = useSelector;
