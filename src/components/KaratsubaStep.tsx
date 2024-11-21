import React, { useState, useEffect } from 'react';
import { MultiplicationTree } from './MultiplicationTree';

interface KaratsubaStepProps {
  num1: number;
  num2: number;
  step: number;
  totalSteps: number;
}

export const KaratsubaStep: React.FC<KaratsubaStepProps> = ({ num1, num2, step, totalSteps }) => {
  const [showTrees, setShowTrees] = useState(false);
  const result = calculateKaratsuba(num1, num2);

  // Reset animation when numbers change
  useEffect(() => {
    setShowTrees(false);
    const timer = setTimeout(() => setShowTrees(true), 100);
    return () => clearTimeout(timer);
  }, [num1, num2]);

  return (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">
          Step {step} of {totalSteps}
        </h3>
        <p className="text-gray-600 mb-4">
          Multiplying {num1} × {num2}
        </p>
        <p className="text-2xl font-bold text-blue-600">
          Result: {result}
        </p>
      </div>

      {showTrees && (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-center">First Number Breakdown</h4>
            <div className="flex justify-center">
              <MultiplicationTree number={num1} baseDelay={0} />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-center">Second Number Breakdown</h4>
            <div className="flex justify-center">
              <MultiplicationTree number={num2} baseDelay={500} />
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">Karatsuba Calculation Steps</h4>
        <div className="space-y-2">
          {getKaratsubaSteps(num1, num2).map((step, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 transition-all duration-500"
              style={{
                opacity: showTrees ? 1 : 0,
                transform: `translateY(${showTrees ? 0 : '10px'})`,
                transitionDelay: `${1500 + index * 150}ms`
              }}
            >
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm">
                {index + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function calculateKaratsuba(x: number, y: number): number {
  // Base case for small numbers
  if (x < 10 || y < 10) {
    return x * y;
  }

  const n1 = x.toString();
  const n2 = y.toString();
  const m = Math.max(n1.length, n2.length);
  const m2 = Math.ceil(m / 2);

  // Split the numbers
  const high1 = parseInt(n1.slice(0, -m2) || '0');
  const low1 = parseInt(n1.slice(-m2));
  const high2 = parseInt(n2.slice(0, -m2) || '0');
  const low2 = parseInt(n2.slice(-m2));

  // Recursive steps
  const z0 = calculateKaratsuba(low1, low2);
  const z1 = calculateKaratsuba((high1 + low1), (high2 + low2));
  const z2 = calculateKaratsuba(high1, high2);

  // Combine the results
  return (z2 * Math.pow(10, 2 * m2)) + 
         ((z1 - z2 - z0) * Math.pow(10, m2)) + 
         z0;
}

function getKaratsubaSteps(num1: number, num2: number): string[] {
  const n1 = num1.toString();
  const n2 = num2.toString();
  const m = Math.max(n1.length, n2.length);
  const m2 = Math.ceil(m / 2);

  const high1 = parseInt(n1.slice(0, -m2) || '0');
  const low1 = parseInt(n1.slice(-m2));
  const high2 = parseInt(n2.slice(0, -m2) || '0');
  const low2 = parseInt(n2.slice(-m2));

  const z2 = high1 * high2;
  const z0 = low1 * low2;
  const z1 = (high1 + low1) * (high2 + low2);

  return [
    `Split ${num1} into ${high1} and ${low1}`,
    `Split ${num2} into ${high2} and ${low2}`,
    `Calculate z₂ = ${high1} × ${high2} = ${z2}`,
    `Calculate z₀ = ${low1} × ${low2} = ${z0}`,
    `Calculate z₁ = (${high1} + ${low1}) × (${high2} + ${low2}) = ${z1}`,
    `Final result = (z₂ × 10^${2 * m2}) + ((z₁ - z₂ - z₀) × 10^${m2}) + z₀`,
    `= (${z2} × 10^${2 * m2}) + ((${z1} - ${z2} - ${z0}) × 10^${m2}) + ${z0}`
  ];
}