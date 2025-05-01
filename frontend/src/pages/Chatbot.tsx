import { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `You are an AI-powered business consultant for SanghBuy, a platform for group buying and retail pooling. Your primary goal is to provide real-time insights on market trends, seasonal demand shifts, inventory recommendations, and risk warnings that could impact profitability for offline retailers in India. Your responses should be data-driven, practical, and easy to understand.

Key Functions & Capabilities:
1. Market Trends & Insights: Analyze market trends based on seasonality, consumer demand, and brand popularity. Inform about high-demand products during specific times and festivals.
2. Inventory & Stocking Recommendations: Guide on optimal inventory levels, predict declining products, and suggest bulk purchasing strategies.
3. Risk & Loss Prevention Alerts: Identify warning signs of declining demand, price fluctuations, and market disruptions.
4. Personalized Insights: Tailor responses based on retailer's business type, location, and needs.

Keep explanations clear, use examples, offer step-by-step solutions, and avoid technical jargon.

Now, answer the following question about retail strategies, buying pools, group purchases, or market insights: ${input}`
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      let botResponse = "";
      if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        botResponse = response.data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response format");
      }
      
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, { text: "❌ Error fetching response. Please try again.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Minimal spacer to clear the navbar */}
      <div className="h-14"></div> {/* Reduced height of spacer */}
      
      {/* Even slimmer Chatbot Header */}
      <div className="flex items-center justify-start py-2 px-3 border-b dark:border-gray-800"> {/* Reduced vertical padding */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-sangh-100 dark:bg-sangh-900 flex items-center justify-center"> {/* Slightly smaller icon */}
            <Bot className="w-4 h-4 text-sangh-600 dark:text-sangh-400" />
          </div>
          <div>
            <h1 className="text-base font-semibold">SanghBuy Assistant</h1> {/* Smaller font size */}
            <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about retail trends and strategies</p> {/* Smaller description */}
          </div>
        </div>
      </div>

      {/* Further Expanded Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 h-[calc(100vh-160px)]"> {/* Increased height, reduced padding and spacing */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <Bot className="w-12 h-12 mb-4 text-sangh-600/50 dark:text-sangh-400/50" />
            <p className="text-center">How can I help you with your retail business today?</p>
            <p className="text-sm mt-2 text-center">Ask about market trends, inventory strategies, or business insights...</p>
          </div>
        )}
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === "user" ? "bg-sangh-100 dark:bg-sangh-900" : "bg-blue-100 dark:bg-blue-900"}`}>
                {msg.sender === "user" ? <User className="w-4 h-4 text-sangh-600 dark:text-sangh-400" /> : <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </div>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2 transition-all duration-300 ${msg.sender === "user" ? "bg-sangh-600 text-white" : "bg-white dark:bg-gray-800 shadow-sm"}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Thinking...</span>
          </motion.div>
        )}
        {/* Invisible div for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Compact Input Area */}
      <div className="py-2 px-3 border-t dark:border-gray-800"> {/* Reduced vertical padding */}
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input 
            type="text" 
            placeholder="Ask about market trends, inventory strategies, or business insights..." 
            value={input} 
            onChange={handleInputChange} 
            onKeyDown={handleKeyDown} 
            className="flex-1" 
            disabled={loading} 
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()} className="bg-sangh-600 hover:bg-sangh-700 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;