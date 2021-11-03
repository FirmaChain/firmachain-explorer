import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { MsgTokenBurn } from '@models';

const TokenBurn = (props: {
  message: MsgTokenBurn;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txTokenBurnContent"
        values={{
            amount: message.amount,
            tokenID: message.tokenID,
        }}
      />
    </Typography>
  );
};

export default TokenBurn;
