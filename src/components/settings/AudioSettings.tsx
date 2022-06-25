import React, { useCallback, useState } from 'react';

const muteToggleId = 'audio-settings-mute-toggle';
const volumeSliderId = 'audio-settings-volume-slider';

export const AudioSettings: React.FC<{}> = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);

  const onToggleMute = useCallback(() => {
    setIsMuted(muted => !muted);
  }, []);

  const onChangeVolume = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(ev => {
    setVolume(parseInt(ev.target.value));
  }, []);

  return (
    <>
      <label htmlFor={muteToggleId}>
        Mute metronome
        <input
          id={muteToggleId}
          checked={isMuted}
          onChange={onToggleMute}
          type={'checkbox'}
        />
      </label>
      <label htmlFor={volumeSliderId}>
        Metronome volume
        <input
          id={volumeSliderId}
          type="range"
          min={0}
          max={100}
          onChange={onChangeVolume}
          value={volume}
        />
      </label>
    </>
  );
};
