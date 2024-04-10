import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  loading: false,
  error: null,
  token:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setToken:(state,action)=>{
      state.token=action.payload
    },
    logout:(state,action)=>{
      state.user=''
      state.token=null
    }
  }
});

export const { setUser, setError,setToken,logout } = userSlice.actions;

export default userSlice.reducer;
