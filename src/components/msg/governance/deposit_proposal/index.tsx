import { Name } from '@components';
import { MsgDeposit } from '@models';
import { Typography } from '@mui/material';
import { formatNumber, formatToken } from '@utils/format_token';
import { PROPOSAL_DETAILS } from '@utils/go_to_page';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const DepositProposal = (props: { message: MsgDeposit }) => {
    const { t } = useTranslation('transactions');
    const { message } = props;

    const parsedAmount = message?.amount
        ?.map((x) => {
            const amount = formatToken(x.amount, x.denom);
            return `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;
        })
        .reduce((text, value, i, array) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value);

    const depositor = useProfileRecoil(message.depositor);
    const depositorMoniker = depositor ? depositor?.name : message.depositor;

    const Proposal = () => {
        return (
            <Link to={PROPOSAL_DETAILS(message.proposalId)}>
                <Typography component="a">#{message.proposalId}</Typography>
            </Link>
        );
    };
    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txDepositContent"
                components={[<Name address={message.depositor} name={depositorMoniker} />, <b />, <Proposal />]}
                values={{
                    amount: parsedAmount
                }}
            />
        </Typography>
    );
};

export default DepositProposal;
