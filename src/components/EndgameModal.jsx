import "./Modal.css";
function EndgameModal({ modal, setModal, endState, setView, pregameCleanup }) {
	if (!modal) return null

	  // Prevent click events on dialog from propagating to overlay
	  const handleDialogClick = (e) => {
		e.stopPropagation();
	  };

	return (
	<div className="modalOverlay" onClick={() => setModal(false)}>
	  <dialog open onClick={handleDialogClick} className={endState}>
		  <h2>{endState}!</h2>
		  {endState === "Win" ?
		  <p>You've unlocked x cards</p> : 
		  <button className="Hoverstyles">Try once more</button>}
		  <button className="Hoverstyles" onClick={() => {setModal(false); pregameCleanup();}}>Re-roll: try setting tencards mode instead of setView?</button>
		  <button className="Hoverstyles" onClick={() => setView("Splash")}>Return to menu</button>
	  </dialog>
	</div>
	);
  }

export default EndgameModal;