import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@material-ui/core';
import { MsgCosmwasmClearAdmin } from '@models';

const CosmwasmClearAdmin = (props: { message: MsgCosmwasmClearAdmin }) => {
    const { message } = props;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCosmwasmClearAdminContent"
                components={[<Name address={message.contractAddress} name={message.contractAddress} />]}
            />
        </Typography>
    );
};

export default CosmwasmClearAdmin;
