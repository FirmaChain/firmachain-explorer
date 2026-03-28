import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@material-ui/core';
import { MsgCosmwasmInstantiateContract } from '@models';

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
