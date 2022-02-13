var express = require('express');
var router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

router.post('/', async function(req, res, next) {
 
try {
const articleUrl = req?.body?.articleUrl;

const ageGroup = req?.body?.age;
 
let maxTokens = req?.body?.maxTokens || 300;

const jsdomOptions = {
  includeNodeLocations: true,
  resources: "usable"
 }

 const dom = await JSDOM.fromURL(articleUrl, jsdomOptions);

 const document = dom?.window?.document;

 const title = document?.getElementsByTagName('title')[0];

 const titleText = title?.textContent;

 const date = document?.querySelector('meta[property="article:published_time"]')
 const dateContent = date?.content;

  const articleTag = document?.getElementsByTagName('article')[0];

  const articleText = articleTag?.textContent;

  const articleTrimmed = articleText?.substring(0, 6144);

  const articleImagesNodes = articleTag?.querySelectorAll('img');

  const imagesArray = Array.from(articleImagesNodes);

  const imagesUrls = imagesArray.map((img) => img?.src).filter(img => img !== '');

  let prompt = articleTrimmed+'\n\nTl;dr';

  if(ageGroup) {
    prompt = `Summarize this for a ${ageGroup} year old\n\n${articleTrimmed}`;
    maxTokens = req?.body?.maxTokens || 120;
  }
  try {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      
        const response = await openai.createCompletion("text-davinci-001", {
        prompt,
        temperature: 0.7,
        max_tokens: maxTokens,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

    const finalResponse = {
      "title": titleText,
      "images": imagesUrls,
      "date": dateContent,
      "aiSummary": response.data.choices[0].text
    }
    res.send(finalResponse);
  } catch (e) {
    throw new Error(e?.response?.data?.error?.message);
  }
} catch (err) {
    res.status(500).send({"error": `Something went wrong... \n ${err.name}`, "message": err.message})
}

});

module.exports = router;
