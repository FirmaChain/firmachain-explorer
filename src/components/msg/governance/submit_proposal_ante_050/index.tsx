import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import MsgSubmitProposal from '@/models/msg/governance/msg_submit_proposal';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';

const SubmitProposalAnte050 = (props: { message: MsgSubmitProposal }) => {
    const { message } = props;

    const proposer = useProfileRecoil(message.proposer);
    const proposerMoniker = proposer ? proposer?.name : message.proposer;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txSubmitProposalAnte050Content"
                components={[<Name address={message.proposer} name={proposerMoniker} />]}
            />
        </Typography>
    );
};

export default SubmitProposalAnte050;
