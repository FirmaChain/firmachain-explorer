import React from 'react';
import { Box, TransactionMessagesFilter } from '@components';
import { useList, useListRow } from '@hooks';
import { Divider, FormControlLabel, Switch, Typography } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { List, type RowComponentProps } from 'react-window';

import { getMessageByType } from '@/components/msg/utils';

type MessageItem = {
    type: React.ReactNode;
    message: React.ReactNode;
};

type RowProps = {
    items: MessageItem[];
    setRowHeight: (_index: number, _size: number) => void;
};

type MessagesProps = {
    className?: string;
    messages: any[];
    viewRaw: boolean;
    toggleMessageDisplay: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onMessageFilterCallback: (value: string) => void;
};

function useElementSize<T extends HTMLElement>() {
    const ref = React.useRef<T | null>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updateSize = () => {
            const rect = element.getBoundingClientRect();

            setSize((prev) => {
                const next = {
                    width: Math.ceil(rect.width),
                    height: Math.ceil(rect.height)
                };

                if (prev.width === next.width && prev.height === next.height) {
                    return prev;
                }

                return next;
            });
        };

        updateSize();

        const observer = new ResizeObserver(() => {
            updateSize();
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return { ref, size };
}

const MessageRow = ({ index, style, items, setRowHeight }: RowComponentProps<RowProps>) => {
    const { rowRef } = useListRow(index, setRowHeight);
    const item = items[index];
    const isLast = index === items.length - 1;

    return (
        <div style={style}>
            <div ref={rowRef}>
                <Box className="item" sx={{ py: 2 }}>
                    <div className="tags">{item.type}</div>
                    <span className="msg">{item.message}</span>
                </Box>
                {!isLast && <Divider />}
            </div>
        </div>
    );
};

const Messages: React.FC<MessagesProps> = ({ className, ...props }) => {
    const { t } = useTranslation('transactions');
    const hasMessages = props.messages.length > 0;
    const useVirtualizedList = props.messages.length > 20;

    const { listRef, getRowHeight, setRowHeight } = useList();
    const { ref, size } = useElementSize<HTMLDivElement>();

    const formattedItems = React.useMemo<MessageItem[]>(() => {
        return props.messages.map((x) => getMessageByType(x, props.viewRaw, t));
    }, [props.messages, props.viewRaw, t]);

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
                <div className="list" ref={ref}>
                    {size.width > 0 && size.height > 0 ? (
                        <List<RowProps>
                            className="List"
                            listRef={listRef}
                            rowCount={formattedItems.length}
                            rowHeight={getRowHeight}
                            rowComponent={MessageRow}
                            rowProps={{
                                items: formattedItems,
                                setRowHeight
                            }}
                            style={{
                                width: size.width,
                                height: size.height
                            }}
                        />
                    ) : null}
                </div>
            )}

            {hasMessages && !useVirtualizedList && (
                <div className="list" style={{ height: 'auto', flex: '0 0 auto' }}>
                    {formattedItems.map((selectedItem, index) => (
                        <div key={`msg-row-${index}`}>
                            <Box className="item" sx={{ py: 2, minHeight: 48, mt: 2 }}>
                                <div className="tags">{selectedItem.type}</div>
                                <span className="msg">{selectedItem.message}</span>
                            </Box>
                            {index !== formattedItems.length - 1 && <Divider />}
                        </div>
                    ))}
                </div>
            )}
        </Box>
    );
};

export default Messages;
