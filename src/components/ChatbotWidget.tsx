import React, { useState, useRef, useEffect } from "react";
import { MessageSquareCode, Send, X, Bot, User, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Greetings, sir! I am **DressRight AI**, your personal virtual men's fashion stylist. I am ready to advise on suits, blazers, fabric care, or correct sizing measurements for DressRight4You. How may I assist your style today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterQuestions = [
    "Suggest a sharp wedding suit combination",
    "What is Super-130s Merino Wool?",
    "How do I calculate my jacket size?",
    "Do you ship from California?"
  ];

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Append user message
    const nextMessages: Message[] = [...messages, { role: "user", text: textToSend }];
    setMessages(nextMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      // API call to Express backend proxying Gemini
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          // Exclude first greeting to keep prompt concise, pass remaining history
          history: nextMessages.slice(1, -1)
        })
      });

      if (!response.ok) {
        throw new Error("Stylist server unreachable");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text }]);

    } catch (error) {
      console.error("AI Stylist Connection error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I apologize, sir, my styling matrix is currently offline. Rest assured, our master tailors are available at **818-913-8520** or via email at **roy460@hotmail.com** to guide your fitting!"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="stylist-chatbot-widget">
      
      {/* Floating Toggle Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#050505] border border-white/10 text-[#d4af37] hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] p-4 rounded-none shadow-2xl transition-all duration-300 flex items-center gap-2 group cursor-pointer"
          aria-label="Open AI Stylist chat window"
          id="chatbot-toggle-btn"
        >
          <MessageSquareCode className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap">
            Ask AI Stylist
          </span>
        </button>
      )}

      {/* Floating Chat Window Dialog */}
      {isOpen && (
        <div 
          className="w-[320px] sm:w-[380px] h-[480px] sm:h-[550px] bg-[#0a0a0a] border border-white/10 rounded-none overflow-hidden flex flex-col shadow-2xl animate-zoomIn"
          id="chatbot-chat-dialog"
        >
          
          {/* Header styling */}
          <div className="bg-[#0d0d0d] border-b border-white/10 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-none bg-[#050505] border border-white/10 flex items-center justify-center text-[#d4af37]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#d4af37] flex items-center gap-1.5">
                  DressRight Stylist AI
                  <Sparkles className="w-3 h-3 animate-bounce text-[#d4af37]" />
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">California Sizing Assistant</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-none text-slate-500 hover:text-white hover:bg-black/60 border border-transparent hover:border-white/10 transition-colors cursor-pointer"
              id="chatbot-close-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bubbles Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-black/20 scrollbar-thin">
            
            {messages.map((msg, index) => {
              const isAI = msg.role === "model";
              return (
                <div
                  key={index}
                  className={`flex gap-2.5 max-w-[85%] text-left ${isAI ? "mr-auto flex-row" : "ml-auto flex-row-reverse"}`}
                >
                  {/* Icon */}
                  <div className={`w-6 h-6 rounded-none flex items-center justify-center flex-shrink-0 text-[10px] ${
                    isAI ? "bg-[#0d0d0d] text-[#d4af37] border border-white/10" : "bg-[#d4af37] text-black"
                  }`}>
                    {isAI ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  {/* Bubble body */}
                  <div className={`rounded-none px-4 py-2.5 text-xs font-sans leading-relaxed shadow-sm ${
                    isAI 
                      ? "bg-[#0d0d0d] text-slate-200 border border-white/10" 
                      : "bg-[#d4af37]/10 text-white border border-[#d4af37]/30"
                  }`}>
                    {/* Render raw markdown markers or bold tags simply */}
                    <p className="whitespace-pre-wrap font-light">
                      {msg.text.split("**").map((chunk, i) => 
                        i % 2 === 1 ? <strong key={i} className="text-[#d4af37] font-semibold">{chunk}</strong> : chunk
                      )}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Typing status indicator */}
            {isTyping && (
              <div className="flex gap-2.5 mr-auto">
                <div className="w-6 h-6 rounded-none bg-[#0d0d0d] text-[#d4af37] border border-white/10 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#0d0d0d] border border-white/10 rounded-none px-4 py-2.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-none animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-none animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-none animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick starter options panel */}
          {messages.length === 1 && !isTyping && (
            <div className="p-3 border-t border-white/10 bg-[#0d0d0d] text-left space-y-1.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold px-1">Stylist Prompts</span>
              <div className="grid grid-cols-1 gap-1">
                {starterQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-left bg-[#050505] hover:bg-[#0d0d0d] border border-white/10 rounded-none p-2 text-[10px] text-slate-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 font-mono tracking-wide transition-colors cursor-pointer"
                  >
                    ✦ {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form input bottom row */}
          <form onSubmit={handleFormSubmit} className="p-3 border-t border-white/10 bg-[#0d0d0d] flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about suits, sizes, returns..."
              className="flex-grow bg-[#050505] border border-white/10 rounded-none px-4 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] placeholder-slate-650 font-mono"
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="bg-[#d4af37] hover:bg-[#b8901c] disabled:bg-black disabled:text-slate-650 text-black p-2 rounded-none transition-all shadow-md flex items-center justify-center cursor-pointer"
              id="chatbot-send-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
