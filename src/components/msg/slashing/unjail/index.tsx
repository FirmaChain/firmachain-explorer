import { Name } from '@components';
import { MsgUnjail } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const Unjail = (props: { message: MsgUnjail }) => {
    const { message } = props;
    const validator = useProfileRecoil(message.validatorAddress);
    const validatorMoniker = validator ? validator?.name : message.validatorAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txUnjailContent"
                components={[<Name address={message.validatorAddress} name={validatorMoniker} />]}
            />
        </Typography>
    );
};

export default Unjail;
