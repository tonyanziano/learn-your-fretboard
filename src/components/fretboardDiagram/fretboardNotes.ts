// potential optimization: just store starting note per string and generate notes for 12 frets
// (I don't even know if this is a good optimization, storing these in memory shouldn't be an issue)

// same for low and high E strings
const eStringNotes = [
  'e',
  'f',
  'f#',
  'g',
  'g#',
  'a',
  'a#',
  'b',
  'c',
  'c#',
  'd',
  'd#',
  'e',
];

const aStringNotes = [
  'a',
  'a#',
  'b',
  'c',
  'c#',
  'd',
  'd#',
  'e',
  'f',
  'f#',
  'g',
  'g#',
  'a',
];

const dStringNotes = [
  'd',
  'd#',
  'e',
  'f',
  'f#',
  'g',
  'g#',
  'a',
  'a#',
  'b',
  'c',
  'c#',
  'd',
];

const gStringNotes = [
  'g',
  'g#',
  'a',
  'a#',
  'b',
  'c',
  'c#',
  'd',
  'd#',
  'e',
  'f',
  'f#',
  'g',
];

const bStringNotes = [
  'b',
  'c',
  'c#',
  'd',
  'd#',
  'e',
  'f',
  'f#',
  'g',
  'g#',
  'a',
  'a#',
  'b',
];

const notesPerString = [
  eStringNotes,
  bStringNotes,
  gStringNotes,
  dStringNotes,
  aStringNotes,
  eStringNotes,
];
