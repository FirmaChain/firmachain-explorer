import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { MsgTokenCreate } from '@models';

const TokenCreate = (props: {
  message: MsgTokenCreate;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txTokenCreateContent"
        values={{
            tokenNmae: message.name,
            tokenSymbol: message.symbol,
        }}
      />
    </Typography>
  );
};

export default TokenCreate;
