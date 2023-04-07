import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchrelatedVideos } from './relatedVideosAPI';

const initialState = {
  relatedVideos: [],
  error: '',
  isError: false,
  loading: false
};

export const getRelatedVideoAsync = createAsyncThunk(
  'related/relatedVideosfetch',
  async ({currentId, tags}) => {
    const relatedVideos = await fetchrelatedVideos({currentId, tags});
    return relatedVideos;
  }
);

const relatedVideosSlice = createSlice({
  name: 'relatedVideos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRelatedVideoAsync.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(getRelatedVideoAsync.fulfilled, (state, action) => {
        state.error = '';
        state.isError = false;
        state.loading = false;
        state.relatedVideos = action.payload;
      })
      .addCase(getRelatedVideoAsync.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isError = false;
        state.loading = true;
        state.relatedVideos = action.error?.message;
      });
  },
});

export default relatedVideosSlice.reducer;