import React from 'react';
import { Note } from './Note';

type StringProps = {
  notes: string[];
  number: number;
};

export const String: React.FC<StringProps> = props => {
  const { notes = [], number } = props;

  return (
    <>
      {notes.map((n, nNumber) => (
        <Note key={`string-${number}-${n}`} note={n} number={nNumber} />
      ))}
    </>
  );
};
