import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { MsgTokenMint } from '@models';

const TokenMint = (props: {
  message: MsgTokenMint;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txTokenMintContent"
        values={{
            amount: message.amount,
            tokenID: message.tokenID,
        }}
      />
    </Typography>
  );
};

export default TokenMint;
