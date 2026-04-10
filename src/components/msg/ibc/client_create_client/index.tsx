import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgCreateClient } from '@models';
import { useProfileRecoil } from '@zustand/profiles';

const CreateClient = (props: { message: MsgCreateClient }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCreateClientContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    chainId: message.chainId
                }}
            />
        </Typography>
    );
};

export default CreateClient;
