// Old
import OpenAI from "openai";
const btn = document.querySelector("#click")

const openai = new OpenAI({
  apiKey: "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" // This is also the default, can be omitted
});

// New


console.log(btn)

btn.addEventListener("click", async () => {

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Hello!"}],
  });
  console.log(chatCompletion.choices[0].message);
})