import React from 'react';
import { useCurrentNote } from '../hooks/useCurrentNote';

/**
 * Displays the current note that should be played by the user
 */
export const CurrentNote: React.FC<{}> = () => {
  const currentNote = useCurrentNote();

  return <div>{currentNote}</div>;
};
