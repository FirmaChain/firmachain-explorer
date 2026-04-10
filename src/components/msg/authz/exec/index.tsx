import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgExec } from '@models';
import { useProfileRecoil } from '@zustand/profiles';

const Exec = (props: { message: MsgExec }) => {
    const { message } = props;

    const grantee = useProfileRecoil(message.grantee);
    const granteeMoniker = grantee ? grantee?.name : message.grantee;

    return (
        <Typography>
            <Trans i18nKey="message_contents:MsgExec" components={[<Name address={message.grantee} name={granteeMoniker} />]} />
        </Typography>
    );
};

export default Exec;
