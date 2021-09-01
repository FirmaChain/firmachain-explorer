import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgNFTTransfer } from '@models';
import { useChainContext } from '@contexts';

const NFTTransfer = (props: {
  message: MsgNFTTransfer;
}) => {
  const { findAddress } = useChainContext();
  const { message } = props;

  const ownerAddress = findAddress(message.ownerAddress);
  const ownerMoniker = ownerAddress ? ownerAddress?.moniker : message.ownerAddress;

  const toAddress = findAddress(message.toAddress);
  const toMoniker = toAddress ? toAddress?.moniker : message.toAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txNFTTransferContent"
        components={[
          (
            <Name
              address={message.ownerAddress}
              name={ownerMoniker}
            />
          ),
          (
            <Name
              address={message.toAddress}
              name={toMoniker}
            />
          ),
        ]}
        values={{
            nftId: message.nftId,
        }}
      />
    </Typography>
  );
};

export default NFTTransfer;
