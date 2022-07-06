import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMetronomeIsMuted,
  selectMetronomeVolume,
} from '../../state/selectors/metronome';
import {
  setMetronomeVolume,
  toggleMetronomeMute,
} from '../../state/slices/metronome';

const muteToggleId = 'audio-settings-mute-toggle';
const volumeSliderId = 'audio-settings-volume-slider';

export const AudioSettings: React.FC = () => {
  const metronomeIsMuted = useSelector(selectMetronomeIsMuted);
  const metronomeVolume = useSelector(selectMetronomeVolume);
  const dispatch = useDispatch();

  const onToggleMute = useCallback(() => {
    dispatch(toggleMetronomeMute());
  }, []);

  const onChangeVolume = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(ev => {
    // scale metronome volume from [0 - 100] to [0 - 1]
    dispatch(setMetronomeVolume(parseInt(ev.target.value) / 100));
  }, []);

  // scale metronome volume from [0 - 1] to [0 - 100]
  const metronomeVolumeScaledUp = useMemo(
    () => metronomeVolume * 100,
    [metronomeVolume]
  );

  return (
    <>
      <label htmlFor={muteToggleId}>
        Mute metronome
        <input
          id={muteToggleId}
          checked={metronomeIsMuted}
          onChange={onToggleMute}
          type={'checkbox'}
        />
      </label>
      <label htmlFor={volumeSliderId}>
        Metronome volume
        <input
          id={volumeSliderId}
          type={'range'}
          min={0}
          max={100}
          onChange={onChangeVolume}
          value={metronomeVolumeScaledUp}
        />
      </label>
    </>
  );
};
