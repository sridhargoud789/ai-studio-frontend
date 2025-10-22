import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Generation = { id: number; prompt: string; image_path: string };
type GenerationState = {
  list: Generation[];
  loading: boolean;
  error?: string | null;
};

const initialState: GenerationState = { list: [], loading: false, error: null };

const generationSlice = createSlice({
  name: 'generation',
  initialState,
  reducers: {
    fetchRecentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecentSuccess: (state, action: PayloadAction<Generation[]>) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchRecentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createGenerationRequest: (
      state,
      action: PayloadAction<{ file: File; prompt: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    createGenerationSuccess: (state) => {
      state.loading = false;
    },
    createGenerationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRecentRequest,
  fetchRecentSuccess,
  fetchRecentFailure,
  createGenerationRequest,
  createGenerationSuccess,
  createGenerationFailure,
} = generationSlice.actions;

export default generationSlice.reducer;
