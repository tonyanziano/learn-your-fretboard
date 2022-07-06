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

let metronomeClick: HTMLAudioElement | undefined;

/** Returns the current note and plays metronome audio */
export const useCurrentNote = () => {
  // grab settings from Redux (audio settings, mode settings, what notes, etc.)
  const bpm = useSelector(selectBPM);
  const metronomeVolume = useSelector(selectMetronomeVolume);
  const metronomeIsMuted = useSelector(selectMetronomeIsMuted);
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
      // TODO: hook up to audio settings to change volume / mute
      metronomeClick.muted = metronomeIsMuted;
      metronomeClick.volume = metronomeVolume;
      metronomeClick.play();
    }
  }, [metronomeClick, metronomeIsMuted, metronomeVolume, setCurrentNote]);

  // change the current note and play noise depending on settings
  useEffect(() => {
    if (currentInterval.current) {
      clearInterval(currentInterval.current);
    }
    // TODO: might need to look into the metronome volume settings delaying the next
    // iteration of the interval -- it makes the next tick of the note take a full tick
    currentInterval.current = setInterval(getAndPlayNote, bpmInMs);
  }, [
    bpmInMs,
    currentInterval.current,
    getAndPlayNote,
    metronomeIsMuted,
    metronomeVolume,
  ]);

  return currentNote;
};
