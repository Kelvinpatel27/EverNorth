// const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// export async function getAIResponse(userMessage: string): Promise<string> {
//     console.log(API_KEY)
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       temperature: 0.3,
//       messages: [
//         {
//           role: "system",
//           content: `
// You are an AI medical symptom assistant.

// Rules:
// - NEVER give a diagnosis.
// - Use phrases like "possible condition".
// - Suggest a medical department.
// - If symptoms are severe, recommend emergency services (108).
// - Always include a medical disclaimer.
// - Handle spelling mistakes gracefully.
// `
//         },
//         {
//           role: "user",
//           content: userMessage
//         }
//       ]
//     })
//   });

//   const data = await response.json();
//   return data.choices[0].message.content;
// }



// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// export async function getAIResponse(userMessage: string): Promise<string> {
//     console.log(API_KEY)
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `
// You are an AI medical symptom assistant.

// Rules:
// - NEVER give a diagnosis.
// - Use phrases like "possible condition".
// - Recommend the relevant medical department.
// - If symptoms are severe, advise emergency services (108).
// - Always include a medical disclaimer.
// - Handle spelling mistakes gracefully.

// User symptoms:
// ${userMessage}
// `
//               }
//             ]
//           }
//         ],
//         generationConfig: {
//           temperature: 0.3,
//           maxOutputTokens: 300
//         }
//       })
//     }
//   );

// //   if (!response.ok) {
// //     const err = await response.text();
// //     console.error("Gemini error:", err);
// //     throw new Error("Gemini API error");
// //   }

//   const data = await response.json();

//   return (
//     data.candidates?.[0]?.content?.parts?.[0]?.text ||
//     "⚠️ Unable to generate response."
//   );
// }

const BACKEND_URL = import.meta.env.VITE_Backend_URL;
console.log("Backend URL:", BACKEND_URL);

export async function getAIResponse(userMessage: string): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: userMessage
    })
  });

  if (!response.ok) {
    throw new Error("Backend AI error");
  }

  const data = await response.json();
  return data.reply;
}
