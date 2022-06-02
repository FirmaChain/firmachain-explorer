import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgNFTTransfer } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const NFTTransfer = (props: {
  message: MsgNFTTransfer;
}) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  const toAddress = useProfileRecoil(message.toAddress);
  const toMoniker = toAddress ? toAddress?.name : message.toAddress;

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
