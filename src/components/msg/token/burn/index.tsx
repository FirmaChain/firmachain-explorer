import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgTokenBurn } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const TokenBurn = (props: {
  message: MsgTokenBurn;
}) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

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
