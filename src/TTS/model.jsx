import { launch } from "puppeteer";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

async function scrapeWebPage(url) {
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto(url);

  const content = await page.evaluate(() => {
    return document.body.innerText;
  });

  await browser.close();

  return content;
}

async function convertTextToSpeech(text) {
  const client = new TextToSpeechClient();

  const request = {
    input: { text: text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent;
}

export { scrapeWebPage, convertTextToSpeech };
