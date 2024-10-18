import { createSlice } from '@reduxjs/toolkit';
import { addCoreValue, getCoreValues } from '../thunk/coreValueThunk';

const initialState = {
  coreValues: [],
  loading: false,
  error: '',
};

const coreValueSlice = createSlice({
  name: 'coreValues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get core value
    builder
      .addCase(getCoreValues.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoreValues.fulfilled, (state, action) => {
        state.loading = false;
        state.coreValues = action.payload;
      })
      .addCase(getCoreValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // add core value
    builder
      .addCase(addCoreValue.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCoreValue.fulfilled, (state, action) => {
        state.loading = false;
        state.coreValues.push(action.payload);
      })
      .addCase(addCoreValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default coreValueSlice.reducer;
