import { Name } from '@components';
import { MsgConnectionOpenConfirm } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const ConnectionOpenConfirm = (props: { message: MsgConnectionOpenConfirm }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txConnectionOpenConfirmContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    connectionId: message.connectionId
                }}
            />
        </Typography>
    );
};

export default ConnectionOpenConfirm;
