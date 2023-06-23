import React, { useCallback } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { TabInfo } from './TabBar';
import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../state/slices/tab';

const tabStyle = css({
  height: 48,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
});

type TabProps = {
  tab: TabInfo;
};

export const Tab: React.FC<TabProps> = props => {
  const { key, text } = props.tab;
  const dispatch = useDispatch();

  const onClickTab = useCallback(() => {
    dispatch(setCurrentTab(key));
  }, [key]);

  return (
    <a css={tabStyle} href={`#${key}`} onClick={onClickTab}>
      {text}
    </a>
  );
};
