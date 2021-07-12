import React from "react";
import ReactDOM from "react-dom";

// WebVitals
import reportWebVitals from "./reportWebVitals";

// Libs
import { BrowserRouter as Router } from "react-router-dom";

// Context
import { ContextProvider } from "./context";

// App
import App from "./App";

// Styles
import "fontsource-roboto";
import "./index.css";

ReactDOM.render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
