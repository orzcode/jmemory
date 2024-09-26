import { useState } from "react";
import { useEffect } from "react";
import nf01 from "../assets/nf01.json";

function TenCards({ tenCards, setTenCards, mode, setMode }) {
  useEffect(() => {
    const newCards = [];
    for (let i = 0; i < 10; i++) {
      const randomCardNo = Math.floor(Math.random() * mode);
      newCards.push(nf01.entries[randomCardNo]);
    }
    setTenCards(newCards); // Update state once after generating all cards
  }, [mode, setTenCards]); // Runs only when `mode` changes

  return <>{/* render 10 cards here	 */}</>;
}

export default TenCards;

// Randomly select 10 from the db based on mode, push these to array in state
// Use this array of 10 render card components, call api here too maybe?
// Each card click shuffles the 10 on page visually (think li key)
// Fail? Retry set or reselect 10(?)
