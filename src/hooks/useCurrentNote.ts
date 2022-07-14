import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AccidentalNotes, NaturalNotes } from '../constants';
import { selectBPM } from '../state/selectors/bpm';
import {
  selectMetronomeIsMuted,
  selectMetronomeVolume,
} from '../state/selectors/metronome';

const rangeOfNaturalNotes = NaturalNotes.length - 1;
const rangeOfAccidentalNotes = AccidentalNotes.length - 1;

/** Returns the current note and plays metronome audio */
export const useCurrentNote = () => {
  const metronomeClick = useRef(new Audio('./media/metronome-click.wav'));
  const bpm = useSelector(selectBPM);
  const metronomeVolume = useSelector(selectMetronomeVolume);
  const metronomeIsMuted = useSelector(selectMetronomeIsMuted);
  const currentInterval = useRef<NodeJS.Timer | undefined>();
  const [currentNote, setCurrentNote] = useState('');

  const bpmInMs = useMemo(() => {
    return (60 / bpm) * 1000;
  }, [bpm]);

  const getAndPlayNote = useCallback(() => {
    // for now we will just return the natural notes
    const noteIndex = Math.round(Math.random() * rangeOfNaturalNotes);
    setCurrentNote(NaturalNotes[noteIndex]);

    // play the metronome click
    if (metronomeClick.current.HAVE_ENOUGH_DATA) {
      metronomeClick.current.play();
    }
  }, [metronomeClick, setCurrentNote]);

  // adjust the audio of the metronome click according to the settings
  useEffect(() => {
    metronomeClick.current.muted = metronomeIsMuted;
    metronomeClick.current.volume = metronomeVolume;
  }, [metronomeIsMuted, metronomeVolume]);

  // change the current note and play noise depending on settings
  useEffect(() => {
    if (currentInterval.current) {
      clearInterval(currentInterval.current);
    }
    // TODO: might need to look into the metronome volume settings delaying the next
    // iteration of the interval -- it makes the next tick of the note take a full tick
    currentInterval.current = setInterval(getAndPlayNote, bpmInMs);
  }, [bpmInMs, currentInterval.current, getAndPlayNote]);

  return currentNote;
};
