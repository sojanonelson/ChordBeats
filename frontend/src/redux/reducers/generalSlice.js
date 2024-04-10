import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appLoading: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.appLoading = action.payload;
      
     
    },
    
  }
});

export const { setAppLoading } = generalSlice.actions;

export default generalSlice.reducer;
