import React from 'react';
import ReactDOM from 'react-dom/client';
import "./App.css"
import App from './App';
import { Provider } from "react-redux"; 
import store from "./redux/store/store"; 
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}> 
  <SpeedInsights/>
  <Analytics/>
    <App />
    </Provider>
  </React.StrictMode>
);
