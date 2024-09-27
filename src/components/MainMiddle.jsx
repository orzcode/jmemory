import { useState, useEffect } from "react";
import TenCards from "./TenCards.jsx";
import Card from "./Card.jsx";
import nf01 from "../assets/nf01.json";
import tatoebaAPI from "../tatoebaAPI.js";

function MainMiddle() {
  const [mode, setMode] = useState(100);
  const [tenCards, setTenCards] = useState([]);

  useEffect(() => {
    const newCards = [];
    
    // Step 1: Pick 10 random cards based on 'mode' pool size number
    for (let i = 0; i < 10; i++) {
      const randomCardNo = Math.floor(Math.random() * mode);
      newCards.push(nf01.entries[randomCardNo]);
    }

    // Step 2: Attach Tatoeba API data to each card
    const updatedCards = [...newCards]; // Copy the newCards array
    updatedCards.forEach((card, index) => {
      tatoebaAPI(card.kanji).then((data) => {
        updatedCards[index].tatoeba = data; // Add API data to the card
        setTenCards([...updatedCards]); // Update state with new data
      });
    });
    
  }, []); // Runs whenever `mode` changes?: mode

  return (
    <main className="MainMiddle">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <TenCards
        tenCards={tenCards}
      />
    </main>
  );
}

export default MainMiddle;

// Two modes, top 100 and 500 (all)
// Store mode as number in state
// Randomly select 10 from the db based on mode, push these to array in state
// Use this array of 10 render card components, call api here too maybe?
// Each card click shuffles the 10 on page visually (think li key)
// Fail? Retry set or reselect 10(?)
