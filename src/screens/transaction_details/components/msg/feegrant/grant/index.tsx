import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgFeegrantGrant } from '@models';
import { useChainContext } from '@contexts';

const FeegrantGrant = (props: {
  message: MsgFeegrantGrant;
}) => {
  const { findAddress } = useChainContext();
  const { message } = props;

  const granterAddress = findAddress(message.granter);
  const granterMoniker = granterAddress ? granterAddress?.moniker : message.granter;

  const granteeAddress = findAddress(message.grantee);
  const granteeMoniker = granteeAddress ? granteeAddress?.moniker : message.grantee;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txFeegrantGrantContent"
        components={[
          (
            <Name
              address={message.granter}
              name={granterMoniker}
            />
          ),
          (
            <Name
              address={message.grantee}
              name={granteeMoniker}
            />
          ),
        ]}
      />
    </Typography>
  );
};

export default FeegrantGrant;
