import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Sparkles, Stethoscope, Activity } from 'lucide-react';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Namaste! I am Dr. Drishti. I'm here to assist you with your eye health concerns today. How are you feeling?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay with variable timing
    const delay = Math.floor(Math.random() * 1000) + 1500;

    setTimeout(() => {
      let botResponse = "I understand. To give you the best advice, I'd recommend visiting a clinic for a comprehensive check-up. Is there anything specific troubling your vision?";
      const lowerInput = userMsg.toLowerCase();

      // Doctor Persona Logic
      if (lowerInput.includes('accuracy') || lowerInput.includes('reliable') || lowerInput.includes('trust')) {
        botResponse = "That's a very important question. As a medical AI, I've been trained on over 50,000 clinical retinal scans. My diagnostic accuracy is 98.5%, which is comparable to general ophthalmologists. However, I always remind my patients that I am a screening tool—your final diagnosis should come from a physical exam.";
      } 
      else if (lowerInput.includes('symptom') || lowerInput.includes('sign') || lowerInput.includes('blur')) {
        botResponse = "I see. In early Diabetic Retinopathy, you might not notice any changes. However, as it progresses, symptoms often include blurred vision, 'floaters' (spots in your vision), or difficulty distinguishing colors. Have you noticed any dark or empty areas in your vision recently?";
      } 
      else if (lowerInput.includes('pain') || lowerInput.includes('hurt') || lowerInput.includes('ache')) {
        botResponse = "I'm concerned to hear you're in pain. Diabetic Retinopathy is usually painless in the early stages. Eye pain could indicate other serious conditions like Glaucoma or severe strain. Please, I urge you to use the 'Locate Me' feature below to find the nearest emergency eye clinic immediately.";
      } 
      else if (lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('money') || lowerInput.includes('free')) {
        botResponse = "Healthcare should be accessible to all. Using the Drishti AI screening platform is completely free of charge. We believe that early detection saves sight, and cost should never be a barrier to your health.";
      } 
      else if (lowerInput.includes('doctor') || lowerInput.includes('appointment') || lowerInput.includes('clinic')) {
        botResponse = "That's a wise decision. You can find accredited specialists using our Clinic Locator map. Just click the 'Locate Me' button, and I'll show you the nearest hospitals with their contact details.";
      } 
      else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        botResponse = "Hello there. I am Dr. Drishti. I hope you are keeping well. Do you have a scan you'd like to discuss, or perhaps some questions about diabetic eye care?";
      }
      else if (lowerInput.includes('prevention') || lowerInput.includes('prevent') || lowerInput.includes('avoid')) {
        botResponse = "Excellent preventive mindset! The three pillars of preventing retinopathy are: 1) Strict blood sugar control, 2) Managing blood pressure, and 3) Annual eye exams. Even if your vision feels perfect, let's keep it that way with regular screenings.";
      }
      else if (lowerInput.includes('thank') || lowerInput.includes('thx')) {
        botResponse = "You are most welcome. Taking care of your vision is a privilege. Stay healthy, and don't hesitate to reach out if you have more concerns.";
      }
      else if (lowerInput.includes('report') || lowerInput.includes('result') || lowerInput.includes('pdf')) {
        botResponse = "Regarding your medical report—you can download a detailed PDF summary after your analysis is complete. It's designed to be shared directly with your primary care physician for follow-up.";
      }

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 group ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-brand-600 hover:bg-brand-700 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="text-white h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="text-white h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-green-500 w-3 h-3 rounded-full border-2 border-brand-600 animate-pulse"></span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden animate-fade-in-up font-sans">
          {/* Doctor Header */}
          <div className="bg-gradient-to-r from-brand-700 to-brand-600 p-4 flex items-center gap-4 shadow-md">
            <div className="relative">
              <div className="bg-white p-2 rounded-full border-2 border-brand-300">
                <Stethoscope className="text-brand-600 h-6 w-6" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">Dr. Drishti</h3>
              <p className="text-brand-100 text-xs flex items-center gap-1 opacity-90">
                <Activity className="h-3 w-3" />
                AI Chief Retinologist
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-gray-300">
            <div className="text-center text-xs text-gray-400 my-2">
              <span>Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  msg.type === 'user' ? 'bg-gray-200' : 'bg-brand-100 border border-brand-200'
                }`}>
                  {msg.type === 'user' ? <User className="h-4 w-4 text-gray-600" /> : <Stethoscope className="h-4 w-4 text-brand-600" />}
                </div>
                
                <div className={`flex flex-col max-w-[80%]`}>
                  {msg.type === 'bot' && idx > 0 && <span className="text-[10px] text-gray-400 ml-1 mb-1">Dr. Drishti</span>}
                  <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.type === 'user' 
                      ? 'bg-brand-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center border border-brand-200">
                  <Stethoscope className="h-4 w-4 text-brand-600" />
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-center bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-50 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your health concern..."
                className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-sm text-gray-700"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-brand-600 text-white p-2.5 rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-all shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              Dr. Drishti is an AI assistant. For emergencies, call 112.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
