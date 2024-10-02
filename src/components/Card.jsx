import "./Card.css"
function Card({ card, onClick }) {
	//picks/generates random sentence (index no.) based on the limit set in Tatoeba API
	const randomEG = Math.floor(Math.random() * card.tatoeba.length);

	//console.log(card)

	return (
	<div className="Card Hoverstyles" onClick={onClick}>
	<div className="CardJukugoDiv">
	<h3 className="Jukugo">
		<ruby>{card.kanji}<rt>{card.readings}</rt></ruby>
	</h3>
	</div>
	<div className="CardMeaningsDiv">
	  <ul>
		{card.meanings.map((meaning, index) => (
			<li key={index}><p className="Meaning">{meaning}</p></li>
		))}
	  </ul>
	</div>
	<hr />

	<div className="CardExampleDiv">
	  <p className="ExampleJP" dangerouslySetInnerHTML={{ __html: card.tatoeba[randomEG].transcriptionHTML }} />
	  <p className="ExampleEN">{card.tatoeba[randomEG].translation}</p>
	</div>
  </div>)
}

export default Card