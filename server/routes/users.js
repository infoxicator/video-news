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
 const dom = await JSDOM.fromURL("https://themoorlander.co.uk/moon-landing-in-exeter-cathedral/", jsdomOptions);

 const document = dom.window.document;

  const articleTag = document.getElementsByTagName('article')[0];

  const articleText = articleTag.textContent;

  const articleImagesNodes = articleTag.querySelectorAll('img');

  const imagesArray = Array.from(articleImagesNodes);

  const imagesUrls = imagesArray.map((img) => img.src);

  const finalResponse = {
    "images": imagesUrls,
    "aiSummary": articleText
  }

  res.send(finalResponse);

});

module.exports = router;
