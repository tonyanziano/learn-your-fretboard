import React, { useEffect, useRef, useState } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { notesPerString } from './fretboardNotes';
import { useSelector } from 'react-redux';
import { selectCurrentNote } from '../../state/selectors/currentNote';

const diagramContainerStyle = css({
  width: '100%',
  height: '100%',
  position: 'relative',
});

const overlayCanvasStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
});

const numberOfFrets = 12; // total number of frets to draw
const numberOfFretBars = numberOfFrets + 1;
const fretBarWidth = 2; // fret bar (separators between each fret) width in pixels
const stringHeight = 8;
const numberOfStrings = 6;
const currentFretHighlightRadius = 15;

type ContainerRect = {
  width: number;
  height: number;
};

export const FretboardDiagram: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [containerRect, setContainerRect] = useState<
    ContainerRect | undefined
  >();
  const [stringPositions, setStringPositions] = useState<number[]>([]);

  const { note: currentNote } = useSelector(selectCurrentNote);

  useEffect(() => {
    // setup a resize observer to watch the container of the diagram for resizing
    if (containerRef.current) {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setContainerRect({ width, height });
        }
      });
      observer.observe(containerRef.current);
    }
  }, []);

  // whenever the container size changes, redraw the diagram
  useEffect(() => {
    if (containerRect && bgCanvasRef.current && overlayCanvasRef.current) {
      const { width: containerWidth, height: containerHeight } = containerRect;

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

      // calculate the top points for each string within the given container height
      const newStringPositions = [];
      const remainingHeight = containerHeight - numberOfStrings * stringHeight;
      const spaceBetweenEachString = remainingHeight / (numberOfStrings + 1);
      for (let i = 0; i < numberOfStrings; i++) {
        // evenly distribute the strings (equal space between each)
        newStringPositions.push(
          spaceBetweenEachString * (i + 1) + stringHeight * i
        );
      }
      setStringPositions(newStringPositions);

      // calculate the inlay positions (frets 3, 5, 7, 9, 12)
      const verticalCenterOfFretboard = containerHeight / 2;
      const twelfthFretOffset = 80;
      const inlayRadius = 10;
      const inlayPositions = [
        { x: fretWidth * 2.5 + 2 * fretBarWidth, y: verticalCenterOfFretboard },
        { x: fretWidth * 4.5 + 4 * fretBarWidth, y: verticalCenterOfFretboard },
        { x: fretWidth * 6.5 + 6 * fretBarWidth, y: verticalCenterOfFretboard },
        { x: fretWidth * 8.5 + 8 * fretBarWidth, y: verticalCenterOfFretboard },
        {
          x: fretWidth * 11.5 + 11 * fretBarWidth, // 12th fret inlay #1
          y: verticalCenterOfFretboard + twelfthFretOffset,
        },
        {
          x: fretWidth * 11.5 + 11 * fretBarWidth, // 12th fret inlay #2
          y: verticalCenterOfFretboard - twelfthFretOffset,
        },
      ];

      // resize both canvases
      bgCanvasRef.current.setAttribute('width', `${containerWidth}`);
      bgCanvasRef.current.setAttribute('height', `${containerHeight}`);
      overlayCanvasRef.current.setAttribute('width', `${containerWidth}`);
      overlayCanvasRef.current.setAttribute('height', `${containerHeight}`);

      // fill the background canvas
      const bgCtx = bgCanvasRef.current.getContext('2d');
      if (bgCtx) {
        // background
        bgCtx.fillStyle = 'white';
        bgCtx.fillRect(0, 0, containerWidth, containerHeight);

        // frets
        bgCtx.fillStyle = 'black';
        for (const fretBarPos of fretBarPositions) {
          bgCtx.fillRect(fretBarPos, 0, fretBarWidth, containerHeight);
        }

        // strings
        for (const stringPos of newStringPositions) {
          bgCtx.fillRect(0, stringPos, containerWidth, stringHeight);
        }

        // inlays
        for (const inlayPos of inlayPositions) {
          bgCtx.beginPath();
          bgCtx.arc(inlayPos.x, inlayPos.y, inlayRadius, 0, Math.PI * 2);
          bgCtx.stroke();
        }
      }
    }
  }, [containerRect, bgCanvasRef, overlayCanvasRef]);

  // whenever the current note changes, we want to highlight the note on the fretboard
  useEffect(() => {
    if (overlayCanvasRef.current && currentNote) {
      const ctx = overlayCanvasRef.current.getContext('2d');
      if (ctx) {
        // clear the diagram
        ctx.clearRect(
          0,
          0,
          overlayCanvasRef.current.width,
          overlayCanvasRef.current.height
        );

        // calculate the width of a fret (TODO: store this in state after drawing the diagram and get it from there)
        const totalFretBarWidth = numberOfFretBars * fretBarWidth;
        const fretWidth =
          (overlayCanvasRef.current.width - totalFretBarWidth) / numberOfFrets;

        // for each string, look up the note on that string
        // if it exists, grab the coordinate of where we should draw the highlight and draw it
        for (let stringNum = 0; stringNum < numberOfStrings; stringNum++) {
          const stringNotes = notesPerString[stringNum];
          const { fret = undefined } =
            stringNotes[currentNote.toLocaleLowerCase()];

          if (fret) {
            // calculate the fret position in relationship to the background diagram
            const x =
              fret * fretWidth + (fret - 1) * fretBarWidth - fretWidth / 2; // (length of N frets) + (length of N-1 fret bars) - (half of a fret length)
            const y = stringPositions[stringNum] + stringHeight / 2; // want midpoint of the string

            // draw the highlight on that string
            ctx.strokeStyle = 'green';
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(x, y, currentFretHighlightRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
          }
        }
      }
    }
  }, [currentNote, overlayCanvasRef, stringPositions]);

  return (
    <div css={diagramContainerStyle} ref={containerRef}>
      <canvas ref={bgCanvasRef}></canvas>
      <canvas css={overlayCanvasStyle} ref={overlayCanvasRef}></canvas>
    </div>
  );
};
