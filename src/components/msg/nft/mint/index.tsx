import React from 'react';
import { Name } from '@components';
import { MsgNFTMint } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const NFTMint = (props: { message: MsgNFTMint }) => {
    const { message } = props;

    const ownerAddress = useProfileRecoil(message.ownerAddress);
    const ownerMoniker = ownerAddress ? ownerAddress?.name : message.ownerAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txNFTMintContent"
                components={[<Name address={message.ownerAddress} name={ownerMoniker} />]}
                values={{
                    nftId: message.nftId
                }}
            />
        </Typography>
    );
};

export default NFTMint;
