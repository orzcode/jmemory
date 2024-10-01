import { useEffect, useState } from "react";
import Card from "./Card";
import nf01 from "../assets/nf01.json";
import tatoebaAPI from "../tatoebaAPI.js";

function TenCards({ mode, setView }) {
  const [tenCards, setTenCards] = useState([]);
  const totalEntries = nf01.entries.length; // JSON total size pool
  const uniqueCardIds = new Set(); // To track unique card IDs

  ///////////////////////////////////////////////////////////////////////////
  // Helper function to get cached cards from localStorage
  const getCachedCards = () => {
    const cached = localStorage.getItem("cachedCards");
    return cached ? JSON.parse(cached) : [];
  };

  // Save new cards to localStorage
  const saveToCache = (cards) => {
    const cached = getCachedCards();

    // Create a Set for existing IDs to filter duplicates
    const cachedIds = new Set(cached.map((card) => card.id));

    // Filter out duplicates from the new cards
    const uniqueCards = cards.filter((card) => !cachedIds.has(card.id));

    // Update cache only with unique cards
    if (uniqueCards.length > 0) {
      const updatedCache = [...cached, ...uniqueCards];
      localStorage.setItem("cachedCards", JSON.stringify(updatedCache));
    }
  };
  //////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (tenCards.length > 0) return; // Early return if cards are already loaded
    const newCards = [];

    // Check if mode is "view all"
    if (mode === "all") {
      const cachedCards = getCachedCards();
      if (cachedCards.length > 0) {
        setTenCards(cachedCards);
        return; // Skip fetching new cards
      }
    }

    // Step 1: Pick 10 random cards
    const cardLimit = Math.min(mode, totalEntries); // Ensure mode does not exceed totalEntries
    
    while (newCards.length < 10) {
      const randomCardNo = Math.floor(Math.random() * cardLimit); // Limit
      const card = nf01.entries[randomCardNo];

      // Check if the card ID is already in the Set
      if (!uniqueCardIds.has(card.id)) {
        uniqueCardIds.add(card.id); // Add ID to the Set
        newCards.push(card);
      }
    }

    // Step 2: Fetch Tatoeba API data for each card
    Promise.all(
      newCards.map(async (card) => {
        const data = await tatoebaAPI(card.kanji);
        return { ...card, tatoeba: data };
      })
    ).then((updatedCards) => {
      saveToCache(updatedCards); // Cache the fetched cards
      setTenCards(updatedCards); // Update state once all API calls are done
    });
  }, []); // REMOVED: Run effect when `mode` or `setTenCards` changes

  // Function to shuffle the cards visually
  const reshuffleCards = () => {
    console.log("Cards shuffled");
    const shuffledCards = [...tenCards].sort(() => Math.random() - 0.5); // Simple shuffle
    setTenCards(shuffledCards); // Update state to trigger re-render
  };

  return (
    //conditional rendering - shows 'loading' if tencards is empty
    <div className="TenCards">
      {/* Conditional rendering - shows 'Loading...' if tenCards is empty */}
      {tenCards.length > 0 ? (
        // Render all 10 cards
        tenCards.map((card, index) => (
          <Card key={index} card={card} onClick={reshuffleCards} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TenCards;
// Each card click shuffles the 10 on page visually (think li key)
// Fail? Retry set or reselect 10(?)
