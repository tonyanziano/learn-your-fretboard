import React from 'react';
import { CurrentNote } from './components/CurrentNote';
import { Footer } from './components/Footer';
import { FretboardDiagram } from './components/fretboardDiagram/FretboardDiagram';
import { Settings } from './components/settings/Settings';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';

const diagramContainerStyle = css({
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '24px 96px 360px 96px',
});

export const App: React.FC = () => {
  return (
    <>
      <Settings />
      <CurrentNote />
      <div css={diagramContainerStyle}>
        <FretboardDiagram />
      </div>
      <Footer />
    </>
  );
};
