import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "mac-scrollbar/dist/mac-scrollbar.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
