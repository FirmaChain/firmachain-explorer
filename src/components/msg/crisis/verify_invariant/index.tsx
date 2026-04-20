import React from 'react';
import { Name } from '@components';
import { MsgVerifyInvariant } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const VerifyInvariant = (props: { message: MsgVerifyInvariant }) => {
    const { message } = props;

    const user = useProfileRecoil(message.sender);
    const userMoniker = user ? user?.name : message.sender;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txVerifyInvariantContent"
                components={[<Name address={message.sender} name={userMoniker} />]}
            />
        </Typography>
    );
};

export default VerifyInvariant;
