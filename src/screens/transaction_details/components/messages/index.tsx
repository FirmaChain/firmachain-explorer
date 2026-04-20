import React from 'react';
import { Box, TransactionMessagesFilter } from '@components';
import { useList, useListRow } from '@hooks';
import { getMessageByType } from '@msg';
import { Divider, FormControlLabel, Switch, Typography } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';

const MessageRow: React.FC<{
    index: number;
    style: React.CSSProperties;
    setRowHeight: (_index: number, _size: number) => void;
    item: {
        type: React.ReactNode;
        message: React.ReactNode;
    };
    isLast: boolean;
}> = ({ index, style, setRowHeight, item, isLast }) => {
    const { rowRef } = useListRow(index, setRowHeight);

    return (
        <div style={style}>
            <div ref={rowRef}>
                <div className="item">
                    <div className="tags">{item.type}</div>
                    <span className="msg">{item.message}</span>
                </div>
                {!isLast && <Divider />}
            </div>
        </div>
    );
};

const Messages: React.FC<{
    className?: string;
    messages: any[];
    viewRaw: boolean;
    toggleMessageDisplay: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onMessageFilterCallback: (value: string) => void;
}> = ({ className, ...props }) => {
    const { t } = useTranslation('transactions');
    const hasMessages = props.messages.length > 0;
    const useVirtualizedList = props.messages.length > 20;

    const { listRef, getRowHeight, setRowHeight } = useList();

    const formattedItems = props.messages.map((x) => {
        return getMessageByType(x, props.viewRaw, t);
    });

    return (
        <Box
            className={classnames(className)}
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                minHeight: useVirtualizedList ? { xs: '500px', lg: '650px' } : 'auto',
                height: useVirtualizedList ? { xs: '50vh', lg: '40vh' } : 'auto',
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
                '& .item': {
                    margin: theme.spacing(2, 0),
                    [theme.breakpoints.up('lg')]: {
                        display: 'flex',
                        padding: theme.spacing(0, 2),
                        '& .msg': {
                            mt: 0.5
                        }
                    }
                },
                '& .tags': {
                    mb: 2,
                    [theme.breakpoints.up('lg')]: {
                        minWidth: '200px',
                        mb: 0,
                        pr: 2,
                        alignSelf: 'flex-start'
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
            {hasMessages && useVirtualizedList && (
                <div className="list">
                    <AutoSizer>
                        {({ height, width }) => {
                            return (
                                <List
                                    className="List"
                                    height={height}
                                    itemCount={props.messages.length}
                                    itemSize={getRowHeight}
                                    ref={listRef}
                                    width={width}
                                >
                                    {({ index, style }) => {
                                        const selectedItem = formattedItems[index];
                                        return (
                                            <MessageRow
                                                index={index}
                                                style={style}
                                                setRowHeight={setRowHeight}
                                                item={selectedItem}
                                                isLast={index === props.messages.length - 1}
                                            />
                                        );
                                    }}
                                </List>
                            );
                        }}
                    </AutoSizer>
                </div>
            )}
            {hasMessages && !useVirtualizedList && (
                <div className="list" style={{ height: 'auto', flex: '0 0 auto' }}>
                    {formattedItems.map((selectedItem, index) => (
                        <div key={`msg-row-${index}`}>
                            <div className="item">
                                <div className="tags">{selectedItem.type}</div>
                                <span className="msg">{selectedItem.message}</span>
                            </div>
                            {index !== formattedItems.length - 1 && <Divider />}
                        </div>
                    ))}
                </div>
            )}
        </Box>
    );
};

export default Messages;
