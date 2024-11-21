import React from 'react';
import { AlgorithmType } from '../types';
import { GitGraph, Calculator } from 'lucide-react';

interface Props {
  selectedAlgorithm: AlgorithmType | null;
  onSelect: (algorithm: AlgorithmType) => void;
}

const AlgorithmSelector: React.FC<Props> = ({ selectedAlgorithm, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      <button
        onClick={() => onSelect('closest-pair')}
        className={`p-6 rounded-lg border-2 transition-all ${
          selectedAlgorithm === 'closest-pair'
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <GitGraph className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Closest Pair Algorithm</h3>
        </div>
        <p className="text-gray-600 text-sm">
          Divide-and-conquer approach to find the closest pair of points in a plane
        </p>
      </button>

      <button
        onClick={() => onSelect('karatsuba')}
        className={`p-6 rounded-lg border-2 transition-all ${
          selectedAlgorithm === 'karatsuba'
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <Calculator className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold">Integer Multiplication</h3>
        </div>
        <p className="text-gray-600 text-sm">
          Karatsuba's divide-and-conquer approach for efficient integer multiplication
        </p>
      </button>
    </div>
  );
};

export default AlgorithmSelector;