import React, { useMemo } from 'react';
import { CurrentNote } from './components/CurrentNote';
import { Footer } from './components/Footer';
import { FretboardDiagram } from './components/fretboardDiagram/FretboardDiagram';
import { Settings } from './components/settings/Settings';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { FretboardQuiz } from './components/quiz/FretboardQuiz';
import { useSelector } from 'react-redux';
import { selectCurrentTab } from './state/selectors/tab';
import { TabBar } from './components/tabBar/TabBar';

const diagramContainerStyle = css({
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '24px 96px 360px 96px',
});

export const App: React.FC = () => {
  const currentTab = useSelector(selectCurrentTab);

  const content = useMemo(() => {
    return currentTab === 'play-along' ? (
      <>
        <Settings />
        <CurrentNote />
        <div css={diagramContainerStyle}>
          <FretboardDiagram />
        </div>
      </>
    ) : (
      <FretboardQuiz />
    );
  }, [currentTab]);

  return (
    <>
      <TabBar />
      {content}
      <Footer />
    </>
  );
};
