import React from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';

const formStyle = css({
  textAlign: 'center',
});

const borderlessStyle = css({
  border: 0,
});

export const DonateButton: React.FC = () => (
  <form
    action={'https://www.paypal.com/donate'}
    css={formStyle}
    method={'post'}
    target={'_top'}
  >
    <input name={'business'} type={'hidden'} value={'4D4ACLWZVZLCN'} />
    <input name={'no_recurring'} type={'hidden'} value={'0'} />
    <input
      name={'item_name'}
      type={'hidden'}
      value={
        'I enjoy making things that are useful. If you found something I made useful and want to show your support, thank you.'
      }
    />
    <input name={'currency_code'} type={'hidden'} value={'USD'} />
    <input
      alt={'Donate with PayPal button'}
      css={borderlessStyle}
      name={'submit'}
      src={'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'}
      title={'PayPal - The safer, easier way to pay online!'}
      type={'image'}
    />
    <img
      alt={''}
      css={borderlessStyle}
      height={'1'}
      src={'https://www.paypal.com/en_US/i/scr/pixel.gif'}
      width={'1'}
    />
  </form>
);
