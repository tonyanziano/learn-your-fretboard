/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaxBPM, MinBPM } from '../../../constants';
import { selectBPM } from '../../../state/selectors/bpm';
import { setBPM } from '../../../state/slices/bpm';

const bpmSliderStyle = css({
  margin: '8px 0',
  maxWidth: 200,
  cursor: 'pointer',
  flexGrow: 2,
});

const sliderContainerStyle = css({
  display: 'flex',
  flexFlow: 'row nowrap',
});

const sliderValueStyle = css({
  marginLeft: 8,
  lineHeight: '32px',
});

const bpmSliderId = 'bpm-slider-input';

export const BPMSlider: React.FC = () => {
  const currentBPM = useSelector(selectBPM);
  const dispatch = useDispatch();

  const onChangeBPM = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ev => {
      dispatch(setBPM(parseInt(ev.target.value)));
    },
    []
  );

  return (
    <>
      <label htmlFor={bpmSliderId}>BPM:</label>
      <span css={sliderContainerStyle}>
        <input
          css={bpmSliderStyle}
          id={bpmSliderId}
          max={MaxBPM}
          min={MinBPM}
          onChange={onChangeBPM}
          type={'range'}
          value={currentBPM}
        />
        <span css={sliderValueStyle}>{currentBPM}</span>
      </span>
    </>
  );
};
