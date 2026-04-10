import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgUnjail } from '@models';
import { useProfileRecoil } from '@zustand/profiles';

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
