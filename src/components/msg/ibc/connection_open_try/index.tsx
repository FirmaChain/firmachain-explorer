import React from 'react';
import { Name } from '@components';
import { MsgConnectionOpenTry } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const ConnectionOpenTry = (props: { message: MsgConnectionOpenTry }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txConnectionOpenTryContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    chainId: message.chainId,
                    clientId: message.clientId,
                    counterpartyClientId: message.counterpartyClientId,
                    counterpartyConnectionId: message.counterpartyConnectionId
                }}
            />
        </Typography>
    );
};

export default ConnectionOpenTry;
