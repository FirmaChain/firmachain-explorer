import React from 'react';
import { Name } from '@components';
import { MsgRedelegate } from '@models';
import { Typography } from '@mui/material';
import { formatNumber, formatToken } from '@utils/format_token';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const Redelegate = (props: { message: MsgRedelegate }) => {
    const { message } = props;
    const amount = formatToken(message.amount.amount, message.amount.denom);

    const parsedAmount = `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;

    const delegator = useProfileRecoil(message.delegatorAddress);
    const delegatorMoniker = delegator ? delegator?.name : message.delegatorAddress;

    const from = useProfileRecoil(message.validatorSrcAddress);
    const fromMoniker = from ? from?.name : message.validatorSrcAddress;

    const to = useProfileRecoil(message.validatorDstAddress);
    const toMoniker = to ? to?.name : message.validatorDstAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txRedelegateContent"
                components={[
                    <Name address={message.delegatorAddress} name={delegatorMoniker} />,
                    <b />,
                    <Name address={message.validatorSrcAddress} name={fromMoniker} />,
                    <Name address={message.validatorDstAddress} name={toMoniker} />
                ]}
                values={{
                    amount: parsedAmount
                }}
            />
        </Typography>
    );
};

export default Redelegate;
