import React from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';

const footerStyle = css({
  display: 'flex',
  flexFlow: 'column nowrap',
  marginTop: 'auto',
  alignItems: 'center',
  padding: '16px 0',
});

export const Footer: React.FC = () => {
  return (
    <footer css={footerStyle}>
      <span>
        Created by{' '}
        <a href={'https://www.tonyanziano.com'} target={'_blank'}>
          Tony Anziano
        </a>
      </span>
      <span>
        Metronome sound provided by{' '}
        <a href={'https://soundbible.com/914-Metronome.html'} target={'_blank'}>
          Mike Koenig
        </a>
      </span>
    </footer>
  );
};
