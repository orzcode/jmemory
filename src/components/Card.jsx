import "./Card.css"
import { limit } from "../tatoebaAPI.js";
function Card({ card }) {

	//picks/generates random sentence (index no.) based on the limit set in Tatoeba API
	const randomEG = Math.floor(Math.random() * limit)

	return (
	<div className="Card">
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
//////////////////////////////////////////////
// return (
// 	<div className="Card">
// 	<div className="CardJukugoDiv">
// 	<h3 className="Jukugo">
// 		<ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>子<rp>（</rp><rt>し</rt><rp>）</rp></ruby>
// 	</h3>
// 	</div>
// 	<div className="CardMeaningsDiv">
// 	  <ul>
// 		<li>
// 			<p className="Meaning">meaning 1</p>
// 		</li>
// 		<li>
// 			<p className="Meaning">meaning 2</p>
// 		</li>
// 	  </ul>
// 	</div>
// 	<hr></hr>
// 	<div className="CardExampleDiv">
// 	  <p className="ExampleJP"><ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>子<rp>（</rp><rt>し</rt><rp>）</rp></ruby>力は<ruby>安<rp>（</rp><rt>あん</rt><rp>）</rp></ruby><ruby>全<rp>（</rp><rt>ぜん</rt><rp>）</rp></ruby>だ。</p>
// 	  <p className="ExampleEN">Nuclear power is safe.</p>
// 	</div>
//   </div>)
//////////////////////////////////////////////////