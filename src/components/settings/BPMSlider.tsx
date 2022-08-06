import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaxBPM, MinBPM } from '../../constants';
import { selectBPM } from '../../state/selectors/bpm';
import { setBPM } from '../../state/slices/bpm';

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
    <label htmlFor={bpmSliderId}>
      BPM:
      <input
        id={bpmSliderId}
        max={MaxBPM}
        min={MinBPM}
        onChange={onChangeBPM}
        type={'range'}
        value={currentBPM}
      />
    </label>
  );
};
