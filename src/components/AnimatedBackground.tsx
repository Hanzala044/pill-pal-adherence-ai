import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-teal-400/20 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-teal-900/30" />
      
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" className="text-primary" />
              <path d="M20 1 L20 39 M1 20 L39 20" strokeWidth="0.5" stroke="currentColor" className="text-primary/50" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#neural)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute rounded-full
              bg-primary/10 dark:bg-primary/5
              animate-float-slow
              ${getRandomPosition(i)}
              ${getRandomSize()}
            `}
            style={{
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 5}s`
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
    </div>
  );
};

const getRandomPosition = (index: number) => {
  const positions = [
    'top-1/4 left-1/4',
    'top-3/4 right-1/4',
    'top-1/2 left-1/3',
    'bottom-1/4 right-1/3',
    'bottom-1/2 left-1/4',
    'top-1/3 right-1/2'
  ];
  return positions[index] || positions[0];
};

const getRandomSize = () => {
  const sizes = [
    'w-32 h-32',
    'w-48 h-48',
    'w-40 h-40',
    'w-56 h-56',
    'w-64 h-64',
    'w-72 h-72'
  ];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

export default AnimatedBackground;
