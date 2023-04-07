import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchVideo } from './videoAPI';

const initialState = {
  video: {},
  error: '',
  isError: false,
  loading: false
};

export const getVideotAsync = createAsyncThunk(
  'video/fetchvideo',
  async (id) => {
    const video = await fetchVideo(id);
    return video;
  }
);

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getVideotAsync.pending, (state) => {
        state.error = '';
        state.isError = false;
        state.loading = true;
      })
      .addCase(getVideotAsync.fulfilled, (state, action) => {
        state.error = '';
        state.isError = false;
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(getVideotAsync.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isError = false;
        state.loading = true;
        state.video = action.payload;
      });
  },
});

export default videoSlice.reducer;