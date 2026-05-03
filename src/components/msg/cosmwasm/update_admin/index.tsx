import { Name } from '@components';
import { MsgCosmwasmUpdateAdmin } from '@models';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';

const CosmwasmUpdateAdmin = (props: { message: MsgCosmwasmUpdateAdmin }) => {
    const { message } = props;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCosmwasmUpdateAdminContent"
                components={[
                    <Name address={message.newAdminAddress} name={message.newAdminAddress} />,
                    <Name address={message.contractAddress} name={message.contractAddress} />
                ]}
            />
        </Typography>
    );
};

export default CosmwasmUpdateAdmin;
