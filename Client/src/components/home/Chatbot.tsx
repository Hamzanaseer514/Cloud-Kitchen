import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { generateChatResponse } from '../../services/openai';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../utils/config';

// FAQ data for suggested questions
const suggestedQuestions = [
  "What are your delivery hours?",
  "Do you offer vegetarian options?",
  "How long does delivery take?",
  "Do you have a loyalty program?",
  "How do I place an order?",
  "What payment methods do you accept?"
];

// Message type definition
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};


// Suggested questions component
const SuggestedQuestions = ({ onSelectQuestion }: { onSelectQuestion: (question: string) => void }) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question)}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-orange-100 dark:hover:bg-gray-600 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

const Chatbot = () => {

  const [isPremium, setIsPremium] = useState(false); // Change this to determine if the user has a premium subscription
  const [premiumPlan, setPremiumPlan] = useState('free'); // Change this to determine if the user has a premium subscription
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(''); // Change this to determine if the user has a premium subscription
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to Cloud Kitchen. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  //   const { isDarkMode } = useTheme();



  // const response = await fetch("http://localhost:5000/api/auth/adduserorder", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  //   body: JSON.stringify({ items, paymentStatus, paymentType, totalPrice, totalItems,address}), // Ensure this matches backend expectations
  // });
  // if (!response.ok) {
  //   throw new Error(`HTTP Error! Status: ${response.status}`); // Handle errors properly
  // }

  // Fetch the user's premium status when the component loads
  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/check-premium`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        const data = await response.json();
        console.log("Received data:", data);  
  
        if (data.isPremium) {
          setIsPremium(true);
          setPremiumPlan(data.plan);
        } else {
          setIsPremium(false);
        }
  
        setRole(data.role); // 👈 Set role also in frontend state if needed
  
      } catch (error) {
        console.error('Error checking premium status:', error);
      }
    };
  
    checkPremiumStatus();
  }, []);
  
  

  

  const handleClickChatButton = () => {
    if (isPremium && premiumPlan === "Advance" || premiumPlan === "Pro" ) {
      setIsOpen(true);
    } else if (role === "customer") {
      // Redirect to the premium plan page if the user hasn't bought it
      navigate('/customer-premium'); // This will navigate to CustomerPremium page
      alert("Please buy the premium monthly or yearly plan to use the chatbot");
    }
    else {
      // Redirect to the premium plan page if the user hasn't bought it
      navigate('/chef-premium-chatbot'); // This will navigate to ChefPremium page
      alert("Please buy the premium monthly or yearly plan to use the chatbot");
    } 
  };
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Detect if the screen is small
  const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;

  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Get response from OpenAI
      const response = await generateChatResponse(inputValue);

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting chat response:', error);

      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle selecting a suggested question
  const handleSelectQuestion = (question: string) => {
    setInputValue(question);
    // Focus the input after selecting a question
    document.getElementById('chatInput')?.focus();
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat button with bouncing animation and hover tooltip */}
      <AnimatePresence>
        <motion.button
          onClick={handleClickChatButton}
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-500 ease-in-out group bg-orange-500 hover:bg-orange-600 text-white`}

          aria-label="Open chat"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0], // Bouncing effect for the entire button
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 bg-black text-white text-xs px-2 py-1 rounded transition-opacity duration-300 group-hover:opacity-100 ">
              AI Chatbot
            </span>
          </motion.div>
        </motion.button>
      </AnimatePresence>

      {/* Chat window with responsive adjustments */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            className="fixed bottom-6 right-6 w-[90vw] max-w-[400px] sm:max-w-md h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                <h3 className="font-semibold">Cloud Kitchen Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                      ? 'bg-orange-400 text-white rounded-tr-none'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm rounded-tl-none'
                    }`}>
                    <div className="flex items-center mb-1">
                      {message.sender === 'bot' ? (
                        <Bot className="h-4 w-4 mr-1 text-orange-400 dark:text-orange-400" />
                      ) : (
                        <User className="h-4 w-4 mr-1 text-white" />
                      )}
                      <span className={`text-xs ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {message.sender === 'user' ? 'You' : 'Assistant'} • {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    className="flex items-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 text-orange-400 animate-spin" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Assistant is typing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions (limited to 2 on small screens) */}
            <div className="px-4 pt-2 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Suggested Questions:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQuestions.slice(0, isSmallScreen ? 2 : suggestedQuestions.length).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectQuestion(question)}
                    className="p-2 text-sm text-left bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <input
                  id="chatInput"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:text-white transition-colors"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === ''}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-r-lg flex items-center justify-center ${inputValue.trim() === ''
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-orange-400 hover:bg-orange-500 hover:bg-orange-600 text-white'
                    } transition-colors`}
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

// #0F766E