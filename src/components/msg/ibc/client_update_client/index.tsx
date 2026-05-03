import { Name } from '@components';
import { MsgUpdateClient } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const UpdateClient = (props: { message: MsgUpdateClient }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txUpdateClientContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    chainId: message.chainId,
                    clientId: message.clientId
                }}
            />
        </Typography>
    );
};

export default UpdateClient;
