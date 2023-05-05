import React, { useEffect, useRef, useState } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { useCurrentNote } from '../../hooks/useCurrentNote';

const diagramContainerStyle = css({
  width: '100%',
  height: '100%',
});

const numberOfFrets = 12; // total number of frets to draw
const numberOfFretBars = numberOfFrets + 1;
const fretBarWidth = 2; // fret bar (separators between each fret) width in pixels
const stringHeight = 8;
const numberOfStrings = 6;

type ContainerRect = {
  width: number;
  height: number;
};

export const FretboardDiagram: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerRect, setContainerRect] = useState<
    ContainerRect | undefined
  >();
  const currentNote = useCurrentNote();

  useEffect(() => {
    // setup a resize observer to watch the container of the diagram for resizing
    if (containerRef.current) {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;

          // when the container gets resized, we want to redraw the diagram
          console.log(width, height);
          setContainerRect({ width, height });
        }
      });
      observer.observe(containerRef.current);
    }
  }, []);

  // whenever the container size changes, redraw the diagram
  useEffect(() => {
    if (containerRect && canvasRef.current) {
      const { width: containerWidth, height: containerHeight } = containerRect;
      console.log(
        `Got new container rect: ${containerRect}. Redrawing diagram...`
      );

      // calculate the top,left points for each fret within the given container width (really just the left point since top will be the height of the container)
      const fretBarPositions = [];
      const totalFretBarWidth = numberOfFretBars * fretBarWidth; // total width that the fret bars will occupy in the container
      const remainingWidth = containerWidth - totalFretBarWidth; // the space leftover that we can use to fill each fret
      const fretWidth = remainingWidth / numberOfFrets; // width of each fret (where your fingers go to play a note)
      for (let i = 0; i < numberOfFrets + 1; i++) {
        if (i === 0) {
          fretBarPositions.push(i);
          continue;
        }
        const fretBarStartingPos = i * (fretWidth + fretBarWidth);
        fretBarPositions.push(fretBarStartingPos);
      }
      console.log('Fret bar starting positions: ', fretBarPositions);

      // calculate the top points for each string within the given container height
      const stringPositions = [];
      const remainingHeight = containerHeight - numberOfStrings * stringHeight;
      const spaceBetweenEachString = remainingHeight / (numberOfStrings + 1);
      for (let i = 0; i < numberOfStrings; i++) {
        // evenly distribute the strings (equal space between each)
        stringPositions.push((spaceBetweenEachString + stringHeight) * (i + 1));
      }

      // draw the canvas
      canvasRef.current.setAttribute('width', `${containerWidth}`);
      canvasRef.current.setAttribute('height', `${containerHeight}`);

      // fill the canvas
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, containerWidth, containerHeight);

        // frets
        ctx.fillStyle = 'black';
        for (const fretBarPos of fretBarPositions) {
          ctx.fillRect(fretBarPos, 0, fretBarWidth, containerHeight);
        }

        // strings
        for (const stringPos of stringPositions) {
          ctx.fillRect(0, stringPos, containerWidth, stringHeight); // change to string height?
        }
      }
    }
  }, [containerRect, canvasRef]);

  // whenever the current note changes, we want to highlight the note on the fretboard
  useEffect(() => {
    // brainstorm:
    // - store a list of all frets and their corresponding notes per string
    // - if the string contains the note, draw some sort of highlight on the diagram at that fret
    // - might need to move this logic to the above diagram drawing function?
  }, [currentNote]);

  return (
    <div css={diagramContainerStyle} ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
