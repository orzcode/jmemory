export const tatoebaAPI = async (jukugo) => {
  try {
    const limit = 6;

    const shortURL = `https://api.tatoeba.org/unstable/sentences?lang=jpn&q="%22${encodeURIComponent(
      jukugo
    )}%22"&trans=eng&limit=${limit}&sort=words`;
    //note the %22 is needed to send in quotes - to search for full jukugo

    const response = await fetch(shortURL);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const JSON = await response.json();

    const exampleArray = JSON.data.map((example) => {
      const sentence = example.text;

      const findFirstText = (translations) => {
        const flatTranslations = translations.flat(); // Flatten the array

        let justText = [];
        flatTranslations.forEach((translation) => {
          if (translation.text) {
            justText.push(translation.text);
          }})

        const shortest = justText.reduce((a, b) => (a.length < b.length ? a : b));
        
        return shortest
      };

      const translation = findFirstText(example.translations);
      //translations are placed in strange places.
      //this is the ~english~ example sentence text
      //finds the shortest english translation of the same jap sentence

      const transcriptionHTML = example.transcriptions[0].html;
      //note: .text instead of .html can provide non-html kanji+kana

      return { sentence, translation, transcriptionHTML };
    });

    return exampleArray;
  } catch (error) {
    console.error(`Failed to fetch Tatoeba for "${jukugo}":`, error);
    return [];
  }
};

//console.log(await tatoebaAPI("意見"));

export default tatoebaAPI;

//tatoebaAPI({ jukugo: "安全" })

// https://en.wiki.tatoeba.org/articles/show/text-search
// https://tatoeba.org/en/

// https://api.dev.tatoeba.org/unstable#?route=get-/unstable/sentences
// https://en.wiki.tatoeba.org/articles/show/api#example-1