import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainMiddle from "./components/MainMiddle.jsx";
import Card from "./components/Card.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <header>
      <h1>J-memory</h1>
    </header>

  <Card />

    <MainMiddle />

    {/* <footer id="footer">Created by Orz <a href='https://github.com/orzcode' target='_blank'><i class='fa-brands fa-github'></i></a></footer> */}
  </StrictMode>
);

// Two modes, top 100 and 500 (all)

// Store mode as number in state

// Randomly select 10 from the db based on mode, push these to array in state

// Use this array of 10 render card components, call api here too maybe?

// Each card click shuffles the 10 on page visually (think li key)

// Fail? Retry set or reselect 10(?)
