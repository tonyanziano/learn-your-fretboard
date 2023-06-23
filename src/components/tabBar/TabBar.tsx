import React from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { Tab } from '../../state/slices/tab';
import { Tab as TabComponent } from './Tab';

const tabBarStyle = css({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  height: 48,
});

export type TabInfo = {
  key: Tab;
  text: string;
};

const tabs: TabInfo[] = [
  { key: 'play-along', text: 'Play Along' },
  { key: 'quiz', text: 'Fretboard Quiz' },
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
