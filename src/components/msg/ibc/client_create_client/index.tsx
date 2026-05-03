import { Name } from '@components';
import { MsgCreateClient } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const CreateClient = (props: { message: MsgCreateClient }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCreateClientContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
                values={{
                    chainId: message.chainId
                }}
            />
        </Typography>
    );
};

export default CreateClient;
