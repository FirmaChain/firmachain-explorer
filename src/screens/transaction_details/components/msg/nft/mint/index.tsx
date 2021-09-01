import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgNFTMint } from '@models';
import { useChainContext } from '@contexts';

const NFTMint = (props: {
  message: MsgNFTMint;
}) => {
  const { findAddress } = useChainContext();
  const { message } = props;

  const ownerAddress = findAddress(message.ownerAddress);
  const ownerMoniker = ownerAddress ? ownerAddress?.moniker : message.ownerAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txNFTMintContent"
        components={[
          (
            <Name
              address={message.ownerAddress}
              name={ownerMoniker}
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

export default NFTMint;
