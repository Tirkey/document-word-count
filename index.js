const _KEY =
  "dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9";
const _MAINFILE = "http://norvig.com/big.txt";
const _LOOKUP = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

async function fetchMyFile() {
  /** fetching the external txt file */
  const resp = await fetch(_MAINFILE);
  const textResp = await resp.text();
  return textResp;
}

app.get("/txt_response", async (req, res) => {
  // const fileUrl = "http://norvig.com/big.txt";
  // const resp = await fetch(fileUrl);
  // const textResp = await resp.text();
  // res.write(textResp);

  fetchMyFile()
    .then((doc) => {
      /**get all words in document */
      let wordList = {};
      let allowedWords = doc.split(/\W+/);
      for (let i = 0; i < allowedWords.length; i++) {
        let word = allowedWords[i].toLowerCase();
        if (!/\d+/.test(word)) {
          //ignoring the numbers
          if (wordList[word]) {
            wordList[word]++;
          } else {
            wordList[word] = 1;
          }
        }
      }
      return wordList;
    })
    .then((response) => {
      /**top 10 words(order by word Occurrences) */
      return Object.entries(response)
        .sort((a, b) => b[1] - a[1])
        .map((el) => {
          return { word: el[0], output: { count: el[1] } };
        })
        .slice(0, 10);
    })
    .then((response) => {
      /**look up a words pos and syn */

      //let promises = response;
      let promises = [];
      for (let i = 0; i < response.length; i++) {
        let queryParams =
            "?key=" + _KEY + "&lang=en-en&text=" + response[i].word,
          finalCall = _LOOKUP + queryParams;
        console.log(`word is : ${response[i].word}.`);
        promises.push(fetch(finalCall));
      }
      return Promise.all(promises);
    })
    .then((response) => {
      /** we get the output for all top 10 words
       * here we have to think of combining the object with word-and-count and details fetched from lookup.json
       * TODO: combine response from previous response
       */
      return Promise.all(
        response.map((ijk) => {
          return ijk.json();
        })
      );
    })
    .then((response) => {
      res.json({ result: response });
    });
});

app.listen("9092", function (error) {
  if (error) {
    console.log("Something went wrong...");
  } else {
    console.log("Server is listening at port 9092");
  }
});

/**Open this in the browser:
 * http://localhost:9092/txt_response
 */
