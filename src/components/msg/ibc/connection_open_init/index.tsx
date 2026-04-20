import React from 'react';
import { Name } from '@components';
import { MsgConnectionOpenInit } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const ConnectionOpenInit = (props: { message: MsgConnectionOpenInit }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txConnectionOpenInitContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    clientId: message.clientId,
                    counterparty: message.counterparty
                }}
            />
        </Typography>
    );
};

export default ConnectionOpenInit;
