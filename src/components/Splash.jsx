import nf01 from "../assets/nf01.json";
function Splash({ setView, setMode }) {
  const totalEntries = nf01.entries.length; // JSON total size pool

  //localStorage.clear();


    // Function to read the clocked states
    const getClockedModes = () => {
      // Check if clocked data exists in localStorage
      if (localStorage.getItem("clocked")) {
        const cached = JSON.parse(localStorage.getItem("clocked")); // Parse existing data
        return cached; // Return the cached object
      }
      return { 100: false, 400: false }; // Return default if not set
    }

    const clockedModes = getClockedModes();
    

  return (
    <div className="Splash">
      <h2>ようこそ！🙇</h2>
      <span className="SplashText">
        <p>
          <strong>
            J-Memory is a Japanese kanji flashcard app.
          </strong>
        </p>

        <p>
          Ten cards are displayed showing a kanji compound, its meaning, and a
          randomly-selected example sentence. When a card is clicked, the
          cards are shuffled. The aim is to click on a unique card each time
          until you've clicked all ten.
        </p>

        <p>
          Cards are randomly selected from a pool of the top 100 (or top
          400) most common words as per JMDict, the longtime standard for
          Japanese-English reference. Example sentences are then fetched and
          shown randomly from the Tatoeba Project. Both of these are
          licensed under public domain.
        </p>

        <p>
          <strong>Select a mode to begin!</strong>
        </p>
      </span>

      <div className="Modes">
        <button
          className="Hoverstyles"
          onClick={() => {
            setMode(100);
            setView("TenCards");
          }}
        >
          Top 100 Words
          <div className={`icon ${clockedModes[100] ? 'passed' : 'not-passed'}`}>
          🈴</div>
        </button>
        <button
          className="Hoverstyles"
          onClick={() => {
            setMode(400);
            setView("TenCards");
          }}
        >
          Top {totalEntries} Words
          <div className={`icon ${clockedModes[400] ? 'passed' : 'not-passed'}`}>
          🈴</div>
        </button>
         {clockedModes[100] && clockedModes[400] ? (
          <button
            className="Hoverstyles"
            onClick={() => {
              setMode("dlc");
              setView("TenCards");
            }}
          >
            Wild Words DLC
          </button>
        ) : (
          <button className="Disabled">Wild Words DLC</button>
        )} 
        
        {/* //-----Note: disabled due to inifite loop (owing to small DLC size) */}

      
        {localStorage.getItem("cachedCards") === null ? (
          <button className="Disabled">Card Gallery</button>
        ) : (
          <button
            className="Hoverstyles"
            onClick={() => {
              setMode("all");
              setView("TenCards");
            }}
          >
            Card Gallery
          </button>
        )}
      </div>
    </div>
  );
}

export default Splash;
