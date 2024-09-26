import "./Card.css"
function Card() {

	return (
	<div className="Card">
	<div className="kanji-section">
	  <span className="furigana">げん</span>
	  <span className="kanji">原</span>
	</div>
	<div className="meanings">
	  <p className="meaning">meaning 1</p>
	  <p className="meaning">meaning 2</p>
	</div>
	<div className="example">
	  <p className="example-sentence-jp">原子力は安全だ。</p>
	  <p className="example-sentence-en">Nuclear power is safe.</p>
	</div>
  </div>)
}

export default Card