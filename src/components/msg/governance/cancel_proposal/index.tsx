import React from 'react';
import Link from 'next/link';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgCancelProposal } from '@models';
import { useProfileRecoil } from '@recoil/profiles';
import { PROPOSAL_DETAILS } from '@utils/go_to_page';

const CancelProposal = (props: {
  message: MsgCancelProposal;
}) => {
  const { t } = useTranslation('transactions');
  const { message } = props;

  const proposer = useProfileRecoil(message.proposer);
  const proposerMoniker = proposer && typeof proposer.name === 'string' ? proposer.name : message.proposer;

  const Proposal = () => {
    return (
      <Link href={PROPOSAL_DETAILS(message.proposalId)} passHref>
        <Typography component="a">
          #
          {message.proposalId}
        </Typography>
      </Link>
    );
  };

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txCancelProposalContent"
        components={[
          (
            <Name
              address={message.proposer}
              name={proposerMoniker}
            />
          ),
          <Proposal />,
        ]}
      />
    </Typography>
  );
};

export default CancelProposal; 