import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@material-ui/core';
import { MsgNFTMint } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

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
