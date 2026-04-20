import React from 'react';
import { Name } from '@components';
import { MsgCreatePeriodicVestingAccount } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const CreatePeriodicVestingAccount = (props: { message: MsgCreatePeriodicVestingAccount }) => {
    const { message } = props;

    const to = useProfileRecoil(message.toAddress);
    const toMoniker = to ? to?.name : message.toAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:MsgCreatePeriodicVestingAccount"
                components={[<Name address={message.toAddress} name={toMoniker} />]}
            />
        </Typography>
    );
};

export default CreatePeriodicVestingAccount;
