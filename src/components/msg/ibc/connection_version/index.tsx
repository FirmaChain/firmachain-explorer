import React from 'react';
import Trans from '@src/adapters/i18n/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgVersion } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const Version = (props: {
  message: MsgVersion;
}) => {
  const { message } = props;

  const signer = useProfileRecoil(message.signer);
  const signerMoniker = signer ? signer?.name : message.signer;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txVersionContent"
        components={[
          (
            <Name
              address={message.signer}
              name={signerMoniker}
            />
          ),
          <b />,
        ]}
      />
    </Typography>
  );
};

export default Version;
