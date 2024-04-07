import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootNavigator from "./routes/rootNavigator"; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RootNavigator /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
