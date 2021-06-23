import React from "react";
import ReactDOM from "react-dom";

// WebVitals
import reportWebVitals from "./reportWebVitals";

// Libs
import { BrowserRouter as Router } from "react-router-dom";

// App
import App from "./App";

// Styles
import "fontsource-roboto";
import "./index.css";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
