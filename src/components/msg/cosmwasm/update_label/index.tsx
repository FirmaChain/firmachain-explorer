import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgCosmwasmUpdateLabel } from '@models';

const CosmwasmUpdateLabel = (props: { message: MsgCosmwasmUpdateLabel }) => {
    const { message } = props;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCosmwasmUpdateLabelContent"
                components={[
                    <Name address={message.newLabelString} name={message.newLabelString} />,
                    <Name address={message.contractAddress} name={message.contractAddress} />
                ]}
            />
        </Typography>
    );
};

export default CosmwasmUpdateLabel;
