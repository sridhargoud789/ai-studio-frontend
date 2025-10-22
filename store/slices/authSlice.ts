import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  loading: boolean;
  error?: string | null;
  registered?: boolean;
};

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  registered: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.loading = true;
      state.error = null;
      state.registered = false;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    registerRequest: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.loading = true;
      state.error = null;
      state.registered = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.registered = true;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false;
      state.error = action.payload.error;
      state.registered = false;
    },
    clearRegistered: (state) => {
      state.registered = false;
    },
    logout: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
      state.registered = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  clearRegistered,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
