import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgTransfer } from '@models';
import { useProfileRecoil } from '@zustand/profiles';
import { formatNumber, formatToken } from '@utils/format_token';

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
