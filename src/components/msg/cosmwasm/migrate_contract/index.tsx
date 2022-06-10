import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgCosmwasmMigrateContract } from '@models';

const CosmwasmMigrateContract = (props: {
  message: MsgCosmwasmMigrateContract;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txCosmwasmMigrateContractContent"
        components={[
            (
              <Name
                address={message.contractAddress}
                name={message.contractAddress}
              />
            ),
        ]}
        values={{
            codeId: message.codeId,
        }}
      />
    </Typography>
  );
};

export default CosmwasmMigrateContract;
