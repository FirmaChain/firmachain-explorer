import { MsgTokenUpdateURI } from '@models';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';

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
