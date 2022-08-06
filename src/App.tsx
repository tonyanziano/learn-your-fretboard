import React from 'react';
import { CurrentNote } from './components/CurrentNote';
import { FretboardDiagram } from './components/fretboardDiagram/FretboardDiagram';
import { Settings } from './components/settings/Settings';

export const App: React.FC = () => {
  return (
    <>
      <Settings />
      <CurrentNote />
      <FretboardDiagram />
    </>
  );
};
