import "./Card.css"
function Card(props) {

	return (
	<div className="Card">
	<div className="CardJukugoDiv">
	<h3 className="Jukugo">
		<ruby>{props.kanji}<rt>{props.reading}</rt></ruby>
		{/* <ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>子<rp>（</rp><rt>し</rt><rp>）</rp></ruby> */}
	</h3>
	</div>
	<div className="CardMeaningsDiv">
	  <ul>
		<li>
			<p className="Meaning">meaning 1</p>
		</li>
		<li>
			<p className="Meaning">meaning 2</p>
		</li>
	  </ul>
	</div>
	<hr></hr>
	<div className="CardExampleDiv">
	  <p className="ExampleJP"><ruby>原<rp>（</rp><rt>げん</rt><rp>）</rp></ruby><ruby>子<rp>（</rp><rt>し</rt><rp>）</rp></ruby>力は<ruby>安<rp>（</rp><rt>あん</rt><rp>）</rp></ruby><ruby>全<rp>（</rp><rt>ぜん</rt><rp>）</rp></ruby>だ。</p>
	  <p className="ExampleEN">Nuclear power is safe.</p>
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