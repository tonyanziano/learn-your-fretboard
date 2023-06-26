import React, { useCallback } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { TabInfo } from './TabBar';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTab } from '../../state/slices/tab';
import { selectCurrentTab } from '../../state/selectors/tab';

const getTabStyle = (active: boolean) =>
  css({
    backgroundColor: active ? '#2e2d2d' : '#3f3d3d',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px 0 12px',
    height: '100%',
    border: '1px solid #ccc',
    borderBottom: active ? 'none' : '1px solid #ccc',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginRight: 4,

    '& > a': {
      textDecoration: 'none',
    },
  });

type TabProps = {
  tab: TabInfo;
};

export const Tab: React.FC<TabProps> = props => {
  const { key, text } = props.tab;
  const currentTab = useSelector(selectCurrentTab);
  const dispatch = useDispatch();

  const onClickTab = useCallback(() => {
    dispatch(setCurrentTab(key));
  }, [key]);

  const active = currentTab === key;

  return (
    <span css={getTabStyle(active)}>
      <a href={`#${key}`} onClick={onClickTab}>
        {text}
      </a>
    </span>
  );
};
