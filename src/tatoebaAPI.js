export const tatoebaAPI = async (props) => {

	const jukugo = props.jukugo;
	const limit = 3;
	const shortURL = `https://api.dev.tatoeba.org/unstable/sentences?lang=jpn&q=${jukugo}&trans=eng&limit=${limit}&sort=words`;

	const randomExNo = Math.floor(Math.random() * limit);
	//used to decide upon a random example from the returned results

	const response = await fetch(shortURL)
	const JSON = await response.json()

	const sentence = JSON.data[randomExNo].text;
	const translation = JSON.data[randomExNo].translations[0][0].text

	console.log(sentence, translation)
	return {
		sentence: sentence,
		translation: translation
	}

}
tatoebaAPI({ jukugo: "安全" })



// https://en.wiki.tatoeba.org/articles/show/text-search
// https://tatoeba.org/en/

// https://api.dev.tatoeba.org/unstable#?route=get-/unstable/sentences
// https://en.wiki.tatoeba.org/articles/show/api#example-1

//安全