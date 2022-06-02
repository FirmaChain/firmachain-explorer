import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgNFTBurn } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const NFTBurn = (props: {
  message: MsgNFTBurn;
}) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txNFTBurnContent"
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

export default NFTBurn;
