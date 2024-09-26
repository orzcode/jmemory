export const tatoebaAPI = async (props) => {

	const jukugo = props.jukugo;
	const limit = 3;
	//alter this number to control how many examples are returned
	const shortURL = `https://api.dev.tatoeba.org/unstable/sentences?lang=jpn&q=${jukugo}&trans=eng&limit=${limit}&sort=words`;

	// const randomExNo = Math.floor(Math.random() * limit);
	// const sentence = JSON.data[randomExNo].text;
	// const translation = JSON.data[randomExNo].translations[0][0].text
	// const transcriptionHTML = JSON.data[randomExNo].transcriptions[0].html
		//used if wanting to decide upon a random example from the returned results immediately rather than later
		//otherwise, make an array of 3 examples and pick one later (eg: during card component creation)

	const response = await fetch(shortURL)
	const JSON = await response.json()

	const exampleArray = []
	for (const example of JSON.data) {
		const sentence = example.text;
		const translation = example.translations[0][0].text;
		const transcriptionHTML = example.transcriptions[0].html;
	  
		// Push these items to an object, to be then pushed into the array of examples
		exampleArray.push({
		  sentence,
		  translation,
		  transcriptionHTML
		});
	  }

	console.log(exampleArray)

	return exampleArray
}



//tatoebaAPI({ jukugo: "安全" })

// https://en.wiki.tatoeba.org/articles/show/text-search
// https://tatoeba.org/en/

// https://api.dev.tatoeba.org/unstable#?route=get-/unstable/sentences
// https://en.wiki.tatoeba.org/articles/show/api#example-1

//安全