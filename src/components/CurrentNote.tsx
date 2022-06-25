import React, { useEffect, useState } from 'react';
import { NaturalNotes } from '../constants';
import { useCurrentNote } from '../hooks/useCurrentNote';

const bpm = 40;
const bpmInMs = (60 / bpm) * 1000;

/**
 * Displays the current note that should be played by the user
 */
export const CurrentNote: React.FC<{}> = () => {
  const currentNote = useCurrentNote();

  return <div>{currentNote}</div>;
};
