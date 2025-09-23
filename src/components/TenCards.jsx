import { useEffect, useState } from "react";
import Card from "./Card";
import nf01 from "../assets/nf01.json";
import dlc from "../assets/dlc.json";
import tatoebaAPI from "../tatoebaAPI.js";
import EndgameModal from "./EndgameModal.jsx";

function TenCards({ mode, setView }) {
  const [tenCards, setTenCards] = useState([]); //cards to be rendered
  const [count, setCount] = useState(0); //for successive card count
  const [cardIDs, setCardIDs] = useState([]); //for unique card clicks out of 10 (i.e: checking same card click)

  const totalEntries =
    mode === "dlc" ? dlc.entries.length : nf01.entries.length; // JSON total size pool

  const [modal, setModal] = useState(false); // win/fail modal open/close
  const [endState, setEndState] = useState(""); // win/fail state type, for modal customization
  const [unlockedCount, setUnlockedCount] = useState(0); // number of cards unlocked

  const [rerollCount, setRerollCount] = useState(0);
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
    return uniqueCards.length;
  };
  //////////////////////////////////////////////////////////////////////////
  const saveClocked = (clockedMode) => {
    let cached = {}; // Initialize an empty object if none exists

    // Check if there's already clocked data in localStorage
    if (localStorage.getItem("clocked")) {
      cached = JSON.parse(localStorage.getItem("clocked")); // Parse existing data
    }

    // Update the relevant mode
    if (clockedMode === 100) {
      cached[100] = true; // Mark mode 100 as clocked
    } else if (clockedMode === 400) {
      cached[400] = true; // Mark mode 400 as clocked
    }

    // Save the updated data back to localStorage
    localStorage.setItem("clocked", JSON.stringify(cached));
  };
  //////////////////////////////////////////////////////////////////////////
  //Card preparation function
  ////////////////////////////
  useEffect(() => {
    if (!mode) return;
    let newCards = [];

    // Check if mode is "view all"
    if (mode === "all") {
      const cachedCards = getCachedCards();
      if (cachedCards.length > 0) {
        setTenCards(cachedCards);
        return; // Skip fetching new cards
      }
    } //else if (mode === "dlc") {
    //   console.log(dlc)
    //     setTenCards(dlc);
    //     return; // Skip fetching new cards

    // }

    // Step 1: Pick 10 random cards
    if (mode != "all") {
      const shuffledCards = (mode === "dlc" ? dlc.entries : nf01.entries).sort(
        () => Math.random() - 0.5
      );

      // Select the first 10 cards
      newCards = shuffledCards.slice(0, 10);

      if (mode === "dlc") {
        setTenCards(newCards);
        return; // Skip fetching new cards
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
      //saveToCache(updatedCards); // Previously used to unlock upon viewing - now called upon victory
      setTenCards(updatedCards); // The tenCards to be shown on the page.
    });
  }, [rerollCount, mode]); // added tenCards as dependancy to trigger re-render when re-rolling same mode upon endgame

  //////////////////////////////////////////////////////////////////////////
  const pregameCleanup = () => {
    setCount(0);
    setCardIDs([]);
    setEndState("");
    setUnlockedCount(0);
  };

  const rerollCardset = () => {
    pregameCleanup();
    setTenCards([]); // Show loading
    setRerollCount((c) => c + 1); // Trigger re-fetch
  };
  const endgameFunction = (type) => {
    setEndState(type);
    setModal(true);
  };
  /////////Not Used///////////////////////////////////////////////////
  // const reshuffleCards = () => {
  //   console.log("Cards shuffled");
  //   const shuffledCards = [...tenCards].sort(() => Math.random() - 0.5); // Simple shuffle
  //   setTenCards(shuffledCards); // Update state to trigger re-render
  // };
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

        const unlockCount = saveToCache(tenCards);
        setUnlockedCount(unlockCount);
        saveClocked(mode);

        endgameFunction("win");
      }
      /////////////////////////
    }
    setCardIDs((prevCardIDs) => [...prevCardIDs, card.id]);
    setCount((prevCount) => prevCount + 1);
  };

  //////////////////////////////////////////////////////////////////////////

  return (
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
          rerollCardset={rerollCardset}
          setTenCards={setTenCards}
          unlockedCount={unlockedCount}
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
