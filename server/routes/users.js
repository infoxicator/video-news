var express = require('express');
var router = express.Router();
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/* GET users listing. */
router.get('/', async function(req, res, next) {

 const jsdomOptions = {
  includeNodeLocations: true,
  resources: "usable"
 }
 const dom = await JSDOM.fromURL("https://themoorlander.co.uk/the-great-train-robber-that-got-away-and-his-devon-link/");

 const document = dom.window.document;

  const articleTag = document.getElementsByTagName('article')[0];

  const articleText = articleTag.textContent;

  const articleTrimmed = articleText.substring(0, 6144);

  const articleImagesNodes = articleTag.querySelectorAll('img');

  const imagesArray = Array.from(articleImagesNodes);

  console.log('image', imagesArray[1].itemValue);

  const imagesUrls = imagesArray.map((img) => img.src).filter(img => img !== '');

  const finalResponse = {
    "images": imagesUrls,
    "aiSummary": articleText
  }

  res.send(finalResponse);

});

module.exports = router;
