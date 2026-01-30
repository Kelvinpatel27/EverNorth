// import { useState } from "react";
// import { symptomRules } from "../data/symptoms";

// type Sender = "user" | "bot";

// interface Message {
//   sender: Sender;
//   text: string;
// }

// const quickActions = [
//   "Chest pain and not responding",
//   "Fever and cough",
//   "Headache and vomiting",
//   "Stomach pain",
//   "Accident injury"
// ];

// export default function Chatbot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       sender: "bot",
//       text:
//         "👋 Hello! I can help you identify possible health issues based on symptoms.\n\n⚠️ This is NOT a medical diagnosis."
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);

//   const getBotReply = (msg: string): string => {
//     const text = msg.toLowerCase();

//     for (const rule of symptomRules) {
//       if (rule.symptoms.some(symptom => text.includes(symptom))) {
//         return `
// 🩺 Based on the symptoms you mentioned:

// • Possible condition: ${rule.condition}
// • Recommended department: ${rule.department}

// ${
//   rule.emergency
//     ? "🚨 This may be an emergency.\nPlease call 108 or use the Emergency button immediately."
//     : "ℹ️ Please consult a doctor for further evaluation."
// }

// ⚠️ This is only an informational assistant, not a medical diagnosis.
//         `;
//       }
//     }

//     return `
// ❓ I couldn't clearly identify the symptoms.

// Please describe symptoms like:
// • chest pain
// • fever
// • breathing difficulty
// • injury or accident

// ⚠️ This is not a medical diagnosis.
//     `;
//   };

//   const sendMessage = (text: string) => {
//     if (!text.trim()) return;

//     setMessages(prev => [...prev, { sender: "user", text }]);
//     setInput("");
//     setTyping(true);

//     setTimeout(() => {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: getBotReply(text) }
//       ]);
//       setTyping(false);
//     }, 1200); // slightly longer = more "thinking"
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700"
//       >
//         🩺
//       </button>

//       {open && (
//         <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col">
//           {/* Header */}
//           <div className="bg-red-600 text-white p-4 rounded-t-xl font-semibold">
//             Symptom Assistant
//           </div>

//           {/* Messages */}
//           <div
//             className="flex-1 p-3 overflow-y-auto space-y-3 text-sm whitespace-pre-line"
//             onWheel={(e) => e.stopPropagation()}
//           >
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 className={`flex ${
//                   m.sender === "bot" ? "justify-start" : "justify-end"
//                 }`}
//               >
//                 <div
//                   className={`px-4 py-2 rounded-lg max-w-[80%] ${
//                     m.sender === "bot"
//                       ? "bg-gray-200 text-gray-900"
//                       : "bg-red-600 text-white"
//                   }`}
//                 >
//                   {m.text}
//                 </div>
//               </div>
//             ))}

//             {/* Typing Animation */}
//             {typing && (
//               <div className="flex items-center gap-2 text-gray-500 text-xs">
//                 <span className="italic">Assistant is thinking</span>
//                 <span className="flex gap-1">
//                   <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" />
//                   <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-150" />
//                   <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-300" />
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Quick Actions */}
//           <div className="flex flex-wrap gap-2 px-3 pb-2">
//             {quickActions.map(action => (
//               <button
//                 key={action}
//                 onClick={() => sendMessage(action)}
//                 className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
//               >
//                 {action}
//               </button>
//             ))}
//           </div>

//           {/* Input */}
//           <div className="border-t flex">
//             <input
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               placeholder="Describe symptoms..."
//               className="flex-1 p-3 text-sm outline-none"
//             />
//             <button
//               onClick={() => sendMessage(input)}
//               className="bg-red-600 text-white px-5 hover:bg-red-700"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import { useEffect, useRef, useState } from "react";
// import { symptomRules } from "../data/symptoms";
import { getAIResponse } from "../services/aiChat";
import { Stethoscope } from "lucide-react";

type Sender = "user" | "bot";

interface Message {
  sender: Sender;
  text: string;
}

const quickActions = [
  "Chest pain and not responding",
  "Fever and cough",
  "Headache and vomiting",
  "Stomach pain",
  "Accident injury"
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        "👋 Hello! I can help you identify possible health issues based on symptoms.\n\n⚠️ This is NOT a medical diagnosis."
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // 🔹 Ref for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Auto-scroll when messages / typing change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);



  const sendMessage = async (text: string) => {
  if (!text.trim()) return;

  setMessages(prev => [...prev, { sender: "user", text }]);
  setInput("");
  setTyping(true);

  try {
    const aiReply = await getAIResponse(text);
    setMessages(prev => [...prev, { sender: "bot", text: aiReply }]);
  } catch (error) {
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: "⚠️ Unable to get AI response right now. Please try again."
      }
    ]);
  } finally {
    setTyping(false);
  }
};


  return (
    <>
      {/* Floating Button */}
      {/* <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-transform hover:scale-105"
      >
        🩺
      </button> */}

     


<button
  onClick={() => setOpen(true)}
  className="
    fixed bottom-6 right-6
    bg-gradient-to-br from-white/80 to-blue-100/80
    backdrop-blur-md
    text-blue-700
    p-4 rounded-full
    shadow-xl
    hover:from-white hover:to-blue-200
    transition-all duration-300
    hover:scale-105
  "
  aria-label="Open AI health assistant"
>
  <Stethoscope size={24} strokeWidth={2.2} />
</button>

      {/* Chatbot Panel */}
      <div
      
        className={`fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col
        transform transition-all duration-300 ease-out z-[9999]
        ${open ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-xl font-semibold flex justify-between items-center">
          <span>Symptom Assistant</span>
          <button
            onClick={() => setOpen(false)}
            className="text-white hover:text-gray-200 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
        // ref={chatScrollRef}
          className="flex-1 p-3 overflow-y-auto space-y-3 text-sm whitespace-pre-line"
          // onWheel={(e) => e.stopPropagation()}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.sender === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  m.sender === "bot"
                    ? "bg-gray-200 text-gray-900"
                    : "bg-blue-600 text-white"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* AI Thinking Animation */}
          {typing && (
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <span className="italic">Assistant is thinking</span>
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150" />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300" />
              </span>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {/* <div className="flex flex-wrap gap-2 px-3 pb-2">
          {quickActions.map(action => (
            <button
              key={action}
              onClick={() => sendMessage(action)}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition"
            >
              {action}
            </button>
          ))}
        </div> */}

        {/* Input */}
        <div className="border-t flex">
          {/* <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe symptoms..."
            className="flex-1 p-3 text-sm outline-none rounded-xl"
          /> */}

          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Describe symptoms..."
            className="flex-1 p-3 text-sm outline-none rounded-xl"
          />

          <button
            onClick={() => sendMessage(input)}
            className="bg-blue-600 text-white px-5 hover:bg-blue-700 transition rounded-br-xl"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
