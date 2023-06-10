/** @jsxFrag jsx **/
import { css } from '@emotion/react';
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
import { SettingsGroup } from '../common/SettingsGroup';
import { BPMSlider } from './BPMSlider';

const volumeSliderStyle = css({
  margin: '8px 0',
  maxWidth: 200,
  cursor: 'pointer',
  flexGrow: 2,
});

const volumeSliderContainerStyle = css({
  display: 'flex',
  flexFlow: 'row nowrap',
});

const volumeSliderValueStyle = css({
  marginLeft: 8,
  lineHeight: '32px',
});

const metronomeMuteGroupStyle = css({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
});

const metronomeMuteToggleStyle = css({
  margin: 8,
  marginLeft: 0,
  cursor: 'pointer',
});

const metronomeMuteLabelStyle = css({
  cursor: 'pointer',
  marginRight: 'auto',
});

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
    () => Math.round(metronomeVolume * 100),
    [metronomeVolume]
  );

  return (
    <SettingsGroup label={'Metronome Settings'}>
      <div css={metronomeMuteGroupStyle}>
        <input
          checked={metronomeIsMuted}
          css={metronomeMuteToggleStyle}
          id={muteToggleId}
          onChange={onToggleMute}
          type={'checkbox'}
        />
        <label css={metronomeMuteLabelStyle} htmlFor={muteToggleId}>
          Mute metronome
        </label>
      </div>
      <label htmlFor={volumeSliderId}>Metronome volume</label>
      <span css={volumeSliderContainerStyle}>
        <input
          css={volumeSliderStyle}
          id={volumeSliderId}
          max={100}
          min={0}
          onChange={onChangeVolume}
          type={'range'}
          value={metronomeVolumeScaledUp}
        />
        <span css={volumeSliderValueStyle}>{metronomeVolumeScaledUp}</span>
      </span>
      <BPMSlider />
    </SettingsGroup>
  );
};
