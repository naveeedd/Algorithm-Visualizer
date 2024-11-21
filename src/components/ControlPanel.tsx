import React from 'react';
import { Play, Pause, RotateCcw, StepForward } from 'lucide-react';
import classNames from 'classnames';

interface Props {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNextStep: () => void;
  canProgress: boolean;
}

const ControlPanel: React.FC<Props> = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onNextStep,
  canProgress,
}) => {
  const buttonClass = "p-2 rounded-lg transition-colors flex items-center gap-2";
  
  return (
    <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-lg shadow-md">
      {isPlaying ? (
        <button
          onClick={onPause}
          className={classNames(buttonClass, "bg-yellow-100 text-yellow-700 hover:bg-yellow-200")}
        >
          <Pause size={20} />
          <span>Pause</span>
        </button>
      ) : (
        <button
          onClick={onPlay}
          className={classNames(buttonClass, "bg-green-100 text-green-700 hover:bg-green-200")}
          disabled={!canProgress}
        >
          <Play size={20} />
          <span>Play</span>
        </button>
      )}
      
      <button
        onClick={onNextStep}
        className={classNames(buttonClass, "bg-blue-100 text-blue-700 hover:bg-blue-200")}
        disabled={!canProgress}
      >
        <StepForward size={20} />
        <span>Next Step</span>
      </button>
      
      <button
        onClick={onReset}
        className={classNames(buttonClass, "bg-red-100 text-red-700 hover:bg-red-200")}
      >
        <RotateCcw size={20} />
        <span>Reset</span>
      </button>
    </div>
  );
};

export default ControlPanel;