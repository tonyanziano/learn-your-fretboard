import React from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { Note } from './Note';

const style = css({});

type StringProps = {
  notes: string[];
  number: number;
};

export const String: React.FC<StringProps> = props => {
  const { notes = [], number } = props;

  return (
    <>
      {notes.map(n => (
        <Note key={`string-${number}-${n}`} note={n} />
      ))}
    </>
  );
};
