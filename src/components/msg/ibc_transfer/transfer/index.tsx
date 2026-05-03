import { Name } from '@components';
import { MsgTransfer } from '@models';
import { Typography } from '@mui/material';
import { formatNumber, formatToken } from '@utils/format_token';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const Transfer = (props: { message: MsgTransfer }) => {
    const { message } = props;

    const sender = useProfileRecoil(message.sender);
    const senderMoniker = sender ? sender?.name : message.sender;
    const receiver = useProfileRecoil(message.receiver);
    const receiverMoniker = receiver ? receiver?.name : message.receiver;
    const tokenFormatDenom = formatToken(message.token?.amount, message.token?.denom);
    const token = `${formatNumber(tokenFormatDenom.value, tokenFormatDenom.exponent)} ${tokenFormatDenom.displayDenom.toUpperCase()}`;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txTransferContent"
                components={[
                    <Name address={message.sender} name={senderMoniker} />,
                    <Name address={message.receiver} name={receiverMoniker} />,
                    <b />
                ]}
                values={{
                    token,
                    sourceChannel: message.sourceChannel
                }}
            />
        </Typography>
    );
};

export default Transfer;
