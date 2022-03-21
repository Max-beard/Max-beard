"use strict";

const express = require("express");
const app = express();

const CONTENT = {
  "Footballer": {
    "name": "Footballer",
    "description": "NFL trivia game for my favorite Football player",
    "image": "footballer.png",
    "folder": "cp2-js-maxbeard/"
  },
  "Pokebirthday": {
    "name": "PokeBirthday",
    "description": "Connects to the PokeApi to tell you your unique birthday pokemon",
    "image": "pokebirthday.png",
    "folder": "cp3-ajax-maxbeard/"
  },
  "Trendup": {
    "name": "Trendup",
    "description": "Uses various APIs to collect media on assorted topics",
    "image": "trendup.png",
    "folder": "https://maxbeard.pythonanywhere.com/"
  },
  "pokemon": {
    "name": "Turtwig",
    "description": "From Bulbapedia: Photosynthesis occurs across its body under the sun." +
                   "The shell on its back is actually hardened soil.",
    "image": "turtwig.png"
  },
  "song": {
    "name": "New Slang",
    "description": "A song by The Shins popularized by the movie 'Garden State'",
    "image": "shins.jpeg"
  },
  "show": {
    "name": "Attack on Titan",
    "description": "Anime where humanity has to fight against giant titans to survive",
    "image": "aot.jpeg"
  }
};

const facts = ["My first name is actually Joseph", "I am a middle child with two siblings, each " +
               "three years apart", "My favorite animal is an owl", "I have gotten more than a " +
               "dozen stitches in my head"];

// Returns the json of content for the select topic
app.get("/content/:topic", (req, res) => {
  if (isTopic(req.params.topic)) {
    res.json(CONTENT[req.params.topic]);
  } else {
    res.status(400).type("text");
    res.send("I told you not to pick this one...");
  }
});

/**
 * Helper function that checks if a given topic is in the API's CONTENT
 * @param {string} req - the name of the user's topic parameter
 * @returns {boolean} - true if in CONTENT, otherwise, false
 */
function isTopic(req) {
  let keys = Object.keys(CONTENT);
  return keys.includes(req);
}

// Returns a text of a fun fact based off a user's chosen number
app.get("/fun_fact/:number", (req, res) => {
  let fact = parseInt(req.params.number);
  res.type("text").send(facts[fact]);
});

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);