import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgAcknowledgement } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const Acknowledgement = (props: { message: MsgAcknowledgement }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txAcknowledgementContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    sourceChannel: message.sourceChannel
                }}
            />
        </Typography>
    );
};

export default Acknowledgement;
