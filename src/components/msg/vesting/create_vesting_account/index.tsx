import React from 'react';
import { Name } from '@components';
import { MsgCreateVestingAccount } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const CreateVestingAccount = (props: { message: MsgCreateVestingAccount }) => {
    const { message } = props;

    const to = useProfileRecoil(message.toAddress);
    const toMoniker = to ? to?.name : message.toAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:MsgCreateVestingAccount"
                components={[<Name address={message.toAddress} name={toMoniker} />]}
            />
        </Typography>
    );
};

export default CreateVestingAccount;
