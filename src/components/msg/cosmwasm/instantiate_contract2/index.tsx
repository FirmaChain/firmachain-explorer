import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@material-ui/core';
import { MsgCosmwasmInstantiateContract2 } from '@models';

const CosmwasmInstantiateContract2 = (props: { message: MsgCosmwasmInstantiateContract2 }) => {
    const { message } = props;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCosmwasmInstantiateContractContent2"
                components={[<Name address={message.contractAddress} name={message.contractAddress} />]}
                values={{
                    codeId: message.codeId
                }}
            />
        </Typography>
    );
};

export default CosmwasmInstantiateContract2;
