import { useEffect, useState } from "react";
import Card from "./Card";
import nf01 from "../assets/nf01.json";
import tatoebaAPI from "../tatoebaAPI.js";
import EndgameModal from "./EndgameModal.jsx";

function TenCards({ mode, setView }) {
  const [tenCards, setTenCards] = useState([]); //cards to be rendered
  const [count, setCount] = useState(0); //for successive card count
  const [cardIDs, setCardIDs] = useState([]); //for unique card clicks out of 10 (i.e: checking same card click)

  const totalEntries = nf01.entries.length; // JSON total size pool
  const uniqueCardIds = new Set(); // To track unique card IDs

  const [modal, setModal] = useState(false); // win/fail modal open/close
  const [endState, setEndState] = useState(""); // win/fail state type, for modal customization
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
  //Card preparation function
  ////////////////////////////
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

    while (newCards.length < 60) {
      const randomCardNo = Math.floor(Math.random() * cardLimit); // Limit
      const card = nf01.entries[randomCardNo];

      // Check if the card ID is already in the Set
      if (!uniqueCardIds.has(card.id)) {
        //should be checking against cache perhaps???????
        uniqueCardIds.add(card.id); // Add ID to the Set (formed each time) of unique cards
        newCards.push(card); //this only pushes to visible tencards on page if it is unique
      }
    }

    // Step 2: Fetch Tatoeba API data for each card
    Promise.all(
      newCards.map(async (card) => {
        try {
          const data = await tatoebaAPI(card.kanji); // Fetch the Tatoeba data
          return { ...card, tatoeba: data }; // Merge card with fetched data
        } catch (error) {
          console.error(
            `Failed to fetch Tatoeba data for ${card.kanji}`,
            error
          );
          return { ...card, tatoeba: null }; // Fallback to null if API fails
        }
      })
    ).then((updatedCards) => {
      saveToCache(updatedCards); // Cache the fetched cards - rather, check if existing then add card ~IDs~
      setTenCards(updatedCards); // The tenCards to be shown on the page.
    });
  }, [tenCards]); // added tenCards as dependancy to trigger re-render when re-rolling same mode upon endgame

  //////////////////////////////////////////////////////////////////////////
  const pregameCleanup = () => {
    setCount(0);
    setCardIDs([]);
  };
  const endgameFunction = (type) => {
    setEndState(type);
    setModal(true);
  };
  /////////Not Used///////////////////////////////////////////////////
  const reshuffleCards = () => {
    console.log("Cards shuffled");
    const shuffledCards = [...tenCards].sort(() => Math.random() - 0.5); // Simple shuffle
    setTenCards(shuffledCards); // Update state to trigger re-render
  };
  ///////////////////////////////////////////////////////////////////////////
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  //////////////////////////////////////////////////////////////////////////
  const cardClickActions = (card) => {
    // If the card was already clicked, end the game
    // ELSE
    // If the count is already 9 and it wasn't the same card then it must be a victory
    // Otherwise, the count must be less than 9 hence we increment counts

    if (mode !== "all") {
      //skips victory check if mode is "view all"
      /////////////////////////
      if (cardIDs.includes(card.id)) {
        console.log("Shippai! Try again.");
        endgameFunction("fail");
        return;
      } else if (count === 9) {
        console.log("Victory!");
        endgameFunction("win");
      }
      /////////////////////////
    }
    setCardIDs((prevCardIDs) => [...prevCardIDs, card.id]);
    setCount((prevCount) => prevCount + 1);
  };

  //////////////////////////////////////////////////////////////////////////

  return (
    //conditional rendering - shows 'loading' if tencards is empty
    <div className="TenCardsParent">
      <div className="TenCardsInfo">
        <button
          className="Hoverstyles"
          onClick={() => {
            setView("Splash");
          }}
        >
          Return
        </button>
        <h2>
          {mode === "all"
            ? `Cards unlocked: ${getCachedCards().length} / ${totalEntries}`
            : `Cards in a row: ${count} / 10`}
        </h2>
      </div>
      {modal === true ? (
        <EndgameModal
          modal={modal}
          setModal={setModal}
          endState={endState}
          setView={setView}
          pregameCleanup={pregameCleanup}
          setTenCards={setTenCards}
        />
      ) : null}
      <div className="TenCards">
        {/* Conditional rendering - shows 'Loading...' if tenCards is empty */}
        {tenCards.length > 0 ? (
          // Render all 10 cards
          shuffleArray(tenCards).map((card, index) => (
            <Card
              key={index}
              card={card}
              onClick={() => cardClickActions(card)}
              // onClick={mode != "all" ? () => cardClickActions(card) : null}
            />
          ))
        ) : (
          <h3 className="Loading">Loading...</h3>
        )}
      </div>
    </div>
  );
}

export default TenCards;
