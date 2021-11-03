import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgTokenCreate } from '@models';
import { useChainContext } from '@contexts';

const TokenCreate = (props: {
  message: MsgTokenCreate;
}) => {
  const { findAddress } = useChainContext();
  const { message } = props;

  const ownerAddress = findAddress(message.ownerAddress);
  const ownerMoniker = ownerAddress ? ownerAddress?.moniker : message.ownerAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txTokenCreateContent"
        components={[
          (
            <Name
              address={message.ownerAddress}
              name={ownerMoniker}
            />
          ),
        ]}
        values={{
            tokenName: message.name,
            tokenSymbol: message.symbol,
        }}
      />
    </Typography>
  );
};

export default TokenCreate;
