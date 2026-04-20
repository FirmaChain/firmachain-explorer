import React from 'react';
import { Name } from '@components';
import { MsgSubmitMisbehaviour } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const SubmitMisbehaviour = (props: { message: MsgSubmitMisbehaviour }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txSubmitMisbehaviourContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    clientId: message.clientId
                }}
            />
        </Typography>
    );
};

export default SubmitMisbehaviour;
