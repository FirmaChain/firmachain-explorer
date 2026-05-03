import { Name } from '@components';
import { MsgConnectionOpenAck } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const ConnectionOpenAck = (props: { message: MsgConnectionOpenAck }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txConnectionOpenAckContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    connectionId: message.connectionId,
                    counterpartyConnectionId: message.counterpartyConnectionId
                }}
            />
        </Typography>
    );
};

export default ConnectionOpenAck;
