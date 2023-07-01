// potential optimization: just store starting note per string and generate notes for 12 frets
// (I don't even know if this is a good optimization, storing these in memory shouldn't be an issue)
type NoteInfo = { fret: number };
type StringNotes = Record<string, NoteInfo>;

// same for low and high E strings
const eStringNotes: StringNotes = {
  f: { fret: 1 },
  'f#': { fret: 2 },
  g: { fret: 3 },
  'g#': { fret: 4 },
  a: { fret: 5 },
  'a#': { fret: 6 },
  b: { fret: 7 },
  c: { fret: 8 },
  'c#': { fret: 9 },
  d: { fret: 10 },
  'd#': { fret: 11 },
  e: { fret: 12 },
};

const aStringNotes: StringNotes = {
  'a#': { fret: 1 },
  b: { fret: 2 },
  c: { fret: 3 },
  'c#': { fret: 4 },
  d: { fret: 5 },
  'd#': { fret: 6 },
  e: { fret: 7 },
  f: { fret: 8 },
  'f#': { fret: 9 },
  g: { fret: 10 },
  'g#': { fret: 11 },
  a: { fret: 12 },
};

const dStringNotes: StringNotes = {
  'd#': { fret: 1 },
  e: { fret: 2 },
  f: { fret: 3 },
  'f#': { fret: 4 },
  g: { fret: 5 },
  'g#': { fret: 6 },
  a: { fret: 7 },
  'a#': { fret: 8 },
  b: { fret: 9 },
  c: { fret: 10 },
  'c#': { fret: 11 },
  d: { fret: 12 },
};

const gStringNotes: StringNotes = {
  'g#': { fret: 1 },
  a: { fret: 2 },
  'a#': { fret: 3 },
  b: { fret: 4 },
  c: { fret: 5 },
  'c#': { fret: 6 },
  d: { fret: 7 },
  'd#': { fret: 8 },
  e: { fret: 9 },
  f: { fret: 10 },
  'f#': { fret: 11 },
  g: { fret: 12 },
};

const bStringNotes: StringNotes = {
  c: { fret: 1 },
  'c#': { fret: 2 },
  d: { fret: 3 },
  'd#': { fret: 4 },
  e: { fret: 5 },
  f: { fret: 6 },
  'f#': { fret: 7 },
  g: { fret: 8 },
  'g#': { fret: 9 },
  a: { fret: 10 },
  'a#': { fret: 11 },
  b: { fret: 12 },
};

export const notesPerString = [
  eStringNotes,
  bStringNotes,
  gStringNotes,
  dStringNotes,
  aStringNotes,
  eStringNotes,
];
