import React from "react";
import classnames from "classnames";
import * as R from "ramda";
import { Typography } from "@material-ui/core";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { Name, Tag } from "@components";
import { useProfilesRecoil } from "@recoil/profiles";
import { formatNumber, formatTokenByExponent } from "@src/utils/format_token";
import CommunityPoolSpend from "./community_pool_spend";
import ParamsChange from "./params_change";
import SoftwareUpgrade from "./software_upgrade";
import { getProposalType } from "../../../utils";
import { isCommunityPoolSpendItem, hasParams, isMsgExecItem, getExecSendRecipients } from "../utils";
import type { OverviewType } from "../../../types";
import type { MsgUpdateParamsContent } from "../../../types";
import ParamsChangeV5 from "./params_change_v5";

type ParamChangeRow = { subspace: string; key: string; value: string };

const getChanges = (content: OverviewType["content"][number]): ParamChangeRow[] =>
  R.pathOr([], ["changes"], content) as ParamChangeRow[];

type Props =
  | { content: OverviewType["content"][number]; items?: undefined; classes?: Record<string, string> }
  | { content?: undefined; items: OverviewType["content"][number][]; classes?: Record<string, string> };

function ParamsChangeBlock({
  content,
  classes = {},
}: {
  content: OverviewType["content"][number];
  classes?: Record<string, string>;
}) {
  const { t } = useTranslation("proposals");
  const changes = getChanges(content);
  return (
    <div className={classes.labelValueRow}>
      <Typography variant="body1" className={classnames("label", classes.labelValueRowLabel)}>
        {t("changes")}
      </Typography>
      <div>
        {changes.length > 0 ? (
          <ParamsChange changes={changes} />
        ) : hasParams(content) ? (
          <ParamsChangeV5 content={content as MsgUpdateParamsContent} />
        ) : null}
      </div>
    </div>
  );
}

function SoftwareUpgradeBlock({
  content,
  classes = {},
}: {
  content: OverviewType["content"][number];
  classes?: Record<string, string>;
}) {
  const { t } = useTranslation("proposals");
  return (
    <div className={classes.labelValueRow}>
      <Typography variant="body1" className={classnames("label", classes.labelValueRowLabel)}>
        {t("plan")}
      </Typography>
      <SoftwareUpgrade
        height={R.pathOr("0", ["plan", "height"], content)}
        info={R.pathOr("", ["plan", "info"], content)}
        name={R.pathOr("", ["plan", "name"], content)}
      />
    </div>
  );
}

type ExecSendRow = { fromAddress: string; toAddress: string; amount: string };

function ExecSendTable({
  rows,
  t,
}: {
  rows: ExecSendRow[];
  t: (key: string) => string;
}) {
  const addresses = rows.flatMap((r) => [r.fromAddress, r.toAddress]);
  const profiles = useProfilesRecoil(addresses);

  return (
    <div style={{ overflow: "auto" }}>
      <Table style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "35%" }}>{t("fromAddress")}</TableCell>
            <TableCell style={{ width: "35%" }}>{t("toAddress")}</TableCell>
            <TableCell style={{ width: "30%" }}>{t("amount")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            const fromProfile = profiles[i * 2];
            const toProfile = profiles[i * 2 + 1];
            const fromName = fromProfile?.name ?? row.fromAddress;
            const toName = toProfile?.name ?? row.toAddress;
            const amountStr = formatNumber(formatTokenByExponent(row.amount, 6));
            return (
              <TableRow key={`${row.fromAddress}-${row.toAddress}-${i}`}>
                <TableCell style={{ width: "35%" }}>
                  <Name name={fromName} address={row.fromAddress} />
                </TableCell>
                <TableCell style={{ width: "35%" }}>
                  <Name name={toName} address={row.toAddress} />
                </TableCell>
                <TableCell style={{ width: "30%" }}>{`${amountStr} FCT`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

const MessageBodyContent: React.FC<Props> = (props) => {
  const { t } = useTranslation("proposals");
  const items = props.items ?? (props.content ? [props.content] : []);
  const firstItem = items[0];
  const contentType = firstItem
    ? getProposalType((R.pathOr("", ["@type"], firstItem) as string))
    : "";

  if (items.length === 0) return null;

  if (firstItem && isCommunityPoolSpendItem(firstItem)) {
    const recipients = items
      .filter(isCommunityPoolSpendItem)
      .map((c) => ({ address: c.recipient, amount: c.amount[0]?.amount ?? "0" }));
    return <CommunityPoolSpend recipients={recipients} />;
  }

  const classes = props.classes ?? {};

  if (contentType === "parameterChangeProposal") {
    return (
      <>
        {items.map((content, idx) => (
          <ParamsChangeBlock key={idx} content={content} classes={classes} />
        ))}
      </>
    );
  }

  if (contentType === "softwareUpgradeProposal") {
    return (
      <>
        {items.map((content, idx) => (
          <SoftwareUpgradeBlock key={idx} content={content} classes={classes} />
        ))}
      </>
    );
  }

  // MsgExec (authz): render nested MsgSend as table (From / To / Amount), Send label on left (same pill as Msg Exec)
  if (items.some(isMsgExecItem)) {
    const rows = getExecSendRecipients(items);
    if (rows.length > 0) {
      const sendLabel = rows.length > 1 ? `${t("send")} (${rows.length})` : t("send");
      return (
        <div className={classes.labelValueRow}>
          <Tag
            value={sendLabel}
            theme="two"
            className={classnames(classes.labelValueRowLabel, classes.messagePillTag)}
          />
          <ExecSendTable rows={rows} t={t} />
        </div>
      );
    }
  }

  return null;
};

export default MessageBodyContent;
