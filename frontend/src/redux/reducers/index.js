import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import generalSlice from './generalSlice';

const rootReducer = combineReducers({
  user: userReducer,
  general:generalSlice

});

export default rootReducer;
