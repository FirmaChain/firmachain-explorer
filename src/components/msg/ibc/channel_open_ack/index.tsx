import React from 'react';
import { Name } from '@components';
import { MsgChannelOpenAck } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

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
