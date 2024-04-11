import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appLoading: false,
  userLoggedIn:false,
  activeKey:''
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
    },
    setActiveKey:(state,action)=>{
      state.activeKey = action.payload
    }
    
  }
});

export const { setAppLoading,setUserLoggedIn,setActiveKey } = generalSlice.actions;

export default generalSlice.reducer;
