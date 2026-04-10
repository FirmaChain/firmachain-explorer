import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgNFTBurn } from '@models';
import { useProfileRecoil } from '@zustand/profiles';

const NFTBurn = (props: { message: MsgNFTBurn }) => {
    const { message } = props;

    const ownerAddress = useProfileRecoil(message.ownerAddress);
    const ownerMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txNFTBurnContent"
                components={[<Name address={message.ownerAddress} name={ownerMoniker} />]}
                values={{
                    nftId: message.nftId
                }}
            />
        </Typography>
    );
};

export default NFTBurn;
