import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgCosmwasmUpdateAdmin } from '@models';

const CosmwasmUpdateAdmin = (props: {
  message: MsgCosmwasmUpdateAdmin;
}) => {
  const { message } = props;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txCosmwasmUpdateAdminContent"
        components={[
            (
              <Name
                address={message.newAdminAddress}
                name={message.newAdminAddress}
              />
            ),
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

export default CosmwasmUpdateAdmin;
