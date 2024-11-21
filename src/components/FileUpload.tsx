import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { AlgorithmType } from '../types';

interface Props {
  algorithm: AlgorithmType;
  onFileUpload: (content: string) => void;
}

const FileUpload: React.FC<Props> = ({ algorithm, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content);
    };
    reader.readAsText(file);
  };

  const formatExample = algorithm === 'closest-pair' 
    ? '2 3\n4 5\n6 7\n8 9'
    : '987654\n123456\n789123\n456789';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".txt"
          className="hidden"
        />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Upload Input File</h3>
        <p className="text-gray-600 mb-4">
          Upload a text file with the required format
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Choose File
        </button>
        <div className="mt-6 text-left">
          <h4 className="text-sm font-semibold mb-2">Expected Format:</h4>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            {formatExample}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;