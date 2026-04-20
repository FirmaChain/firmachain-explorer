import React from 'react';
import { Name } from '@components';
import { MsgCosmwasmClearAdmin } from '@models';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';

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
