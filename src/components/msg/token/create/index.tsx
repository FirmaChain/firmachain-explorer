import React from 'react';
import { Name } from '@components';
import { MsgTokenCreate } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const TokenCreate = (props: { message: MsgTokenCreate }) => {
    const { message } = props;

    const ownerAddress = useProfileRecoil(message.ownerAddress);
    const ownerMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txTokenCreateContent"
                components={[<Name address={message.ownerAddress} name={ownerMoniker} />]}
                values={{
                    tokenName: message.name,
                    tokenSymbol: message.symbol
                }}
            />
        </Typography>
    );
};

export default TokenCreate;
