import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgTokenBurn } from '@models';
import { useChainContext } from '@contexts';

const TokenBurn = (props: {
  message: MsgTokenBurn;
}) => {
  const { findAddress } = useChainContext();
  const { message } = props;

  const ownerAddress = findAddress(message.ownerAddress);
  const ownerMoniker = ownerAddress ? ownerAddress?.moniker : message.ownerAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txTokenBurnContent"
        components={[
          (
            <Name
              address={message.ownerAddress}
              name={ownerMoniker}
            />
          ),
        ]}
        values={{
            amount: message.amount,
            tokenID: message.tokenID,
        }}
      />
    </Typography>
  );
};

export default TokenBurn;
