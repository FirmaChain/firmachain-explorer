import { Name } from '@components';
import { MsgReceivePacket } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const ReceivePacket = (props: { message: MsgReceivePacket }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txReceivePacketContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    sourceChannel: message.sourceChannel,
                    destinationChannel: message.destinationChannel
                }}
            />
        </Typography>
    );
};

export default ReceivePacket;
