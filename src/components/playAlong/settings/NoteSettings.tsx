import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIncludedNotes } from '../../../state/selectors/settings';
import {
  IncludedNotes,
  setIncludedNotes,
} from '../../../state/slices/settings';

/** @jsx jsx **/
import { css } from '@emotion/react';
import { SettingsGroup } from '../../common/SettingsGroup';

const radioOptionStyle = css({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'flex-start',
  marginTop: 8,

  input: {
    cursor: 'pointer',
  },
  label: {
    cursor: 'pointer',
  },
});

const radioButtonStyle = css({
  marginRight: 8,
});

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
    <SettingsGroup label={'Included notes'}>
      {radioOptions.map(option => {
        const onChange = () => onChangeRadioOption(option.includedNotes);

        return (
          <span css={radioOptionStyle} key={option.id}>
            <input
              checked={includedNotes === option.includedNotes}
              css={radioButtonStyle}
              id={option.id}
              onChange={onChange}
              type={'radio'}
            />
            <label htmlFor={option.id}>{option.text}</label>
          </span>
        );
      })}
    </SettingsGroup>
  );
};
