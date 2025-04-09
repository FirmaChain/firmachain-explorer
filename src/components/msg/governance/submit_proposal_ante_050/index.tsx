import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { useProfileRecoil } from '@recoil/profiles';
import MsgSubmitProposal from '@src/models/msg/governance/msg_submit_proposal';

const SubmitProposalAnte050 = (props: {
  message: MsgSubmitProposal;
}) => {
  const { message } = props;

  const proposer = useProfileRecoil(message.proposer);
  const proposerMoniker = proposer ? proposer?.name : message.proposer;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txSubmitProposalAnte050Content"
        components={[
          (
            <Name
              address={message.proposer}
              name={proposerMoniker}
            />
          ),
        ]}
      />
    </Typography>
  );
};

export default SubmitProposalAnte050;
