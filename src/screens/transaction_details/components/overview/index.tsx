import React from 'react';
import { BoxDetails, Result } from '@components';
import { Box, Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { formatNumber } from '@utils/format_token';
import { ACCOUNT_DETAILS, BLOCK_DETAILS } from '@utils/go_to_page';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { OverviewType } from '../../types';

const Overview: React.FC<{
    className?: string;
    data: OverviewType;
}> = ({ className, data }) => {
    const { t } = useTranslation('transactions');
    const dateFormat = useSettingsStore(readDate);

    const details = [
        {
            label: t('hash'),
            detail: data.hash
        },
        {
            label: t('height'),
            detail: (
                <Link to={BLOCK_DETAILS(data.height)}>
                    <Typography variant="body1" className="value" component="a">
                        {numeral(data.height).format('0,0')}
                    </Typography>
                </Link>
            )
        },
        {
            label: t('time'),
            detail: formatDayJs(dayjs.utc(data.timestamp), dateFormat)
        },
        {
            label: t('fee'),
            detail: `${formatNumber(data.fee.value, data.fee.exponent)} ${data?.fee?.displayDenom?.toUpperCase()}`
        },
        {
            label: t('feegrant'),
            detail: (
                <Link to={ACCOUNT_DETAILS(data.feeGrant)}>
                    <Typography variant="body1" className="value" component="a">
                        {data.feeGrant}
                    </Typography>
                </Link>
            )
        },
        {
            label: t('gas'),
            detail: `${numeral(data.gasUsed).format('0,0.[00]')} / ${numeral(data.gasWanted).format('0,0.[00]')}`
        },
        {
            label: t('result'),
            detail: <Result success={data.success} />
        },
        {
            className: 'memo',
            label: t('memo'),
            detail: data.memo
        }
    ];

    if (!data.success) {
        details.push({
            className: 'memo',
            label: t('error'),
            detail: data.error
        });
    }

    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                '& .memo': {
                    alignItems: 'flex-start',
                    '& .label': {
                        marginRight: theme.spacing(5)
                    }
                }
            })}
        >
            <BoxDetails title={t('overview')} details={details} />
        </Box>
    );
};

export default Overview;
