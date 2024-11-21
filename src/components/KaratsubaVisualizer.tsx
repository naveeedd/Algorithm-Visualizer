import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KaratsubaStep } from './KaratsubaStep';

interface Props {
  numbers: number[];
}

const KaratsubaVisualizer: React.FC<Props> = ({ numbers }) => {
  const [currentPair, setCurrentPair] = useState(0);
  const totalPairs = Math.floor(numbers.length / 2);

  const finalResult = useMemo(() => {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result *= numbers[i];
    }
    return result;
  }, [numbers]);

  const handlePrevPair = () => {
    setCurrentPair(prev => Math.max(0, prev - 1));
  };

  const handleNextPair = () => {
    setCurrentPair(prev => Math.min(totalPairs - 1, prev + 1));
  };

  const num1 = numbers[currentPair * 2];
  const num2 = numbers[currentPair * 2 + 1];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 rounded-xl shadow-lg mb-8">
        <h3 className="text-2xl font-bold mb-2">Final Result</h3>
        <p className="text-sm opacity-90 mb-4">Multiplication of all {numbers.length} numbers</p>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="font-mono text-3xl break-all">{finalResult.toLocaleString()}</p>
        </div>
        <div className="mt-4 text-sm">
          <p className="opacity-75">Input numbers: {numbers.join(' × ')}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevPair}
          disabled={currentPair === 0}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <p className="text-sm text-gray-600">Step {currentPair + 1} of {totalPairs}</p>
        </div>
        <button
          onClick={handleNextPair}
          disabled={currentPair === totalPairs - 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <KaratsubaStep
        num1={num1}
        num2={num2}
        step={currentPair + 1}
        totalSteps={totalPairs}
      />
    </div>
  );
};

export default KaratsubaVisualizer;