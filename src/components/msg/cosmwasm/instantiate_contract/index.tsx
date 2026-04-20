import React from 'react';
import { Name } from '@components';
import { MsgCosmwasmInstantiateContract } from '@models';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';

const CosmwasmInstantiateContract = (props: { message: MsgCosmwasmInstantiateContract }) => {
    const { message } = props;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCosmwasmInstantiateContractContent"
                components={[<Name address={message.contractAddress} name={message.contractAddress} />]}
                values={{
                    codeId: message.codeId
                }}
            />
        </Typography>
    );
};

export default CosmwasmInstantiateContract;
