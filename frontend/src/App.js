import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootNavigator from "./routes/rootNavigator"; 
import { SpeedInsights } from "@vercel/speed-insights/react"
import { useEffect } from "react";
import StorageService from "./services/StorageService";
import { setUser } from "./redux/reducers/userSlice";
import { fetchUserData } from "./services/userService";
import {useDispatch, useSelector } from "react-redux"
import { setAppLoading, setUserLoggedIn } from "./redux/reducers/generalSlice";

function App() {
  const dispatch = useDispatch();
  const AppLoading = useSelector((state) => state.general.appLoading);
  console.log("AppLoading", AppLoading)
  console.log("UserLoggedIn", useSelector((state) => state.general.userLoggedIn))

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setAppLoading(true))
      const token = StorageService.gettoken();
      const userId = StorageService.getUserID();
      console.log("from local:", userId);
      
      if (userId && token) {
      
        try {
         
          const userData = await fetchUserData(userId);
          console.log("User", userData);
          dispatch(setUserLoggedIn(true))
          dispatch(setUser(userData.user));
          dispatch(setAppLoading(false))
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }else{
        dispatch(setAppLoading(false))

      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="App">
      
        <BrowserRouter>
          <RootNavigator /> 
        </BrowserRouter>
     
    </div>
  );
}

export default App;
