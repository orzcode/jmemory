import { useState } from "react";
import TenCards from "./TenCards.jsx";
import Splash from "./Splash.jsx";

function MainMiddle() {
  const [mode, setMode] = useState(100);
  const [view, setView] = useState("Splash");

  const renderView = () => {
    switch (view) {
      case "Splash":
        return <Splash setView={setView} setMode={setMode}/>;
      case "TenCards":
        return <TenCards mode={mode} setView={setView}/>;
      //remember: clear tencards when mode changes - a 'later' problem
      case "AnotherView":
        return <AnotherView setView={setView}/>;
      default:
        return <p>View not found</p>;
    }
  };

  return (
    <main className="MainMiddle">

      {renderView()}

    </main>
  );
}

export default MainMiddle;