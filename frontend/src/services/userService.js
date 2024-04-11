import axios from "axios";


const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

const fetchUserData = async (userId) => {
  console.log("ID:", userId);
  try {
    const response = await axiosInstance.get("/user", { params: { id: userId } });
    console.log("fetchUserData", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};


export { fetchUserData };
