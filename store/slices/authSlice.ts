import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  loading: boolean;
  error?: string | null;
};

const initialState: AuthState = { token: null, loading: false, error: null };

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
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
