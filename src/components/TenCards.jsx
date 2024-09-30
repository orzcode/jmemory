import { useEffect, useState } from "react";
import Card from "./Card";
import nf01 from "../assets/nf01.json";
import tatoebaAPI from "../tatoebaAPI.js";

function TenCards({ mode, setView }) {
  const [tenCards, setTenCards] = useState([]);
  const totalEntries = nf01.entries.length; // JSON total size pool

    useEffect(() => {
      if (tenCards.length > 0) return; // Early return if cards are already loaded
      
    // Step 1: Pick 10 random cards
    const cardLimit = Math.min(mode, totalEntries); // Ensure mode does not exceed totalEntries
    const newCards = [];
    for (let i = 0; i < 10; i++) {
      const randomCardNo = Math.floor(Math.random() * cardLimit); // Limit
      newCards.push(nf01.entries[randomCardNo]);
    }
  
      // Step 2: Fetch Tatoeba API data for each card
      Promise.all(
        newCards.map(async (card) => {
          const data = await tatoebaAPI(card.kanji);
          return { ...card, tatoeba: data };
        })
      ).then((updatedCards) => {
        setTenCards(updatedCards); // Update state once all API calls are done
      });
      
    }, []); // REMOVED: Run effect when `mode` or `setTenCards` changes

  // Function to shuffle the cards visually
  const reshuffleCards = () => {
    console.log("Cards shuffled")
    const shuffledCards = [...tenCards].sort(() => Math.random() - 0.5); // Simple shuffle
    setTenCards(shuffledCards); // Update state to trigger re-render
  };

  return (
    //conditional rendering - shows 'loading' if tencards is empty
    <div className="TenCards">
    {/* Conditional rendering - shows 'Loading...' if tenCards is empty */}
    {tenCards.length > 0 ? (
      // Render all 10 cards
      tenCards.map((card, index) => <Card key={index} card={card} onClick={reshuffleCards}/>)
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}

export default TenCards;
// Each card click shuffles the 10 on page visually (think li key)
// Fail? Retry set or reselect 10(?)
