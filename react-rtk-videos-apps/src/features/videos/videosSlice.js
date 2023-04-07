import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchVideos } from './videosAPI';

const initialState = {
  videos: [],
  error: '',
  isError: false,
  loading: false
};

export const getVideostAsync = createAsyncThunk(
  'videos/fetchvideos',
  async () => {
    const videos = await fetchVideos();
    return videos;
  }
);

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getVideostAsync.pending, (state) => {
        state.error = '';
        state.isError = false;
        state.loading = true;
      })
      .addCase(getVideostAsync.fulfilled, (state, action) => {
        state.error = '';
        state.isError = false;
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(getVideostAsync.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isError = false;
        state.loading = true;
        state.videos = action.payload;
      });
  },
});


export default videosSlice.reducer;
