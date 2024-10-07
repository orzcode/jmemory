import "./Modal.css";
function EndgameModal({ modal, setModal, endState }) {
	if (!modal) return null

	  // Prevent click events on dialog from propagating to overlay
	  const handleDialogClick = (e) => {
		e.stopPropagation();
	  };

	return (
	<div className="modalOverlay" onClick={() => setModal(false)}>
	  <dialog open onClick={handleDialogClick}>
		  <h2>{endState}!</h2>
		  {endState === "Win" ?
		  <p>You've unlocked x cards</p> : 
		  <button>Try once more</button>}
		  <button>Re-roll cards</button>
		  <button>Return to menu</button>
	  </dialog>
	</div>
	);
  }

export default EndgameModal;