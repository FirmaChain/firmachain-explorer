import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { MsgTokenUpdateURI } from '@models';

const TokenUpdateURI = (props: {
  message: MsgTokenUpdateURI;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txTokenUpdateURIContent"
        values={{
            tokenID: message.tokenID,
        }}
      />
    </Typography>
  );
};

export default TokenUpdateURI;
