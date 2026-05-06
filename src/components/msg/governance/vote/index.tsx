import { Name } from '@components';
import { MsgVote } from '@models';
import { Typography } from '@mui/material';
import { PROPOSAL_DETAILS } from '@utils/go_to_page';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const Vote = (props: { message: MsgVote }) => {
    const { t } = useTranslation('transactions');
    const { message } = props;
    const vote = t(message.getOptionTranslationKey());

    const voter = useProfileRecoil(message.voter);
    const voterMoniker = voter ? voter?.name : message.voter;

    const Proposal = () => {
        return (
            <Link to={PROPOSAL_DETAILS(message.proposalId)}>
                <Typography>#{message.proposalId}</Typography>
            </Link>
        );
    };

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txVoteContent"
                components={[<Name address={message.voter} name={voterMoniker} />, <b />, <Proposal />]}
                values={{
                    vote
                }}
            />
        </Typography>
    );
};

export default Vote;
