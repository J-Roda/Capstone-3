import { StepContext } from '../context/StepContext';
import { useContext } from 'react';

export const useStepContext = () => {
  const context = useContext(StepContext);

  if (!context) {
    throw Error('useStepContext must be used inside a useStepContext');
  }

  return context;
};
