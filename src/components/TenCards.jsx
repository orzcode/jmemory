import { useEffect, useState } from "react";
import Card from "./Card";
import nf01 from "../assets/nf01.json";
import tatoebaAPI from "../tatoebaAPI.js";

function TenCards({ mode }) {
  const [tenCards, setTenCards] = useState([]);

  useEffect(() => {
    // Step 1: Pick 10 random cards based on 'mode' pool size number
    const newCards = [];
    for (let i = 0; i < 10; i++) {
      const randomCardNo = Math.floor(Math.random() * mode);
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

  // Step 3: Conditional rendering to ensure cards are available
  if (tenCards.length === 0) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  return (
    <div className="TenCards">
      {/* Render all 10 cards */}
      {tenCards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
}

export default TenCards;
// Each card click shuffles the 10 on page visually (think li key)
// Fail? Retry set or reselect 10(?)
