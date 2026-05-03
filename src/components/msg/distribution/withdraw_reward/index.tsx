import { Name } from '@components';
import { MsgWithdrawDelegatorReward } from '@models';
import { Typography } from '@mui/material';
import { formatNumber } from '@utils/format_token';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const WithdrawReward = (props: { message: MsgWithdrawDelegatorReward }) => {
    const { message } = props;
    const delegator = useProfileRecoil(message.delegatorAddress);
    const delegatorMoniker = delegator ? delegator?.name : message.delegatorAddress;

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
                i18nKey="message_contents:txWithdrawRewardContent"
                components={[
                    <Name address={message.delegatorAddress} name={delegatorMoniker} />,
                    <b />,
                    <Name address={message.validatorAddress} name={validatorMoniker} />
                ]}
                values={{
                    amount: parsedAmount
                }}
            />
        </Typography>
    );
};

export default WithdrawReward;
