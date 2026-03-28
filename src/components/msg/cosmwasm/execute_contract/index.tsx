import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgCosmwasmExecuteContract } from '@models';

const CosmwasmExecuteContract = (props: { message: MsgCosmwasmExecuteContract }) => {
    const { message } = props;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCosmwasmExecuteContractContent"
                components={[<Name address={message.contractAddress} name={message.contractAddress} />]}
            />
        </Typography>
    );
};

export default CosmwasmExecuteContract;
