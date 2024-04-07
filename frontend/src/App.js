import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RootNavigator from "./routes/rootNavigator"; 
import { Analytics } from "@vercel/analytics/react";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Analytics/>
        <RootNavigator /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
