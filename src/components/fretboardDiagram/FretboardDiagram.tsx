import React, { useEffect, useRef, useState } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';

const diagramContainerStyle = css({
  width: '100%',
  height: '100%',
});

const numberOfFrets = 12; // total number of frets to draw
const numberOfFretBars = numberOfFrets + 1;
const fretBarWidth = 4; // fret bar (separators between each fret) width in pixels

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

      // lets calculate the top,left points for each fret within the given container width (really just the left point since top will be the height of the container)
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
      }
    }
  }, [containerRect, canvasRef]);

  return (
    <div css={diagramContainerStyle} ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
