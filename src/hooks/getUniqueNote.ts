/** Returns a note from the supplied pool of notes and ensures that it is not a repeat. */
export const getUniqueNote = (
  availableNotes: string[],
  previousNote = ''
): string => {
  // ensure we don't repeat the same note
  let note;
  do {
    const noteIndex = Math.round(Math.random() * (availableNotes.length - 1));
    note = availableNotes[noteIndex];
  } while (note === previousNote);

  return note;
};
