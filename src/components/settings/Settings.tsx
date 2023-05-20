import React, { useCallback } from 'react';
import { BPMSlider } from './BPMSlider';
import { AudioSettings } from './AudioSettings';
/** @jsx jsx **/
import { css } from '@emotion/react';
import { NoteSettings } from './NoteSettings';
import { useDispatch, useSelector } from 'react-redux';
import { selectSettingsExpanded } from '../../state/selectors/settings';
import { toggleSettingsExpanded } from '../../state/slices/settings';

const style = css({
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '0',
  border: '1px solid gray',
});

const headerStyle = css({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  padding: '12px 24px',
  borderBottom: '1px solid gray',
});

const headerTextStyle = css({
  margin: 0,
});

const expandButton = css({
  marginLeft: 48,
});

const contentStyle = css({
  padding: '12px 24px',
});

export const Settings: React.FC = () => {
  // TODO: Save settings in local storage so that they persist between sessions
  const expanded = useSelector(selectSettingsExpanded);
  const dispatch = useDispatch();

  const onExpandButtonClick = useCallback(() => {
    dispatch(toggleSettingsExpanded());
  }, []);

  return (
    <section css={style}>
      <div css={headerStyle}>
        <h2 css={headerTextStyle}>Settings</h2>
        <button
          css={expandButton}
          onClick={onExpandButtonClick}
          type={'button'}
        >
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>
      {expanded ? (
        <div css={contentStyle}>
          <NoteSettings />
          <AudioSettings />
          <BPMSlider />
        </div>
      ) : null}
    </section>
  );
};
