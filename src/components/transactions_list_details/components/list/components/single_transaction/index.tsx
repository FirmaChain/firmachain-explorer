import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const SingleTransaction: React.FC<{
    className?: string;
    block: React.ReactNode;
    hash: React.ReactNode;
    time: string;
    messageCount: string;
    messages: any[];
    result?: React.ReactNode;
}> = ({ className, block, hash, time, messages, result, messageCount }) => {
    const { t } = useTranslation('transactions');

    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                width: '100%',
                '& .timeContainer': {
                    background: theme.palette.custom.general.surfaceTwo,
                    p: theme.spacing(1, 2),
                    color: theme.palette.custom.fonts.fontTwo
                },
                '& .itemContainer': {
                    p: theme.spacing(2, 2, 1)
                },
                '& .itemPrimaryDetailsContainer': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    [theme.breakpoints.up('lg')]: {
                        gridTemplateColumns: 'repeat(4, 1fr)'
                    }
                },
                '& .item': {
                    gridColumn: '1/3',
                    mb: 2,
                    '&.messages, &.result': {
                        gridColumn: 'auto / span 1'
                    },
                    '& .label': {
                        mb: 1,
                        color: theme.palette.custom.fonts.fontThree
                    },
                    '& p.value': {
                        color: theme.palette.custom.fonts.fontTwo
                    },
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    },
                    [theme.breakpoints.up('md')]: {
                        '&.block, &.time': {
                            gridColumn: 'auto / span 1'
                        }
                    },
                    [theme.breakpoints.up('md')]: {
                        gridColumn: 'auto / span 1'
                    }
                },
                '& .msgListContainer': {
                    mt: 3
                },
                '& .msg:not(:last-child)': {
                    mb: 4
                },
                '& .tags': {
                    mb: 2
                }
            })}
        >
            <div className="timeContainer">
                <Typography variant="body1" className="value">
                    {hash}
                </Typography>
            </div>
            <div className="itemContainer">
                <div className="itemPrimaryDetailsContainer">
                    <div className={clsx('item', 'block')}>
                        <Typography variant="h4" className="label">
                            {t('block')}
                        </Typography>
                        {block}
                    </div>
                    <div className={clsx('item', 'time')}>
                        <Typography variant="h4" className="label">
                            {t('time')}
                        </Typography>
                        <Typography variant="body1" className="value">
                            {time}
                        </Typography>
                    </div>
                    <div className={clsx('item', 'messages')}>
                        <Typography variant="h4" className="label">
                            {t('messages')}
                        </Typography>
                        <Typography variant="body1" className="value">
                            {messageCount}
                        </Typography>
                    </div>
                    <div className={clsx('item', 'result')}>
                        <Typography variant="h4" className="label">
                            {t('result')}
                        </Typography>
                        {result}
                    </div>
                </div>
                <Divider />
                <div className="item">
                    <div className="msgListContainer">
                        {messages.map((x, i) => (
                            <div className="msg" key={`${x.type}-${i}`}>
                                <div className="tags">{x.type}</div>
                                {x.message}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default SingleTransaction;
