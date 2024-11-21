import React from 'react';
import { AlgorithmType, Point, InputData } from '../types';
import ClosestPairVisualizer from './ClosestPairVisualizer';
import KaratsubaVisualizer from './KaratsubaVisualizer';
import { Upload } from 'lucide-react';

interface Props {
  algorithm: AlgorithmType;
  fileContent: string;
}

const Visualizer: React.FC<Props> = ({ algorithm, fileContent }) => {
  const parseInput = (): InputData => {
    const lines = fileContent.trim().split('\n');
    
    if (algorithm === 'closest-pair') {
      return lines.map(line => {
        const [x, y] = line.trim().split(/\s+/).map(Number);
        return { x, y };
      });
    } else {
      return lines.map(line => parseInt(line.trim()));
    }
  };

  const input = parseInput();

  const handleNewUpload = () => {
    window.location.reload();
  };

  const renderVisualizer = () => {
    if (algorithm === 'closest-pair') {
      return <ClosestPairVisualizer points={input as Point[]} />;
    }
    return <KaratsubaVisualizer numbers={input as number[]} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {algorithm === 'closest-pair' ? 'Closest Pair Algorithm' : 'Karatsuba Integer Multiplication'}
            </h2>
            <button
              onClick={handleNewUpload}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Upload size={20} />
              Upload New File
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {renderVisualizer()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;