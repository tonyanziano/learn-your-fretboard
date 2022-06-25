import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AccidentalNotes, NaturalNotes } from '../constants';
import { selectBPM } from '../state/selectors/bpm';

const rangeOfNaturalNotes = NaturalNotes.length - 1;
const rangeOfAccidentalNotes = AccidentalNotes.length - 1;

let metronomeClick: HTMLAudioElement | undefined;

/** Returns the current note and plays metronome audio */
export const useCurrentNote = () => {
  // grab settings from Redux (audio settings, mode settings, what notes, etc.)
  const bpm = useSelector(selectBPM);
  const currentInterval = useRef<NodeJS.Timer | undefined>();
  const [currentNote, setCurrentNote] = useState('');

  // setup audio
  if (!metronomeClick) {
    metronomeClick = new Audio('./media/metronome-click.wav');
  }

  const bpmInMs = useMemo(() => {
    return (60 / bpm) * 1000;
  }, [bpm]);

  const getAndPlayNote = useCallback(() => {
    // for now we will just return the natural notes
    const noteIndex = Math.round(Math.random() * rangeOfNaturalNotes);
    setCurrentNote(NaturalNotes[noteIndex]);

    // play the metronome click
    if (metronomeClick?.HAVE_ENOUGH_DATA) {
      metronomeClick.play();
    }
  }, [metronomeClick, setCurrentNote]);

  // change the current note and play noise depending on settings
  useEffect(() => {
    if (currentInterval.current) {
      clearInterval(currentInterval.current);
    }
    currentInterval.current = setInterval(getAndPlayNote, bpmInMs);
  }, [bpmInMs, currentInterval.current, getAndPlayNote]);

  return currentNote;
};
