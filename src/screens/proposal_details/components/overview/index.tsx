import React from 'react';
import { Box, SingleProposal } from '@components';
import { Divider } from '@mui/material';
import classnames from 'classnames';
import numeral from 'numeral';

import type { OverviewType } from '../../types';
import MessagesSection from './components/messages_section';
import MetadataSection from './components/metadata_section';
import { useOverviewState } from './hooks/use_overview_state';

const Overview: React.FC<{ overview: OverviewType } & ComponentDefault> = ({ className, overview }) => {
    const classes = {
        content: 'overview-content',
        messageList: 'message-list',
        messageSection: 'message-section',
        messageHeader: 'message-header',
        messagePillTag: 'message-pill-tag',
        messagePill: 'message-pill',
        messageChevron: 'message-chevron',
        messageChevronOpen: 'message-chevron-open',
        labelValueRow: 'label-value-row',
        labelValueRowLabel: 'label-value-row-label',
        messageBodyTableWrap: 'message-body-table-wrap',
        messageBodyContentCell: 'message-body-content-cell',
        messageBodyBlock: 'message-body-block',
        messageBodyBlockCompact: 'message-body-block-compact'
    };
    const { messageGroups, hasMessageContent, overviewType, openStates, toggleOpen } = useOverviewState(overview);

    return (
        <Box
            className={classnames(className)}
            sx={(theme) => ({
                '& .label': { color: theme.palette.custom.fonts.fontThree },
                '& .overview-content': {
                    marginTop: theme.spacing(2),
                    display: 'grid',
                    '& > *': {
                        marginBottom: theme.spacing(1),
                        [theme.breakpoints.up('lg')]: { marginBottom: theme.spacing(2) }
                    },
                    [theme.breakpoints.up('lg')]: { gridTemplateColumns: '200px auto' }
                },
                '& .message-list': { display: 'flex', flexDirection: 'column', gap: theme.spacing(2) },
                '& .message-section': { border: `2px solid ${theme.palette.divider}`, borderRadius: '12px', overflow: 'hidden' },
                '& .message-header': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: theme.spacing(2),
                    cursor: 'pointer',
                    backgroundColor: theme.palette.custom?.general?.surfaceTwo || theme.palette.background.paper,
                    '&:hover': { backgroundColor: theme.palette.action.hover }
                },
                '& .message-pill-tag': { flexShrink: 0, borderRadius: '9999px !important' },
                '& .message-pill': {
                    display: 'inline-block',
                    p: theme.spacing(0.75, 1.5),
                    borderRadius: '9999px !important',
                    overflow: 'hidden',
                    fontSize: '0.875rem',
                    color: theme.palette.custom?.fonts?.fontTwo,
                    background: theme.palette.custom?.tags?.zero ? `${theme.palette.custom.tags.zero}33` : 'rgba(103, 126, 166, 0.25)'
                },
                '& .message-chevron': { color: theme.palette.custom.fonts.fontThree, transition: 'transform 0.2s' },
                '& .message-chevron-open': { transform: 'rotate(-90deg)' },
                '& .label-value-row': {
                    display: 'grid',
                    gridTemplateColumns: '200px 1fr',
                    gap: theme.spacing(1, 2),
                    alignItems: 'start',
                    marginBottom: theme.spacing(2),
                    '& > *:first-of-type': { width: 'fit-content' },
                    [theme.breakpoints.down('lg')]: { gridTemplateColumns: '1fr' }
                },
                '& .label-value-row-label': {
                    transform: `translateX(${theme.spacing(2)}px) translateY(${theme.spacing(1.5)}px)`
                },
                '& .message-body-table-wrap': { width: '100%', minWidth: 0, overflowX: 'auto' },
                '& .message-body-content-cell': { width: '100%', minWidth: 0, minHeight: 100 },
                '& .message-body-block': { width: '100%', minWidth: 0, minHeight: 100 },
                '& .message-body-block-compact': { width: '100%', minWidth: 0 }
            })}
        >
            <SingleProposal id={`#${numeral(overview.id).format('0,0')}`} title={overview.title} status={overview.status} />
            <Divider />
            <MetadataSection overview={overview} overviewType={overviewType} classes={classes} />
            {hasMessageContent && (
                <>
                    <Divider />
                    <MessagesSection messageGroups={messageGroups} openStates={openStates} toggleOpen={toggleOpen} classes={classes} />
                </>
            )}
        </Box>
    );
};

export default Overview;
