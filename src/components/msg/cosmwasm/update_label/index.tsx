import { Name } from '@components';
import { MsgCosmwasmUpdateLabel } from '@models';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';

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
