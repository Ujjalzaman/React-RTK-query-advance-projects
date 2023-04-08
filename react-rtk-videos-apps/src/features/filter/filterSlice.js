import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  search: '',
};

export const filterSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    tagSelected: (state, action) =>{
      state.tags.push(action.payload);
    },
    tagRemove: (state, action) =>{
      const indexRemove = state.tags.indexOf(action.payload);
      if(indexRemove !== -1) state.tags.splice(indexRemove, 1);
    },
    searched: (state, action) =>{
      state.search = action.payload;
    }
  }
});


export default filterSlice.reducer;
export const {tagSelected, tagRemove, searched} = filterSlice.actions;
