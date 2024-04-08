import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootNavigator from "./routes/rootNavigator"; 

import { useEffect } from "react";
import StorageService from "./services/StorageService";
import { setUser } from "./redux/reducers/userSlice";
import { fetchUserData } from "./services/userService";
import {useDispatch, useSelector } from "react-redux"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const token = StorageService.gettoken();
      const userId = StorageService.getUserID();
      console.log(userId);
      
      if (userId && token) {
        try {
          const userData = await fetchUserData({ _id: userId });
          console.log("User",userData)
          dispatch(setUser(userData.user));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      
        <BrowserRouter>
          <RootNavigator /> 
        </BrowserRouter>
     
    </div>
  );
}

export default App;
