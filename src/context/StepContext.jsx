import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const StepContext = createContext();

export const StepContextProvider = ({ children }) => {
  const [steps, setSteps] = useState(1);

  const nextStep = () => {
    if (steps > 0) setSteps((prevStep) => prevStep + 1);
    console.log(steps);
  };

  const prevStep = () => {
    if (steps < 3) setSteps((prevStep) => prevStep - 1);
  };

  return (
    <StepContext.Provider value={{ steps, nextStep, prevStep }}>
      {children}
    </StepContext.Provider>
  );
};

StepContextProvider.propTypes = {
  children: PropTypes.object,
};
