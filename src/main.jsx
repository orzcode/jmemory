import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainMiddle from "./components/MainMiddle.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <header>
      <h1>J-memory 💮</h1>
    </header>


      <MainMiddle />

    <footer>Created by Orz <a href='https://github.com/orzcode' target='_blank'><i className='fa-brands fa-github'></i></a></footer>
  </StrictMode>
);
