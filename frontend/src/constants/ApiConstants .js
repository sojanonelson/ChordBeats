const BACKEND_API = {
  BASE_API_URL: process.env.REACT_APP_BASE_URL,
  INSTRUMENT_SOUND: "http://localhost:4000/api/instrument",
  LOGIN:'/user/login',
  REGISTER:'/user/register',
  USER_DATA:'/user?_id='
};

export default BACKEND_API;
