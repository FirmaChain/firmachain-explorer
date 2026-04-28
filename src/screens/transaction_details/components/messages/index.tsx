import React from 'react';
import { Box, TransactionMessagesFilter } from '@components';
import { Divider, FormControlLabel, Switch, Typography } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { getMessageByType } from '@/components/msg/utils';

type MessageItem = {
    id: string;
    type: React.ReactNode;
    message: React.ReactNode;
};

type MessagesProps = {
    className?: string;
    messages: any[];
    viewRaw: boolean;
    toggleMessageDisplay: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onMessageFilterCallback: (value: string) => void;
};

const Messages: React.FC<MessagesProps> = ({ className, ...props }) => {
    const { t } = useTranslation('transactions');
    const hasMessages = props.messages.length > 0;
    const formattedItems: MessageItem[] = props.messages.map((x, index) => ({
        id: `msg-row-${index}`,
        ...getMessageByType(x, props.viewRaw, t)
    }));
    const columns: DataTableColumn<MessageItem>[] = [
        {
            key: 'type',
            header: t('type'),
            width: 200,
            render: (row) => <div className="tags">{row.type}</div>
        },
        {
            key: 'message',
            header: t('messages'),
            grow: 1,
            minWidth: 0,
            render: (row) => <span className="msg">{row.message}</span>
        }
    ];

    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                minHeight: { xs: '500px', lg: '650px' },
                height: { xs: '50vh', lg: '40vh' },
                '& .desktopOptions': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: theme.spacing(1.5),
                    '& .MuiFormControlLabel-root': {
                        display: 'none',
                        [theme.breakpoints.up('md')]: {
                            display: 'inline-flex'
                        }
                    }
                },
                '& .mobileOptions': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 2,
                    '& .MuiFormControlLabel-root': {
                        mr: 0,
                        [theme.breakpoints.up('md')]: {
                            display: 'none'
                        }
                    },
                    [theme.breakpoints.up('md')]: {
                        pb: 0
                    }
                },
                '& .header': {
                    pb: 2,
                    [theme.breakpoints.up('md')]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                },
                '& .filter': {
                    width: '100%',
                    [theme.breakpoints.up('md')]: {
                        width: 'auto',
                        minWidth: '220px'
                    }
                },
                '& .list': {
                    height: '100%',
                    flex: 1,
                    minHeight: 0
                },
                '& [data-datatable-row="true"]': {
                    height: 'auto',
                    minHeight: '72px',
                    alignItems: 'stretch',
                    borderBottom: `1px solid ${theme.palette.divider}`
                },
                '& [data-datatable-row="true"] > div': {
                    alignItems: 'flex-start',
                    py: 2
                },
                '& .tags': {
                    [theme.breakpoints.up('lg')]: {
                        pr: 2
                    }
                },
                '& .msg': {
                    display: 'block',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    [theme.breakpoints.up('lg')]: {
                        mt: 0.5
                    }
                }
            })}
        >
            <div className="header">
                <div className="mobileOptions">
                    <Typography variant="h2">{t('messages')}</Typography>
                    <FormControlLabel
                        control={<Switch checked={props.viewRaw} onChange={props.toggleMessageDisplay} color="primary" />}
                        label={t('raw')}
                    />
                </div>
                <div className="desktopOptions">
                    <FormControlLabel
                        control={<Switch checked={props.viewRaw} onChange={props.toggleMessageDisplay} color="primary" />}
                        label={t('raw')}
                    />
                    <TransactionMessagesFilter className="filter" callback={props.onMessageFilterCallback} />
                </div>
            </div>

            <Divider />

            {hasMessages && (
                <div className="list">
                    <DataTable
                        data={formattedItems}
                        columns={columns}
                        getRowId={(row) => row.id}
                        height="100%"
                        hideHeader
                        rowHeight={72}
                    />
                </div>
            )}
        </Box>
    );
};

export default Messages;
