//

//Custom script to update ID's of the JSON file
//used after removing/adding entries
//must be copy-pasted back into file to save. manually.

// Import the JSON file
import jsonData from './nf01.json' assert { type: 'json' };

// Using a 'for' loop to rename the 'id' to its order in the array
for (let i = 0; i < jsonData.entries.length; i++) {
  jsonData.entries[i].id = i + 1; // Rename the id to reflect its order (starting from 1)
}

// Log the updated JSON to verify the change
console.log(JSON.stringify(jsonData, null, 2));
