import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext.jsx";
import "./index.css";
import {HashRouter } from "react-router-dom";
import {MotionConfig} from 'motion/react'

ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
      <HashRouter>
       <AppProvider>
        <MotionConfig viewport={{once:true}}>
           <App />
        </MotionConfig>
     </AppProvider>
     </HashRouter>
  </React.StrictMode>
);
