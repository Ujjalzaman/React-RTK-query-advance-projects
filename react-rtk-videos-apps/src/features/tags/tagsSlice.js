import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTags } from './tagsAPI';

const initialState = {
  tags: [],
  error: '',
  isError: false,
  loading: false
};

export const getTagstAsync = createAsyncThunk(
  'tags/fetchTags',
  async () => {
    const tags = await fetchTags();
    return tags;
  }
);

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTagstAsync.pending, (state) => {
        state.error = '';
        state.isError = false;
        state.loading = true;
      })
      .addCase(getTagstAsync.fulfilled, (state, action) => {
        state.error = '';
        state.isError = false;
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(getTagstAsync.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isError = false;
        state.loading = true;
        state.tags = [];
      });
  },
});


export default tagsSlice.reducer;
