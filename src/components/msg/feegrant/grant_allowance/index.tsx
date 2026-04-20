import React from 'react';
import { Name } from '@components';
import { MsgGrantAllowance } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const GrantAllowance = (props: { message: MsgGrantAllowance }) => {
    const { message } = props;

    const granter = useProfileRecoil(message.granter);
    const granterMoniker = granter ? granter?.name : message.granter;

    const grantee = useProfileRecoil(message.grantee);
    const granteeMoniker = grantee ? grantee?.name : message.grantee;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:MsgGrantAllowance"
                components={[
                    <Name address={message.granter} name={granterMoniker} />,
                    <Name address={message.grantee} name={granteeMoniker} />
                ]}
            />
        </Typography>
    );
};

export default GrantAllowance;
