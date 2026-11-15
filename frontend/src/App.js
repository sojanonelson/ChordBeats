import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootNavigator from "./routes/rootNavigator"; 
import { useEffect } from "react";
import StorageService from "./services/StorageService";
import { setUser } from "./redux/reducers/userSlice";
import { fetchUserData } from "./services/userService";
import { useDispatch } from "react-redux";
import { setAppLoading, setUserLoggedIn } from "./redux/reducers/generalSlice";
import MaintenanceModal from "./components/MaintenanceModal";
import MouseEffect from "./components/MouseEffect";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setAppLoading(true));
      const token = StorageService.gettoken();
      const userId = StorageService.getUserID();
      
      if (userId && token) {
        try {
          const userData = await fetchUserData(userId);
          dispatch(setUserLoggedIn(true));
          dispatch(setUser(userData.user));
          dispatch(setAppLoading(false));
        } catch (error) {
          console.error("Error fetching user data:", error);
          dispatch(setAppLoading(false));
        }
      } else {
        dispatch(setAppLoading(false));
      }
    };
  
    fetchData();
  }, [dispatch]);

  return (
    <div className="App bg-black min-h-screen text-white">
      <MouseEffect />
      <MaintenanceModal />
      <BrowserRouter>
        <RootNavigator /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
