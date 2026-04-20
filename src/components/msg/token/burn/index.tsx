import React from 'react';
import { Name } from '@components';
import { MsgTokenBurn } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const TokenBurn = (props: { message: MsgTokenBurn }) => {
    const { message } = props;

    const ownerAddress = useProfileRecoil(message.ownerAddress);
    const ownerMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txTokenBurnContent"
                components={[<Name address={message.ownerAddress} name={ownerMoniker} />]}
                values={{
                    amount: message.amount,
                    tokenID: message.tokenID
                }}
            />
        </Typography>
    );
};

export default TokenBurn;
