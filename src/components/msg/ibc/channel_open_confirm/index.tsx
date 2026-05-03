import { Name } from '@components';
import { MsgChannelOpenConfirm } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const ChannelOpenConfirm = (props: { message: MsgChannelOpenConfirm }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txChannelOpenConfirmContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    channelId: message.channelId,
                    portId: message.portId
                }}
            />
        </Typography>
    );
};

export default ChannelOpenConfirm;
