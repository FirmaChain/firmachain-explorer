import { Name } from '@components';
import { MsgWithdrawValidatorCommission } from '@models';
import { Typography } from '@mui/material';
import { formatNumber } from '@utils/format_token';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

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
