import { Name } from '@components';
import { MsgCounterpartyConnection } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const CounterpartyConnection = (props: { message: MsgCounterpartyConnection }) => {
    const { message } = props;

    const signer = useProfileRecoil(message.signer);
    const signerMoniker = signer ? signer?.name : message.signer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCounterpartyContent"
                components={[<Name address={message.signer} name={signerMoniker} />, <b />]}
            />
        </Typography>
    );
};

export default CounterpartyConnection;
