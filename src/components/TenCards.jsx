import { useEffect, useState } from "react";
import Card from "./Card";
import nf01 from "../assets/nf01.json";
import tatoebaAPI from "../tatoebaAPI.js";

function TenCards({ mode, setView }) {
  const [tenCards, setTenCards] = useState([]);
  const [count, setCount] = useState(0);

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
      if (!uniqueCardIds.has(card.id)) {//should be checking against cache perhaps???????
        uniqueCardIds.add(card.id); // Add ID to the Set (formed each time) of unique cards
        newCards.push(card);//this only pushes to visible tencards on page if it is unique
      }
    }

    // Step 2: Fetch Tatoeba API data for each card
    Promise.all(
      newCards.map(async (card) => {
        try {
          const data = await tatoebaAPI(card.kanji); // Fetch the Tatoeba data
          return { ...card, tatoeba: data }; // Merge card with fetched data
        } catch (error) {
          console.error(`Failed to fetch Tatoeba data for ${card.kanji}`, error);
          return { ...card, tatoeba: null }; // Fallback to null if API fails
        }
      })
    ).then((updatedCards) => {
      //console.log(updatedCards);
      saveToCache(updatedCards); // Cache the fetched cards - rather, check if existing then add card ~IDs~
      setTenCards(updatedCards); // The tenCards to be shown on the page.
    });
  }, []); // REMOVED: Run effect when `mode` or `setTenCards` changes


  // Function to shuffle the cards visually
  const reshuffleCards = () => {
    console.log("Cards shuffled");
    const shuffledCards = [...tenCards].sort(() => Math.random() - 0.5); // Simple shuffle
    setTenCards(shuffledCards); // Update state to trigger re-render

    //NOTES
    //I could maybe put the shuffler inside the return
    //since incrementing count state causes re-render anyway?

    //gotta 'if' this shit:
    setCount(prevCount => prevCount + 1);
    //actually maybe should put this in diff function?
    
    //win check and victory
    if (count === 9) {
      console.log("Victory!");
      setView("Splash");
    }
  };


  return (
    //conditional rendering - shows 'loading' if tencards is empty
    <div className="TenCardsParent">
      <div className="TenCardsInfo">
        <button className="Hoverstyles" onClick={() => {setView("Splash")}}>Return</button>
        <h2>{mode==="all"? `Cards unlocked: ${getCachedCards().length} / ${totalEntries}` 
        : `Cards in a row: ${count} / 10`}</h2>
      </div>
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
    </div>
  );
}

export default TenCards;
// Each card click shuffles the 10 on page visually (think li key)
// Fail? Retry set or reselect 10(?)
