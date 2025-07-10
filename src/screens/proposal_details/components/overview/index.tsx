import React from "react";
import * as R from "ramda";
import numeral from "numeral";
import classnames from "classnames";
import dayjs, { formatDayJs } from "@utils/dayjs";
import useTranslation from "next-translate/useTranslation";
import { useRecoilValue } from "recoil";
import { readDate } from "@recoil/settings";
import { Typography, Divider } from "@material-ui/core";
import { SingleProposal, Box, Markdown, Name } from "@components";
import { useProfileRecoil } from "@recoil/profiles";
import { ParamsChange, SoftwareUpgrade } from "./components";
import { useStyles } from "./styles";
import { getProposalType } from "../../utils";
import { OverviewType } from "../../types";
import ParamsChangeV5 from "./components/params_change_v5";
import { formatNumber, formatTokenByExponent } from "@src/utils/format_token";

const Overview: React.FC<{ overview: OverviewType } & ComponentDefault> = ({
  className,
  overview,
}) => {
  const dateFormat = useRecoilValue(readDate);
  const classes = useStyles();
  const { t } = useTranslation("proposals");

  const content = Array.isArray(overview.content)
    ? overview.content[0]
    : overview.content;

  const type = getProposalType(R.pathOr("", ["@type"], content));

  const proposer = useProfileRecoil(overview.proposer);
  const proposerMoniker = proposer ? proposer?.name : overview.proposer;

  const getExtraDetails = () => {
    let extraDetails = null;
    if (type === "parameterChangeProposal") {
      extraDetails = (
        <>
          <Typography variant="body1" className="label">
            {t("changes")}
          </Typography>
          {R.pathOr([], ["changes"], content).length > 0 ? (
            <ParamsChange
              changes={R.pathOr([], ["changes"], content)}
            />
          ) : (
            <ParamsChangeV5 content={content} />
          )}
        </>
      );
    } else if (type === "softwareUpgradeProposal") {
      extraDetails = (
        <>
          <Typography variant="body1" className="label">
            {t("plan")}
          </Typography>
          <SoftwareUpgrade
            height={R.pathOr("0", ["plan", "height"], content)}
            info={R.pathOr("", ["plan", "info"], content)}
            name={R.pathOr("", ["plan", "name"], content)}
          />
        </>
      );
    }

    return extraDetails;
  };

  const extra = getExtraDetails();

  return (
    <Box className={classnames(className, classes.root)}>
      <SingleProposal
        id={`#${numeral(overview.id).format("0,0")}`}
        title={overview.title}
        status={overview.status}
      />
      <Divider />
      <div className={classes.content}>
        <Typography variant="body1" className="label">
          {t("type")}
        </Typography>
        <Typography variant="body1" className="value">
          {t(type)}
        </Typography>
        <Typography variant="body1" className="label">
          {t("proposer")}
        </Typography>
        <Name name={proposerMoniker} address={proposer.address} />
        {!!overview.submitTime && (
          <>
            <Typography variant="body1" className="label">
              {t("submitTime")}
            </Typography>
            <Typography variant="body1" className="value">
              {formatDayJs(dayjs.utc(overview.submitTime), dateFormat)}
            </Typography>
          </>
        )}
        {!!overview.depositEndTime && (
          <>
            <Typography variant="body1" className="label">
              {t("depositEndTime")}
            </Typography>
            <Typography variant="body1" className="value">
              {formatDayJs(dayjs.utc(overview.depositEndTime), dateFormat)}
            </Typography>
          </>
        )}
        {!!overview.votingStartTime && (
          <>
            <Typography variant="body1" className="label">
              {t("votingStartTime")}
            </Typography>
            <Typography variant="body1" className="value">
              {formatDayJs(dayjs.utc(overview.votingStartTime), dateFormat)}
            </Typography>
          </>
        )}
        {!!overview.votingEndTime && (
          <>
            <Typography variant="body1" className="label">
              {t("votingEndTime")}
            </Typography>
            <Typography variant="body1" className="value">
              {formatDayJs(dayjs.utc(overview.votingEndTime), dateFormat)}
            </Typography>
          </>
        )}
        <Typography variant="body1" className="label">
          {t("description")}
        </Typography>
        <Markdown markdown={overview.description} />
        {type === "communityPoolSpendProposal" && (() => {
          const recipient = useProfileRecoil(content.recipient);
          const recipientMoniker = recipient ? recipient?.name : content.recipient;

          const contentAmount = content.amount[0];
          const amount = formatNumber(formatTokenByExponent(contentAmount.amount, 6));
          console.log(amount);
          return (
            <>
              <Typography variant="body1" className="label">
                {t("recipient")}
              </Typography>
              <Name name={recipientMoniker} address={content.recipient} />
              <Typography variant="body1" className="label">
                {t("amount")}
              </Typography>
              <Typography variant='body1' className='value'>
                {`${amount} FCT`}
              </Typography>
            </>
          );
        })()}
        {extra}
      </div>
    </Box>
  );
};

export default Overview;
