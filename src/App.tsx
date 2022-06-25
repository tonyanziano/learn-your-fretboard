import React from 'react';
import { BPMSlider } from './components/BPMSlider';
import { CurrentNote } from './components/CurrentNote';

export const App: React.FC<{}> = () => {
  return (
    <>
      <CurrentNote />
      <BPMSlider />
    </>
  );
};
