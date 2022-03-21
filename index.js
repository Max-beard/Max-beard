/**
 * Name: Max Beard
 * Date: Feb 26, 2022
 * Section: AF Marina Wooden & Ludvig Liljenberg
 * This is the JavaScript for the About Me 2.0 page.
 * This script provides functionality to the topic button and fun fact button.
 * When these buttons are pressed, they fetch information from the Beard API
 * and dynamically update the webpage with the results or handle any errors.
 */
"use strict";

(function() {
  const URL = "http://localhost:8000";

  window.addEventListener("load", init);

  /**
   * Adds functionality to the buttons
   */
  function init() {
    let buttons = qsa("button");
    buttons[0].addEventListener("click", getContent);
    buttons[1].addEventListener("click", getFact);
  }

  /**
   * Fetches content from the Beard API based on the user's selected topic
   */
  function getContent() {
    fetch(URL + "/content/" + qs("select").value)
      .then(statusCheck)
      .then(res => res.json())
      .then(handleContent)
      .catch(contentError);
  }

  /**
   * Fetches a fact from the Beard API and updates the page with the returned text or error
   */
  function getFact() {
    fetch(URL + "/fun_fact/" + id("facts").value)
      .then(statusCheck)
      .then(res => res.text())
      .then((res) => {
        id("fact").textContent = res;
      })
      .catch(id("fact").textContent = "Oops, something went wrong! Please check your connection");
  }

  /**
   * Handles the response from the Beard API and updates the page to show the content,
   * possibly providing links to projects
   * @param {json} res - the content response from the Beard API
   */
  function handleContent(res) {
    let article = qs("article");
    let name = gen("p");
    let description = gen("p");
    let image = gen("img");
    if (res.name === "Footballer" || res.name === "Trendup" || res.name === "PokeBirthday") {
      let link = id("link");
      link.textContent = res.name;
      link.href = res.folder + "index.html";
      if (res.name === "Trendup") {
        link.href = res.folder;
      }
    } else {
      name.textContent = res.name;
      name.setAttribute("id", "name");
      article.replaceChild(name, id("name"));
    }
    description.textContent = res.description;
    description.setAttribute("id", "description");
    image.src = "img/" + res.image;
    image.alt = res.name;
    image.setAttribute("id", "image");
    article.replaceChild(description, id("description"));
    article.replaceChild(image, id("image"));
  }

  /**
   * In case of a content error, updates the page to display the message
   * @param {text} res - the fun fact response from the Beard API
   */
  function contentError(res) {
    id("name").textContent = res;
    id("description").textContent = "";
    id("image").src = "";
    id("image").alt = "";
  }

  /* --- CSE 154 HELPER FUNCTIONS --- */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
   * Returns a new DOM object
   * @param {string} el - the DOM object type wanted
   * @returns {object} - created DOM object
   */
  function gen(el) {
    return document.createElement(el);
  }

})();