import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIncludedNotes } from '../../state/selectors/settings';
import { IncludedNotes, setIncludedNotes } from '../../state/slices/settings';

const allRadioId = 'note-settings-all-radio';
const naturalRadioId = 'note-settings-natural-radio';
const accidentalRadioId = 'note-settings-accidental-radio';

type RadioOption = {
  text: string;
  includedNotes: IncludedNotes;
  id: string;
};

const radioOptions: RadioOption[] = [
  {
    text: 'All notes',
    id: allRadioId,
    includedNotes: IncludedNotes.All,
  },
  {
    text: 'Natural notes',
    id: naturalRadioId,
    includedNotes: IncludedNotes.Natural,
  },
  {
    text: 'Accidental notes',
    id: accidentalRadioId,
    includedNotes: IncludedNotes.Accidental,
  },
];

export const NoteSettings: React.FC = () => {
  const includedNotes = useSelector(selectIncludedNotes);
  const dispatch = useDispatch();

  const onChangeRadioOption = useCallback((selection: IncludedNotes) => {
    dispatch(setIncludedNotes(selection));
  }, []);

  return (
    <fieldset>
      <legend>Included notes</legend>
      {radioOptions.map(option => {
        const onChange = () => onChangeRadioOption(option.includedNotes);

        return (
          <span>
            <label htmlFor={option.id}>{option.text}</label>
            <input
              checked={includedNotes === option.includedNotes}
              id={option.id}
              onChange={onChange}
              type={'radio'}
            />
          </span>
        );
      })}
    </fieldset>
  );
};
