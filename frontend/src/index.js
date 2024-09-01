// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "./index.css";
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );


import React from "react";
import ReactDOM from "react-dom/client"; // Import from react-dom/client
import App from "./App";
import "./index.css";

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
