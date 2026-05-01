import React from 'react';
import { OtherTokenType } from '@/screens/account_details/types';
import { ibcConfig, tokenConfig } from '@configs';
import { Box } from '@mui/material';
import { formatNumber } from '@utils/format_token';
import Big from 'big.js';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

const Desktop: React.FC<{
    className?: string;
    items?: OtherTokenType[];
}> = ({ className, items = [] }) => {
    const { t } = useTranslation('accounts');

    const columns: DataTableColumn<OtherTokenType>[] = [
        {
            key: 'token',
            header: t('token'),
            width: 180,
            render: (row) => {
                if (tokenConfig[row.denom]) {
                    return tokenConfig[row.denom].display.toUpperCase();
                }

                if (ibcConfig[row.denom]) {
                    return ibcConfig[row.denom].display.toUpperCase();
                }

                return row.denom.toUpperCase();
            }
        },
        {
            key: 'available',
            header: t('available'),
            minWidth: 180,
            align: 'right',
            render: (row) => {
                if (tokenConfig[row.denom]) {
                    return formatNumber(Big(row.available.value).toFixed(tokenConfig[row.denom].exponent), tokenConfig[row.denom].exponent);
                }

                if (ibcConfig[row.denom]) {
                    return formatNumber(Big(row.available.value).toFixed(ibcConfig[row.denom].exponent), ibcConfig[row.denom].exponent);
                }

                return formatNumber(row.available.value, row.available.exponent);
            }
        },
        {
            key: 'reward',
            header: t('reward'),
            minWidth: 180,
            align: 'right',
            render: (row) => formatNumber(row.reward.value, row.reward.exponent)
        },
        {
            key: 'commission',
            header: t('commission'),
            minWidth: 180,
            align: 'right',
            render: (row) => formatNumber(row.commission.value, row.commission.exponent)
        }
    ];

    return (
        <Box className={clsx(className)} sx={{ width: '100%' }}>
            <DataTable data={items} columns={columns} getRowId={(row) => row.denom} />
        </Box>
    );
};

export default Desktop;
