// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.scss";
// import { BrowserRouter } from "react-router-dom";

// createRoot(document.getElementById("root")!).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// );


import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  // Добавляем basename, чтобы роутер учитывал подпапку GitHub Pages
  <BrowserRouter basename="/Product-Catalog">
    <App />
  </BrowserRouter>,
);
