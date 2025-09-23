export const tatoebaAPI = async (jukugo) => {
  try {
    const limit = 6;

    // Use proxy URL in development, direct URL in production
    const isDev = import.meta.env.DEV;
    const baseURL = isDev 
      ? '/api/tatoeba'  // This will be proxied by Vite
      : 'https://api.dev.tatoeba.org';  // Direct URL for production

    const shortURL = `${baseURL}/unstable/sentences?lang=jpn&q="%22${encodeURIComponent(
      jukugo
    )}%22"&showtrans:lang=eng&limit=${limit}&sort=words`;

    //console.log('Fetching from:', shortURL);

    const response = await fetch(shortURL);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const JSON = await response.json();

    console.log(JSON);

    const exampleArray = JSON.data.map((example) => {
      const sentence = example.text;

      const findFirstText = (translations) => {
        const flatTranslations = translations.flat(); // Flatten the array
        let justText = [];
        flatTranslations.forEach((translation) => {
          if (translation.text) {
            justText.push(translation.text);
          }
        });

        // Check if the array is empty before attempting to reduce it
        if (justText.length === 0) {
          return ""; // Return an empty string or a default message
        }

        const shortest = justText.reduce((a, b) =>
          a.length < b.length ? a : b
        );

        return shortest;
      };
      const translation = findFirstText(example.translations);
      //translations are placed in strange places.
      //this is the ~english~ example sentence text
      //finds the shortest english translation of the same jap sentence

      const transcriptionHTML = example.transcriptions[0]?.html || '';
      //note: .text instead of .html can provide non-html kanji+kana

      return { sentence, translation, transcriptionHTML };
    });

    return exampleArray;
  } catch (error) {
    console.error(`Failed to fetch Tatoeba for "${jukugo}":`, error);
    return [];
  }
};

// Test the function - this will work in Node.js terminal using the direct URL
//console.log(await tatoebaAPI("意見"));

export default tatoebaAPI;