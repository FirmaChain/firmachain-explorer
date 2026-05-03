import { Name } from '@components';
import { MsgCancelProposal } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const CancelProposal = (props: { message: MsgCancelProposal }) => {
    const { message } = props;

    const proposer = useProfileRecoil(message.proposer);
    const proposerMoniker = proposer ? proposer?.name : message.proposer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCancelProposalContent"
                components={[<Name address={message.proposer} name={proposerMoniker} />]}
            />
        </Typography>
    );
};

export default CancelProposal;
