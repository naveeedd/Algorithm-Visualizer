import React, { useState } from 'react';
import Header from './components/Header';
import AlgorithmSelector from './components/AlgorithmSelector';
import FileUpload from './components/FileUpload';
import Visualizer from './components/Visualizer';
import { AlgorithmType } from './types';
import { ArrowRight } from 'lucide-react';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isVisualizing, setIsVisualizing] = useState(false);

  const handleFileUpload = (content: string) => {
    setFileContent(content);
  };

  const handleProceed = () => {
    setIsVisualizing(true);
  };

  if (isVisualizing && selectedAlgorithm && fileContent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Visualizer 
          algorithm={selectedAlgorithm}
          fileContent={fileContent}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Select Algorithm</h2>
          <AlgorithmSelector
            selectedAlgorithm={selectedAlgorithm}
            onSelect={setSelectedAlgorithm}
          />
        </section>

        {selectedAlgorithm && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">Upload Input</h2>
            <FileUpload
              algorithm={selectedAlgorithm}
              onFileUpload={handleFileUpload}
            />
            
            {fileContent && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleProceed}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                >
                  Proceed to Visualization
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </section>

        )}
      </main>
    </div>
  );
}

export default App;