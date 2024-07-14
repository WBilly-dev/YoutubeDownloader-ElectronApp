import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./css/index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
