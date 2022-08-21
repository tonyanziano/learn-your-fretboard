import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AccidentalNotes, NaturalNotes } from '../constants';
import { selectBPM } from '../state/selectors/bpm';
import {
  selectMetronomeIsMuted,
  selectMetronomeVolume,
} from '../state/selectors/metronome';
import { selectIncludedNotes } from '../state/selectors/settings';
import { IncludedNotes } from '../state/slices/settings';

/** Returns the current note and plays metronome audio */
export const useCurrentNote = () => {
  const metronomeClick = useRef(new Audio('./media/metronome-click.wav'));
  const bpm = useSelector(selectBPM);
  const metronomeVolume = useSelector(selectMetronomeVolume);
  const metronomeIsMuted = useSelector(selectMetronomeIsMuted);
  const includedNotes = useSelector(selectIncludedNotes);
  const currentInterval = useRef<NodeJS.Timer | undefined>();
  const availableNotes = useRef<string[]>([]);
  const [currentNote, setCurrentNote] = useState('');

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
    const noteIndex = Math.round(
      Math.random() * (availableNotes.current.length - 1)
    );
    setCurrentNote(availableNotes.current[noteIndex]);

    // play the metronome click
    if (metronomeClick.current.HAVE_ENOUGH_DATA) {
      metronomeClick.current.play();
    }
  }, [metronomeClick, setCurrentNote, availableNotes]);

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
    currentInterval.current = setInterval(getAndPlayNote, bpmInMs);
  }, [bpmInMs, currentInterval.current, getAndPlayNote]);

  return currentNote;
};
