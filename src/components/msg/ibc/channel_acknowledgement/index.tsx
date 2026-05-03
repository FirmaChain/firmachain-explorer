import { Name } from '@components';
import { MsgAcknowledgement } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

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
