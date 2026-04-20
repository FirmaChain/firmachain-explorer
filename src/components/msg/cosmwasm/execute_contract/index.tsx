import React from 'react';
import { Name } from '@components';
import { MsgCosmwasmExecuteContract } from '@models';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';

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
