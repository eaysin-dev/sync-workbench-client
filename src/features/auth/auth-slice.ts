import { User } from "@/models/User";
import { cookieManager } from "@/utils/cookie-manager";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

interface LoginActionPayload {
  user: User | null;
  accessToken: string;
  refreshToken: string;
}

interface TokenActionPayload {
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginActionPayload>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      cookieManager.removeCookie("accessToken");
      cookieManager.removeCookie("refreshToken");

      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setToken: (state, action: PayloadAction<TokenActionPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
