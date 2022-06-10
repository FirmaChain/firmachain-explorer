import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgCosmwasmStoreCode } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const CosmwasmStoreCode = (props: {
  message: MsgCosmwasmStoreCode;
}) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);
  const ownerMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txCosmwasmStoreCodeContent"
        components={[
          (
            <Name
              address={message.ownerAddress}
              name={ownerMoniker}
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

export default CosmwasmStoreCode;
