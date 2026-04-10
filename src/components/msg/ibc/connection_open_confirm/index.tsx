import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgConnectionOpenConfirm } from '@models';
import { useProfileRecoil } from '@zustand/profiles';

const ConnectionOpenConfirm = (props: { message: MsgConnectionOpenConfirm }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txConnectionOpenConfirmContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    connectionId: message.connectionId
                }}
            />
        </Typography>
    );
};

export default ConnectionOpenConfirm;
