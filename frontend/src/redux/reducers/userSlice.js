import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
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
    }
  }
});

export const { setUser, setError,setToken } = userSlice.actions;

export default userSlice.reducer;
