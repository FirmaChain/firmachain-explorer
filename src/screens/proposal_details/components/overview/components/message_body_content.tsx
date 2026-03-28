import React from 'react';
import { formatNumber, formatTokenByExponent } from '@/utils/format_token';
import { Markdown, Name } from '@components';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { useProfilesRecoil } from '@recoil/profiles';
import * as R from 'ramda';

import type { MsgUpdateParamsContent, OverviewType } from '../../../types';
import { getProposalType } from '../../../utils';
import { getExecSendRecipients, hasParams, isCommunityPoolSpendItem, isMsgExecItem } from '../utils';
import CommunityPoolSpend from './community_pool_spend';
import ParamsChange from './params_change';
import ParamsChangeV5 from './params_change_v5';
import SoftwareUpgrade from './software_upgrade';

type ParamChangeRow = { subspace: string; key: string; value: string };

const getChanges = (content: OverviewType['content'][number]): ParamChangeRow[] => R.pathOr([], ['changes'], content) as ParamChangeRow[];

type Props =
    | {
          content: OverviewType['content'][number];
          items?: undefined;
          classes?: Record<string, string>;
      }
    | {
          content?: undefined;
          items: OverviewType['content'][number][];
          classes?: Record<string, string>;
      };

function ParamsChangeBlock({ content, classes }: { content: OverviewType['content'][number]; classes: Record<string, string> }) {
    console.log('------------------------------------------------------');
    console.log(content);
    console.log('------------------------------------------------------');
    const changes = getChanges(content);
    console.log('------------------------------------------------------');
    console.log(changes);
    console.log('------------------------------------------------------');
    return (
        <div className={classes.messageBodyBlock ?? ''}>
            {changes.length > 0 && <ParamsChange changes={changes} />}
            {changes.length === 0 && hasParams(content) && <ParamsChangeV5 content={content as MsgUpdateParamsContent} />}
        </div>
    );
}

function TextProposalBlock({ content, classes }: { content: OverviewType['content'][number]; classes: Record<string, string> }) {
    const title = R.pathOr('', ['title'], content) as string;
    const description = R.pathOr('', ['description'], content) as string;
    if (!title && !description) return null;
    return (
        <div className={classes.messageBodyBlockCompact ?? ''}>
            {title && (
                <Typography variant="body1" component="h3" style={{ marginBottom: 8 }}>
                    {title}
                </Typography>
            )}
            {description && <Markdown markdown={description} />}
        </div>
    );
}

function SoftwareUpgradeBlock({ content, classes }: { content: OverviewType['content'][number]; classes: Record<string, string> }) {
    return (
        <div className={classes.messageBodyBlockCompact ?? ''}>
            <SoftwareUpgrade
                height={R.pathOr('0', ['plan', 'height'], content)}
                info={R.pathOr('', ['plan', 'info'], content)}
                name={R.pathOr('', ['plan', 'name'], content)}
            />
        </div>
    );
}

type ExecSendRow = { fromAddress: string; toAddress: string; amount: string };

function ExecSendTable({ rows, tableWrapClassName }: { rows: ExecSendRow[]; tableWrapClassName: string }) {
    const addresses = rows.flatMap((r) => [r.fromAddress, r.toAddress]);
    const profiles = useProfilesRecoil(addresses);

    return (
        <div className={tableWrapClassName} style={{ overflowX: 'auto' }}>
            <Table
                style={{
                    tableLayout: 'fixed',
                    width: '100%',
                    minWidth: 360,
                    minHeight: 100
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '35%' }}>From Address</TableCell>
                        <TableCell style={{ width: '35%' }}>To Address</TableCell>
                        <TableCell style={{ width: '30%' }}>Amount</TableCell>
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
                                <TableCell style={{ width: '35%' }}>
                                    <Name name={fromName} address={row.fromAddress} />
                                </TableCell>
                                <TableCell style={{ width: '35%' }}>
                                    <Name name={toName} address={row.toAddress} />
                                </TableCell>
                                <TableCell style={{ width: '30%' }}>{`${amountStr} FCT`}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

const MessageBodyContent: React.FC<Props> = (props) => {
    const items = props.items ?? (props.content ? [props.content] : []);
    const firstItem = items[0];
    const contentType = firstItem ? getProposalType(R.pathOr('', ['@type'], firstItem) as string) : '';

    if (items.length === 0) return null;

    const classes = props.classes ?? {};

    if (firstItem && isCommunityPoolSpendItem(firstItem)) {
        const recipients = items.filter(isCommunityPoolSpendItem).map((c) => ({
            address: c.recipient,
            amount: c.amount[0]?.amount ?? '0'
        }));
        return (
            <div className={classes.messageBodyContentCell ?? ''}>
                <CommunityPoolSpend recipients={recipients} />
            </div>
        );
    }

    if (contentType === 'parameterChangeProposal') {
        return (
            <>
                {items.map((content, idx) => (
                    <ParamsChangeBlock key={idx} content={content} classes={classes} />
                ))}
            </>
        );
    }

    if (contentType === 'softwareUpgradeProposal') {
        return (
            <>
                {items.map((content, idx) => (
                    <SoftwareUpgradeBlock key={idx} content={content} classes={classes} />
                ))}
            </>
        );
    }

    if (contentType === 'textProposal') {
        return (
            <>
                {items.map((content, idx) => (
                    <TextProposalBlock key={idx} content={content} classes={classes} />
                ))}
            </>
        );
    }

    if (items.some(isMsgExecItem)) {
        const rows = getExecSendRecipients(items);
        if (rows.length > 0) {
            return (
                <div className={classes.messageBodyContentCell ?? ''}>
                    <ExecSendTable rows={rows} tableWrapClassName={classes.messageBodyTableWrap ?? ''} />
                </div>
            );
        }
    }

    return null;
};

export default MessageBodyContent;
