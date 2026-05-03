import { Name } from '@components';
import { MsgSubmitProposal } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const SubmitProposal = (props: { message: MsgSubmitProposal }) => {
    const { message } = props;

    const proposer = useProfileRecoil(message.proposer);
    const proposerMoniker = proposer ? proposer?.name : message.proposer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txSubmitProposalContent"
                components={[<Name address={message.proposer} name={proposerMoniker} />]}
            />
        </Typography>
    );
};

export default SubmitProposal;
