import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgCreateVestingAccount } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

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
