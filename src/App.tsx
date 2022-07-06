import React from 'react';
import { CurrentNote } from './components/CurrentNote';
import { Settings } from './components/settings/Settings';

export const App: React.FC = () => {
  return (
    <>
      <Settings />
      <CurrentNote />
    </>
  );
};
