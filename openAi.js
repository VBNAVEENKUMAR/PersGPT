// import Configuration from "openai";

// const { Configuration, OpenAIApi } = require("openai");

import OpenAI from "openai";

// const apiKey = "";
// const config = new Configuration({
//   apiKey: "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",
// });

const key = "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";
const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,
});

export async function sendMessage(message) {
  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: message,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
  });
  return completion.choices[0].text;
}
