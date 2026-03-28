import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@material-ui/core';
import { MsgWithdrawValidatorCommission } from '@models';
import { useProfileRecoil } from '@recoil/profiles';
import { formatNumber } from '@utils/format_token';

const WithdrawCommission = (props: { message: MsgWithdrawValidatorCommission }) => {
    const { message } = props;
    const validator = useProfileRecoil(message.validatorAddress);
    const validatorMoniker = validator ? validator?.name : message.validatorAddress;
    const parsedAmount = message.amounts
        .map((x) => {
            return `${formatNumber(x.value, x.exponent)} ${x.displayDenom.toUpperCase()}`;
        })
        .join(', ');

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txWithdrawCommissionContent"
                components={[<Name address={message.validatorAddress} name={validatorMoniker} />, <b />]}
                values={{
                    amount: parsedAmount
                }}
            />
        </Typography>
    );
};

export default WithdrawCommission;
