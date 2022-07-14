
import React from "react";
// import {setConfig} from 'react-google-translate'

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";
// setConfig({
//   clientEmail: "384857094071-ej4f1bi786jn698rkocn43vkhaebo157.apps.googleusercontent.com",
//   privateKey: "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",
//   projectId: "AIzaSyBokh77ocsW0ene-vrX80v1Wd5QUj64pSw",
// })

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
