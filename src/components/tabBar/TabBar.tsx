import React from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { Tab } from '../../state/slices/tab';
import { Tab as TabComponent } from './Tab';

const tabBarStyle = css({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifySelf: 'flex-start',
  height: 48,
  width: '100%',
  backgroundColor: '#282626',
  borderBottom: '1px solid #ccc',
});

export type TabInfo = {
  key: Tab;
  text: string;
};

const tabs: TabInfo[] = [
  { key: 'quiz', text: 'Fretboard Quiz' },
  { key: 'play-along', text: 'Play Along' },
];

export const TabBar: React.FC = () => {
  return (
    <nav css={tabBarStyle}>
      {tabs.map(t => (
        <TabComponent key={t.key} tab={t} />
      ))}
    </nav>
  );
};
