import React, { useEffect, useState } from 'react';
import { NaturalNotes } from '../constants';

const bpm = 40;
const bpmInMs = (60 / bpm) * 1000;

/**
 * Displays the current note that should be played by the user
 */
export const CurrentNote: React.FC<{}> = () => {
  const [currentNote, setCurrentNote] = useState(0);

  // this is just to simulate the actual randomizing of the notes
  useEffect(() => {
    setInterval(
      () =>
        setCurrentNote(note => {
          if (note === NaturalNotes.length - 1) {
            // reset
            return 0;
          }
          return note + 1;
        }),
      bpmInMs
    );
  }, []);

  return <div>{NaturalNotes[currentNote]}</div>;
};
