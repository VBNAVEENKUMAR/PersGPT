const apiChat = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

const generateRes = (userMessage) => {
  const apiKey = apiChat;

  const requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${API_KEY}`,
    },
    body: JSON.stringify({
      role: "system",
      content: userMessage,
    }),
  };

  fetch(apiKey, requestOption)
    .then((res) => res.json())
    .then((data) => console.log(data));
};

generateRes("hi");
