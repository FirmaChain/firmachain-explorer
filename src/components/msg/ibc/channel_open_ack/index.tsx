import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgChannelOpenAck } from '@models';
import { useProfileRecoil } from '@zustand/profiles';

const ChannelOpenAck = (props: { message: MsgChannelOpenAck }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txChannelOpenAckContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    channelId: message.channelId,
                    portId: message.portId,
                    counterpartyChannelId: message.counterpartyChannelId,
                    counterpartyVersion: message.counterpartyVersion
                }}
            />
        </Typography>
    );
};

export default ChannelOpenAck;
