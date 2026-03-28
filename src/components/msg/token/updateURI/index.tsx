import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Typography } from '@mui/material';
import { MsgTokenUpdateURI } from '@models';

const TokenUpdateURI = (props: { message: MsgTokenUpdateURI }) => {
    const { message } = props;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txTokenUpdateURIContent"
                values={{
                    tokenID: message.tokenID
                }}
            />
        </Typography>
    );
};

export default TokenUpdateURI;
