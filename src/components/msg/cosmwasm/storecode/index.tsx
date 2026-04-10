import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgCosmwasmStoreCode } from '@models';
import { useProfileRecoil } from '@zustand/profiles';

const CosmwasmStoreCode = (props: { message: MsgCosmwasmStoreCode }) => {
    const { message } = props;

    const ownerAddress = useProfileRecoil(message.ownerAddress);
    const ownerMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCosmwasmStoreCodeContent"
                components={[<Name address={message.ownerAddress} name={ownerMoniker} />]}
                values={{
                    codeId: message.codeId
                }}
            />
        </Typography>
    );
};

export default CosmwasmStoreCode;
