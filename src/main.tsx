import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";
import "./index.css";
import App from "./App.tsx";

ReactGA.initialize("G-M1ZTQ54Q83");

ReactGA.send({ hitType: "pageview", page: window.location.pathname });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
