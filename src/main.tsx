import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//TODO:
// - 90. question, javascript block
// - _italic_ and **text** in text
// - remove question list from (at least a11y) dom when not visible
