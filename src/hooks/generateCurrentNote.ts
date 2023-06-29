import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccidentalNotes, NaturalNotes } from '../constants';
import { selectBPM } from '../state/selectors/bpm';
import {
  selectMetronomeIsMuted,
  selectMetronomeVolume,
} from '../state/selectors/metronome';
import { selectIncludedNotes } from '../state/selectors/settings';
import { setPlayAlongNote } from '../state/slices/currentNote';
import { IncludedNotes } from '../state/slices/settings';
import { getUniqueNote } from './getUniqueNote';

/** Generates the current note and plays metronome audio */
export const generateCurrentNote = () => {
  const metronomeClick = useRef(new Audio('./media/metronome-click.wav'));
  const bpm = useSelector(selectBPM);
  const metronomeVolume = useSelector(selectMetronomeVolume);
  const metronomeIsMuted = useSelector(selectMetronomeIsMuted);
  const includedNotes = useSelector(selectIncludedNotes);
  const currentInterval = useRef<NodeJS.Timer | undefined>();
  const availableNotes = useRef<string[]>([]);
  const [previouslyGeneratedNote, setPreviouslyGeneratedNote] = useState('');
  const dispatch = useDispatch();

  useMemo(() => {
    switch (includedNotes) {
      case IncludedNotes.Natural:
        availableNotes.current = NaturalNotes;
        return;
      case IncludedNotes.Accidental:
        availableNotes.current = AccidentalNotes;
        return;
      default:
        availableNotes.current = [...NaturalNotes, ...AccidentalNotes];
    }
  }, [includedNotes]);

  const bpmInMs = useMemo(() => {
    return (60 / bpm) * 1000;
  }, [bpm]);

  const getAndPlayNote = useCallback(() => {
    const generatedNote = getUniqueNote(
      availableNotes.current,
      previouslyGeneratedNote
    );

    dispatch(setPlayAlongNote(generatedNote));
    setPreviouslyGeneratedNote(generatedNote);

    // play the metronome click
    if (metronomeClick.current.HAVE_ENOUGH_DATA) {
      metronomeClick.current.play();
    }
  }, [metronomeClick, availableNotes, previouslyGeneratedNote]);

  // adjust the audio of the metronome click according to the settings
  useEffect(() => {
    metronomeClick.current.muted = metronomeIsMuted;
    metronomeClick.current.volume = metronomeVolume;
  }, [metronomeIsMuted, metronomeVolume]);

  // change the current note and play noise depending on settings
  useEffect(() => {
    currentInterval.current = setInterval(getAndPlayNote, bpmInMs);

    return () => clearInterval(currentInterval.current);
  }, [bpmInMs, currentInterval.current, getAndPlayNote]);
};
