import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgTokenCreate } from '@models';
import { useProfileRecoil } from '@zustand/profiles';

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
