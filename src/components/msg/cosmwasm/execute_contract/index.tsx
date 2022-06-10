import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgCosmwasmExecuteContract } from '@models';

const CosmwasmExecuteContract = (props: {
  message: MsgCosmwasmExecuteContract;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txCosmwasmExecuteContractContent"
        components={[
            (
              <Name
                address={message.contractAddress}
                name={message.contractAddress}
              />
            ),
        ]}
      />
    </Typography>
  );
};

export default CosmwasmExecuteContract;
