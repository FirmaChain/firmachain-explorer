import { Name } from '@components';
import { MsgChannelOpenInit } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const ChannelOpenInit = (props: { message: MsgChannelOpenInit }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txChannelOpenInitContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    channelId: message.channelId,
                    portId: message.portId
                }}
            />
        </Typography>
    );
};

export default ChannelOpenInit;
