import { createSlice } from '@reduxjs/toolkit';
import { addFounder, getFounders } from '../thunk/founderThunk';

const initialState = {
  founders: [],
  loading: false,
  error: '',
};

const founderSlice = createSlice({
  name: 'founders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get founder
    builder
      .addCase(getFounders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFounders.fulfilled, (state, action) => {
        state.loading = false;
        state.founders = action.payload;
      })
      .addCase(getFounders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // add founder
    builder
      .addCase(addFounder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFounder.fulfilled, (state, action) => {
        state.loading = false;
        state.founders.push(action.payload);
      })
      .addCase(addFounder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default founderSlice.reducer;
