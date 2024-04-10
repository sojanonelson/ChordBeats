import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appLoading: false,
  userLoggedIn:false
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.appLoading = action.payload;
      
     
    },
    setUserLoggedIn:(state,action)=>{
      state.userLoggedIn=action.payload;
    }
    
  }
});

export const { setAppLoading,setUserLoggedIn } = generalSlice.actions;

export default generalSlice.reducer;
