import { useState } from "react";
import TenCards from "./TenCards.jsx";

function MainMiddle() {
  const [mode, setMode] = useState(100);
  
  return (
    <main className="MainMiddle">

      <TenCards
        mode={mode}
      />

    </main>

    //remember: clear tencards when mode changes - a 'later' problem
  );
}

export default MainMiddle;

// Two modes, top 100 and 500 (all)
// Store mode as number in state
// Randomly select 10 from the db based on mode, push these to array in state
// Use this array of 10 render card components, call api here too maybe?
// Each card click shuffles the 10 on page visually (think li key)
// Fail? Retry set or reselect 10(?)
