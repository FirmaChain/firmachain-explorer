import React from 'react';
import { Name } from '@components';
import { MsgCosmwasmMigrateContract } from '@models';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';

const CosmwasmMigrateContract = (props: { message: MsgCosmwasmMigrateContract }) => {
    const { message } = props;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCosmwasmMigrateContractContent"
                components={[<Name address={message.contractAddress} name={message.contractAddress} />]}
                values={{
                    codeId: message.codeId
                }}
            />
        </Typography>
    );
};

export default CosmwasmMigrateContract;
