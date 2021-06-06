## This is a node/JS project.

## The purpose of the application is to fetch an external document file.

## The code then finds the top ten words in the document based on the frequency of words in the doc, numbers like 1,123 etc. are ignored here.

## The code then finds the position of speech(pos) and synonyms of each of these top ten words from a dictionary.

## The end user sees the final output as a JSON of words with its pos and synonyms.

## The JSON structure looks like:

{
{
one_of_the_top_ten_words: {
count_of_word_in_document: x,
details: {
pos:"xyz",
synonyms: [array of meanings]
}
}
}
}

## Steps to run the setup:

## 1. Install the GIT repo in local.

## 2. Run `npm install`

## 3. Run `npm start`

## 4. Hit the url `http://localhost:9092/txt_response` in the browser.

## 5. Final output is displayed as a JSON.
