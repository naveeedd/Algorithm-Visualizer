import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Point, AlgorithmStep } from '../types';
import { closestPairAlgorithm } from '../algorithms/closestPair';

interface Props {
  points: Point[];
}

const ClosestPairVisualizer: React.FC<Props> = ({ points }) => {
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) {
      setSteps(closestPairAlgorithm(points));
      setCurrentStep(0);
    }
  }, [started, points]);

  const skipToFinal = () => {
    const finalStep = steps.findIndex(step => step.type === 'result');
    if (finalStep !== -1) {
      setCurrentStep(finalStep);
    }
  };

  const getPlotData = () => {
    const data: any[] = [
      {
        x: points.map(p => p.x),
        y: points.map(p => p.y),
        mode: 'markers',
        type: 'scatter',
        name: 'Points',
        marker: { size: 10, color: 'blue' }
      }
    ];

    if (started && currentStep >= 0 && steps[currentStep]) {
      const step = steps[currentStep];

      if (step.midpoint !== undefined) {
        data.push({
          x: [step.midpoint, step.midpoint],
          y: [Math.min(...points.map(p => p.y)) - 1, Math.max(...points.map(p => p.y)) + 1],
          mode: 'lines',
          name: 'Division Line',
          line: { dash: 'dash', color: 'gray', width: 2 }
        });
      }

      if (step.pair) {
        const color = step.type === 'result' ? 'red' : 'green';
        data.push({
          x: [step.pair[0].x, step.pair[1].x],
          y: [step.pair[0].y, step.pair[1].y],
          mode: 'lines+markers',
          name: step.type === 'result' ? 'Closest Pair' : 'Current Pair',
          line: { color, width: step.type === 'result' ? 3 : 2 },
          marker: { size: 12, color }
        });
      }

      if (step.type === 'divide' && step.stripArea) {
        const { left, right } = step.stripArea;
        data.push({
          x: [left, left, right, right, left],
          y: [Math.min(...points.map(p => p.y)) - 1,
              Math.max(...points.map(p => p.y)) + 1,
              Math.max(...points.map(p => p.y)) + 1,
              Math.min(...points.map(p => p.y)) - 1,
              Math.min(...points.map(p => p.y)) - 1],
          fill: 'toself',
          fillcolor: 'rgba(0, 0, 255, 0.1)',
          line: { color: 'transparent' },
          name: 'Strip Area',
          showlegend: true
        });
      }
    }

    return data;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Plot
          data={getPlotData()}
          layout={{
            width: 800,
            height: 600,
            title: 'Points Plot',
            showlegend: true,
            hovermode: 'closest',
            xaxis: { title: 'X' },
            yaxis: { title: 'Y' }
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg p-6">
        {!started ? (
          <div className="text-center">
            <button
              onClick={() => setStarted(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Start Algorithm
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-lg font-semibold text-center">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="bg-white p-4 rounded-lg text-gray-700 shadow-sm">
              {steps[currentStep]?.message}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                  }
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                disabled={currentStep >= steps.length - 1}
              >
                Next Step
              </button>
              <button
                onClick={skipToFinal}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                disabled={currentStep === steps.findIndex(step => step.type === 'result')}
              >
                Final Output
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClosestPairVisualizer;