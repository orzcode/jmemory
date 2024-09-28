export const limit = 3;
 //alter this number to control how many examples are returned
 
export const tatoebaAPI = async (jukugo) => {
  //console.log("Tatoeba API call: " + jukugo);

  const shortURL = `https://api.dev.tatoeba.org/unstable/sentences?lang=jpn&q="%22${encodeURIComponent(jukugo)}%22"&trans=eng&limit=${limit}&sort=words`;
	//note the %22 is needed to send in quotes - to search for full jukugo

  const response = await fetch(shortURL);
  const JSON = await response.json();

  const exampleArray = [];
  for (const example of JSON.data) {

    const sentence = example.text;

    //sometimes, translation array will the 2nd for some reason:
    const translation = example.translations[0].length > 0
  ? example.translations[0][0].text
  : example.translations[1][0].text;
  
    const transcriptionHTML = example.transcriptions[0].html;
    //note: .text instead of .html can provide non-html kanji+kana

    // Push these items to an object, to be then pushed into the array of examples
    exampleArray.push({
      sentence,
      translation,
      transcriptionHTML,
    });
  }

  console.log(exampleArray);
  return exampleArray;
};
export default tatoebaAPI;

//tatoebaAPI({ jukugo: "安全" })

// https://en.wiki.tatoeba.org/articles/show/text-search
// https://tatoeba.org/en/

// https://api.dev.tatoeba.org/unstable#?route=get-/unstable/sentences
// https://en.wiki.tatoeba.org/articles/show/api#example-1

//安全

// export const limit = 3;

// export const tatoebaAPI = async (jukugo) => {
// 	//console.log("Tatoeba API call: " + jukugo);

// 	// Create the API URL
// 	const shortURL = `https://api.dev.tatoeba.org/unstable/sentences?lang=jpn&q=${encodeURIComponent(jukugo)}&trans=eng&limit=${limit}&sort=words`;

// 	try {
// 		const response = await fetch(shortURL);
	
// 		// Check if the response is ok (status 200)
// 		if (!response.ok) {
// 			throw new Error(`Error fetching data: ${response.statusText}`);
// 		}
	
// 		const JSON = await response.json();
	
// 		// Ensure data is in the expected format
// 		if (!JSON.data || !Array.isArray(JSON.data)) {
// 			throw new Error('Unexpected response format: JSON.data is not an array');
// 		}

// 		const exampleArray = [];
// 		for (const example of JSON.data) {
// 			const sentence = example.text;
// 			const translation = example.translations[0][0].text;
// 			const transcriptionHTML = example.transcriptions[0].html;

// 			// Push these items to an object, to be then pushed into the array of examples
// 			exampleArray.push({
// 				sentence,
// 				translation,
// 				transcriptionHTML
// 			});
// 		}

// 		return exampleArray;
// 	} catch (error) {
// 		console.error("API error:", error);
// 		return []; // Return an empty array on error
// 	}
// }

// export default tatoebaAPI;