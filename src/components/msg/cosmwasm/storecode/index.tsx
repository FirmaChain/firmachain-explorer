import React from 'react';
import { Name } from '@components';
import { MsgCosmwasmStoreCode } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

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
