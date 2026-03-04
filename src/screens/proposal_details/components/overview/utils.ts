import * as R from "ramda";
import { getProposalType } from "../../utils";
import type { OverviewType } from "../../types";
import type { MsgCommunityPoolSpendContent, MsgUpdateParamsContent } from "../../types";
import { KNOWN_GOV_TYPES } from "./constants";

/** Normalize overview.content (API may return [] or ''; hooks may pass '' when missing) */
export const toContentArray = (
  raw: OverviewType["content"] | string
): (OverviewType["content"][number] | string)[] =>
  Array.isArray(raw) ? raw : [raw];

export const hasParams = (c: unknown): c is MsgUpdateParamsContent =>
  typeof c === "object" && c !== null && "params" in c;

export const isCommunityPoolSpendItem = (c: unknown): c is MsgCommunityPoolSpendContent =>
  typeof c === "object" && c !== null && "recipient" in c && "amount" in c;

/** MsgExec (authz) with nested msgs */
export const isMsgExecItem = (c: unknown): c is { "@type": string; msgs?: unknown[] } =>
  typeof c === "object" &&
  c !== null &&
  "msgs" in c &&
  Array.isArray((c as { msgs?: unknown[] }).msgs);

/** From MsgExec.msgs, collect MsgSend rows as { fromAddress, toAddress, amount } for table display */
export const getExecSendRecipients = (
  items: OverviewType["content"][number][]
): { fromAddress: string; toAddress: string; amount: string }[] => {
  const rows: { fromAddress: string; toAddress: string; amount: string }[] = [];
  for (const item of items) {
    if (!isMsgExecItem(item)) continue;
    const msgs = (item as { msgs?: unknown[] }).msgs ?? [];
    for (const msg of msgs) {
      const m = msg as Record<string, unknown>;
      if (typeof m !== "object" || m === null) continue;
      const type = (m["@type"] as string) ?? "";
      if (!type.endsWith(".MsgSend")) continue;
      const fromAddress = (m.from_address as string) ?? "";
      const toAddress = (m.to_address as string) ?? "";
      const amountArr = (m.amount as { amount?: string }[]) ?? [];
      const amount = amountArr[0]?.amount ?? "0";
      if (toAddress) rows.push({ fromAddress, toAddress, amount });
    }
  }
  return rows;
};

export type OverviewDisplayType =
  | "textProposal"
  | "parameterChangeProposal"
  | "softwareUpgradeProposal"
  | "communityPoolSpendProposal"
  | "multiple"
  | "msgExec"
  | "other";

/**
 * Single display type for overview header: "multiple" when >1 message or mixed types.
 */
export const getOverviewDisplayType = (
  messageItems: OverviewType["content"][number][]
): OverviewDisplayType => {
  if (messageItems.length === 0) return "textProposal";
  const contentTypes = messageItems.map((c) =>
    getProposalType(R.pathOr("", ["@type"], c) as string)
  );
  const uniqueTypes = [...new Set(contentTypes.filter(Boolean))];
  if (messageItems.length > 1 || uniqueTypes.length > 1) return "multiple";
  const first = uniqueTypes[0];
  return (KNOWN_GOV_TYPES as readonly string[]).includes(first) ? (first as OverviewDisplayType) : "other";
};

export const getMessageDisplayType = (
  content: OverviewType["content"][number]
): OverviewDisplayType => {
  const typeLabel = getProposalType(R.pathOr("", ["@type"], content) as string);
  return (KNOWN_GOV_TYPES as readonly string[]).includes(typeLabel) ? (typeLabel as OverviewDisplayType) : "other";
};

export type MessageGroup = {
  displayType: OverviewDisplayType;
  items: OverviewType["content"][number][];
};

/** Group messages by same type (one section + table when duplicates) */
export const getMessageGroups = (
  messageItems: OverviewType["content"][number][]
): MessageGroup[] => {
  const byType = new Map<OverviewDisplayType, OverviewType["content"][number][]>();
  for (const item of messageItems) {
    const type = getMessageDisplayType(item);
    const list = byType.get(type) ?? [];
    list.push(item);
    byType.set(type, list);
  }
  return [...byType.entries()].map(([displayType, items]) => ({ displayType, items }));
};
