import React from "react";
import Link from "@/adapters/routing/link";
import Trans from "@/adapters/i18n/Trans";
import useTranslation from "@/adapters/i18n/useTranslation";
import { Typography } from "@material-ui/core";
import { Name } from "@components";
import { MsgVoteAnte050 } from "@models";
import { useProfileRecoil } from "@recoil/profiles";
import { PROPOSAL_DETAILS } from "@utils/go_to_page";

const VoteAnte050 = (props: { message: MsgVoteAnte050 }) => {
  const { t } = useTranslation("transactions");
  const { message } = props;
  const vote = t(message.getOptionTranslationKey());

  const voter = useProfileRecoil(message.voter);
  const voterMoniker = voter ? voter?.name : message.voter;

  const Proposal = () => {
    return (
      <Link href={PROPOSAL_DETAILS(message.proposalId)} passHref>
        <Typography component="a">#{message.proposalId}</Typography>
      </Link>
    );
  };

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txVoteAnte050Content"
        components={[
          <Name address={message.voter} name={voterMoniker} />,
          <b />,
          <Proposal />,
        ]}
        values={{
          vote,
        }}
      />
    </Typography>
  );
};

export default VoteAnte050;
