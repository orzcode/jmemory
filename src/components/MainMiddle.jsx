import { useState, useEffect } from "react";
import TenCards from "./TenCards.jsx";
import Splash from "./Splash.jsx";
import karate from "../assets/karate.png";
import kabuki from "../assets/kabuki.png";
import garden from "../assets/garden.png";
import monk from "../assets/monk.png";

function MainMiddle() {
  const [mode, setMode] = useState(100);
  const [view, setView] = useState("Splash");
  const [backgroundImage, setBackgroundImage] = useState("");

  const renderView = () => {
    switch (view) {
      case "Splash":
        return <Splash setView={setView} setMode={setMode} />;
      case "TenCards":
        return <TenCards mode={mode} setView={setView} />;
      //remember: clear tencards when mode changes - a 'later' problem

      case "AnotherView":
        return <AnotherView setView={setView} />;
      default:
        return <p>View not found</p>;
    }
  };

  //Background switcher
  //could randomize if wanted
  useEffect(() => {
    switch (view) {
      case "Splash":
        setBackgroundImage(
          `url('${karate}'), url('${kabuki}')`
        );
        break;
      case "TenCards":
        setBackgroundImage(
          `url('${garden}'), url('${monk}')`
        );
        break;
      case "AnotherView":
        setBackgroundImage(
          `url('./src/assets/karate.png'), url('./src/assets/kabuki.png')`
        );
        break;
    }
  }, [view]);

  return (
    <main className="MainMiddle" style={{ backgroundImage }}>
      {renderView()}
    </main>
  );
}

export default MainMiddle;
