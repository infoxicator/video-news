var express = require('express');
var router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

router.post('/', async function(req, res, next) {

const articleUrl = req.body.articleUrl;

const jsdomOptions = {
  includeNodeLocations: true,
  resources: "usable"
 }
 const dom = await JSDOM.fromURL(articleUrl, jsdomOptions);

 const document = dom.window.document;

  const articleTag = document.getElementsByTagName('article')[0];

  const articleText = articleTag.textContent;

  const articleImagesNodes = articleTag.querySelectorAll('img');

  const imagesArray = Array.from(articleImagesNodes);

  const imagesUrls = imagesArray.map((img) => img.src);

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      
      const response = await openai.createCompletion("text-davinci-001", {
        prompt: articleText+'\n\nTl;dr',
        temperature: 0.7,
        max_tokens: 300,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      console.log(response.data);

    const finalResponse = {
      "images": imagesUrls,
      "aiSummary": response.data.choices[0].text
    }
  
    res.send(finalResponse);
});

module.exports = router;
