import React, { useState, useEffect } from 'react';

interface TreeNodeProps {
  value: string;
  children?: React.ReactNode;
  type?: 'root' | 'split' | 'result';
  delay: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ value, children, type = 'split', delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getBorderColor = () => {
    switch (type) {
      case 'root': return 'border-blue-500';
      case 'result': return 'border-green-500';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`bg-white border-2 ${getBorderColor()} rounded-lg p-3 shadow-md relative z-10 transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <p className="text-lg font-medium">{value}</p>
      </div>
      {children && (
        <div className={`mt-8 relative transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Animated lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-0.5 bg-gray-300 origin-top" 
               style={{ transform: `scaleY(${isVisible ? 1 : 0})`, transition: 'transform 500ms' }} />
          <div className="absolute top-8 left-1/4 right-1/4 h-0.5 bg-gray-300 origin-left"
               style={{ transform: `scaleX(${isVisible ? 1 : 0})`, transition: 'transform 500ms' }} />
          <div className="absolute top-0 left-1/4 h-8 w-8 border-l-2 border-b-2 border-gray-300 rounded-bl-lg"
               style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 500ms' }} />
          <div className="absolute top-0 right-1/4 h-8 w-8 border-r-2 border-b-2 border-gray-300 rounded-br-lg"
               style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 500ms' }} />
          <div className="flex gap-16">{children}</div>
        </div>
      )}
    </div>
  );
};

interface MultiplicationTreeProps {
  number: number;
  depth?: number;
  baseDelay?: number;
}

export const MultiplicationTree: React.FC<MultiplicationTreeProps> = ({ 
  number, 
  depth = 0,
  baseDelay = 0 
}) => {
  const nodeDelay = baseDelay + depth * 300; // Stagger delay based on depth

  if (number < 10 || depth > 2) {
    return <TreeNode value={number.toString()} type="result" delay={nodeDelay} />;
  }

  const numStr = number.toString();
  const mid = Math.ceil(numStr.length / 2);
  const left = parseInt(numStr.slice(0, mid));
  const right = parseInt(numStr.slice(mid));

  return (
    <TreeNode 
      value={number.toString()} 
      type={depth === 0 ? 'root' : 'split'} 
      delay={nodeDelay}
    >
      <MultiplicationTree 
        number={left} 
        depth={depth + 1} 
        baseDelay={nodeDelay} 
      />
      <MultiplicationTree 
        number={right} 
        depth={depth + 1} 
        baseDelay={nodeDelay} 
      />
    </TreeNode>
  );
};