
import React, { useEffect, useState } from 'react';
import { TestTube, Beaker } from 'lucide-react';

const SplashScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        onFinished();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-[#1a1a1a] to-[#2d1f3d] transition-opacity duration-500 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <TestTube className="w-20 h-20 text-[#8B5CF6] rotate-12" strokeWidth={2.5} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Beaker 
              className="w-12 h-12 text-[#D946EF] opacity-90 animate-[pulse_2s_ease-in-out_infinite]" 
              style={{
                filter: 'drop-shadow(0 0 10px #8B5CF6) drop-shadow(0 0 20px #D946EF)',
                animation: 'float-slow 3s ease-in-out infinite'
              }} 
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-[#8B5CF6]/20 via-[#D946EF]/20 to-[#8B5CF6]/20 blur-xl -z-10" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#8B5CF6] bg-clip-text text-transparent font-space tracking-wider">
          PillPal
        </h1>
        <p className="text-white/70 mt-2">Your Medication Assistant</p>
      </div>
    </div>
  );
};

export default SplashScreen;
