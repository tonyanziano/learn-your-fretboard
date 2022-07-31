import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAccidentalNotesEnabled,
  selectNaturalNotesEnabled,
} from '../../state/selectors/settings';
import {
  toggleAccidentalNotes,
  toggleNaturalNotes,
} from '../../state/slices/settings';

const naturalToggleId = 'audio-settings-mute-toggle';
const accidentalToggleId = 'audio-settings-volume-slider';

export const NoteSettings: React.FC = () => {
  const naturalNotesEnabled = useSelector(selectNaturalNotesEnabled);
  const accidentalNotesEnabled = useSelector(selectAccidentalNotesEnabled);
  const dispatch = useDispatch();

  const onToggleNaturalNotesEnabled = useCallback(() => {
    dispatch(toggleNaturalNotes());
  }, []);

  const onToggleAccidentalNotesEnabled = useCallback(() => {
    dispatch(toggleAccidentalNotes());
  }, []);

  return (
    <>
      {/* TODO: change these to a radio group because you shouldn't be able to have 0 available notes */}
      <label htmlFor={naturalToggleId}>
        Natural notes
        <input
          id={naturalToggleId}
          checked={naturalNotesEnabled}
          onChange={onToggleNaturalNotesEnabled}
          type={'checkbox'}
        />
      </label>
      <label htmlFor={accidentalToggleId}>
        Accidental notes
        <input
          id={accidentalToggleId}
          checked={accidentalNotesEnabled}
          onChange={onToggleAccidentalNotesEnabled}
          type={'checkbox'}
        />
      </label>
    </>
  );
};
