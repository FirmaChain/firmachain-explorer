import * as R from 'ramda';

import { getTagInfoByType } from '@/components/msg/tag_map';

import type { MsgCommunityPoolSpendContent, MsgUpdateParamsContent, OverviewType } from '../../types';
import { getProposalType } from '../../utils';
import { KNOWN_GOV_TYPES } from './constants';

/** Parse JSON string to object or array; returns null on failure */
function safeParseJson(s: string): unknown {
    try {
        return JSON.parse(s);
    } catch {
        return null;
    }
}

/** Normalize overview.content: [] | '' | JSON string | single object → content object array */
export const toContentArray = (raw: OverviewType['content'] | string | unknown): OverviewType['content'][number][] => {
    if (raw === null || raw === undefined || raw === '') {
        return [];
    }
    if (typeof raw === 'string') {
        const parsed = safeParseJson(raw);
        if (parsed === null) return [];
        if (Array.isArray(parsed)) {
            return parsed.filter((c): c is OverviewType['content'][number] => typeof c === 'object' && c !== null);
        }
        return [parsed as OverviewType['content'][number]];
    }
    if (Array.isArray(raw)) {
        const expanded = raw.flatMap((item) => {
            if (typeof item === 'string') {
                const parsed = safeParseJson(item);
                if (parsed === null) return [];
                if (Array.isArray(parsed)) return parsed;
                return [parsed];
            }
            return item !== null && typeof item === 'object' ? [item] : [];
        });
        return expanded as OverviewType['content'][number][];
    }
    return [raw as OverviewType['content'][number]];
};

export const hasParams = (c: unknown): c is MsgUpdateParamsContent => typeof c === 'object' && c !== null && 'params' in c;
export const isCommunityPoolSpendItem = (c: unknown): c is MsgCommunityPoolSpendContent =>
    typeof c === 'object' && c !== null && 'recipient' in c && 'amount' in c;

/** MsgExec (authz) with nested msgs */
export const isMsgExecItem = (c: unknown): c is { '@type': string; msgs?: unknown[] } => {
    const withMsgs = c as { msgs?: unknown[] };
    return typeof c === 'object' && c !== null && 'msgs' in c && Array.isArray(withMsgs.msgs);
};

/** From MsgExec.msgs, collect MsgSend rows as { fromAddress, toAddress, amount } for table */
const msgToRow = (msg: unknown): { fromAddress: string; toAddress: string; amount: string } | null => {
    const m = msg as Record<string, unknown>;
    if (typeof m !== 'object' || m === null) return null;
    const type = (m['@type'] as string) ?? '';
    if (!type.endsWith('.MsgSend')) return null;
    const toAddress = (m.to_address as string) ?? '';
    if (!toAddress) return null;
    const fromAddress = (m.from_address as string) ?? '';
    const amountArr = (m.amount as { amount?: string }[]) ?? [];
    const amount = amountArr[0]?.amount ?? '0';
    return {
        fromAddress,
        toAddress,
        amount
    };
};

export const getExecSendRecipients = (
    items: OverviewType['content'][number][]
): { fromAddress: string; toAddress: string; amount: string }[] => {
    return items
        .filter(isMsgExecItem)
        .flatMap((item) => (item as { msgs?: unknown[] }).msgs ?? [])
        .map(msgToRow)
        .filter(
            (
                row
            ): row is {
                fromAddress: string;
                toAddress: string;
                amount: string;
            } => row !== null
        );
};

export type OverviewDisplayType =
    | 'textProposal'
    | 'parameterChangeProposal'
    | 'softwareUpgradeProposal'
    | 'communityPoolSpendProposal'
    | 'multiple'
    | 'authzExec'
    | 'other';

/**
 * Single display type for overview header: "multiple" when >1 message or mixed types.
 */
export const getOverviewDisplayType = (messageItems: OverviewType['content'][number][]): OverviewDisplayType => {
    if (messageItems.length === 0) return 'textProposal';
    const contentTypes = messageItems.map((c) => getProposalType(R.pathOr('', ['@type'], c) as string));
    const uniqueTypes = [...new Set(contentTypes.filter(Boolean))];
    if (messageItems.length > 1 || uniqueTypes.length > 1) return 'multiple';
    const first = uniqueTypes[0];
    return (KNOWN_GOV_TYPES as readonly string[]).includes(first) ? (first as OverviewDisplayType) : 'other';
};

export const getMessageDisplayType = (content: OverviewType['content'][number]): OverviewDisplayType => {
    const typeLabel = getProposalType(R.pathOr('', ['@type'], content) as string);
    return (KNOWN_GOV_TYPES as readonly string[]).includes(typeLabel) ? (typeLabel as OverviewDisplayType) : 'other';
};

export type NestedMsgSummary = {
    typeStr: string;
    tagDisplay: string;
    tagTheme: string;
    count: number;
};

/** Extract nested msg type summaries from MsgExec items with tag info from the global mapping */
export const getExecNestedTypeSummary = (items: OverviewType['content'][number][]): NestedMsgSummary[] => {
    const msgs = items.filter(isMsgExecItem).flatMap((item) => (item as { msgs?: unknown[] }).msgs ?? []);
    const grouped = new Map<string, { tagDisplay: string; tagTheme: string; count: number }>();
    msgs.forEach((msg) => {
        const m = msg as Record<string, unknown>;
        const typeStr = (m?.['@type'] as string) ?? '';
        if (!grouped.has(typeStr)) {
            const info = getTagInfoByType(typeStr);
            grouped.set(typeStr, {
                ...info,
                count: 0
            });
        }
        grouped.get(typeStr)!.count += 1;
    });
    return [...grouped.entries()].map(([typeStr, data]) => ({
        typeStr,
        ...data
    }));
};

export type MessageGroup = {
    displayType: OverviewDisplayType;
    items: OverviewType['content'][number][];
};

/** Group messages by same type (one section + table when duplicates) */
export const getMessageGroups = (messageItems: OverviewType['content'][number][]): MessageGroup[] => {
    const byType = messageItems.reduce((acc, item) => {
        const type = getMessageDisplayType(item);
        const list = acc.get(type) ?? [];
        list.push(item);
        acc.set(type, list);
        return acc;
    }, new Map<OverviewDisplayType, OverviewType['content'][number][]>());
    return [...byType.entries()].map(([displayType, items]) => ({
        displayType,
        items
    }));
};
