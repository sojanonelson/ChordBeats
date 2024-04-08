import axios from "axios";
import { ApiConstants } from "../constants";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

const fetchUserData = async (userId) => {
    console.log("ID:", userId)
  try {
    const response = await axiosInstance.get("/user",{
        params: {
            _id: userId
          }
        
    });
    console.log("fetchUserData", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { fetchUserData };
