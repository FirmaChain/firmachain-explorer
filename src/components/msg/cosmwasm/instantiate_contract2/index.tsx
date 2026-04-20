import React from 'react';
import { Name } from '@components';
import { MsgCosmwasmInstantiateContract2 } from '@models';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';

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
