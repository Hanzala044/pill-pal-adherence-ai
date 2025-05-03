
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, User, Send, Pill, AlertCircle, Minimize, X, MessageSquare } from 'lucide-react';

type Message = {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

export default function MedicationChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: "Hello! I'm MediBot, your medication assistant. Ask me about any medication, its uses, side effects, or interactions.",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 'auto', y: 'auto' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const mockResponses: Record<string, string> = {
        'aspirin': "Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and lower fever. It's commonly used to treat headaches, muscle pain, and arthritis. Side effects may include stomach upset, heartburn, and increased risk of bleeding.",
        'lisinopril': "Lisinopril is an ACE inhibitor used to treat high blood pressure and heart failure. It works by relaxing blood vessels. Side effects may include dry cough, dizziness, and in rare cases, angioedema.",
        'metformin': "Metformin is the first-line medication for the treatment of type 2 diabetes. It works by decreasing glucose production in the liver and increasing insulin sensitivity. Common side effects include gastrointestinal issues like nausea and diarrhea.",
        'atorvastatin': "Atorvastatin (Lipitor) is a statin used to lower cholesterol levels and reduce the risk of heart disease. Side effects may include muscle pain, liver problems, and slightly increased risk of diabetes.",
        'amoxicillin': "Amoxicillin is a penicillin antibiotic used to treat bacterial infections. It works by stopping the growth of bacteria. Side effects may include diarrhea, rash, and nausea. Allergic reactions can occur in some people.",
      };
      
      let botResponse = '';
      const query = userMessage.content.toLowerCase();
      
      // Check for specific medications in the query
      Object.keys(mockResponses).forEach(med => {
        if (query.includes(med)) {
          botResponse = mockResponses[med];
        }
      });
      
      // If no specific medication was found
      if (!botResponse) {
        if (query.includes('side effect')) {
          botResponse = "Many medications can have side effects. Common ones include nausea, dizziness, headache, and fatigue. It's important to discuss any side effects with your healthcare provider.";
        } else if (query.includes('interaction')) {
          botResponse = "Drug interactions can occur when two or more medications affect each other's activity. Always inform your doctor about all medications you're taking, including over-the-counter drugs and supplements.";
        } else {
          botResponse = "I can provide information about common medications like aspirin, lisinopril, metformin, atorvastatin, and amoxicillin. Please specify which medication you'd like to learn about.";
        }
      }
      
      const botMsg: Message = {
        role: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-full p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="Open medication chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 shadow-xl">
      <div 
        className="flex flex-col h-[400px] md:h-[500px] w-[320px] md:w-[380px] rounded-lg overflow-hidden"
        style={{ 
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
      >
        <div 
          ref={dragRef}
          className="bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-t-lg flex items-center justify-between cursor-move"
        >
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-white" />
            <h3 className="font-medium text-white">MediBot</h3>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={toggleChat} 
              className="text-white/80 hover:text-white transition-colors p-1 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-background to-background/90 border-x border-border">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`flex gap-2 max-w-[80%] ${
                    msg.role === 'user' 
                      ? 'bg-primary/10 rounded-l-lg rounded-br-lg' 
                      : 'bg-primary/5 rounded-r-lg rounded-bl-lg'
                  } p-3`}
                >
                  <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-medium text-xs text-muted-foreground">
                      {msg.role === 'user' ? 'You' : 'MediBot'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <p className="text-sm mt-1">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-primary/5 rounded-lg p-3 max-w-[80%]">
                  <div className="flex space-x-1 items-center">
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <form onSubmit={handleSend} className="p-2 border border-t-0 rounded-b-lg flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask about any medication..." 
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
