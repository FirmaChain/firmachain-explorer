import { Name } from '@components';
import { MsgPacket } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const Packet = (props: { message: MsgPacket }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txPacketContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
            />
        </Typography>
    );
};

export default Packet;
