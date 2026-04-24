import React from 'react';
import { OtherTokenType } from '@/screens/account_details/types';
import { ibcConfig, tokenConfig } from '@configs';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { formatNumber } from '@utils/format_token';
import Big from 'big.js';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items?: OtherTokenType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('accounts');

    const formattedItems = items.map((x) => {
        const available = {
            value: x.available.value,
            exponent: x.available.exponent
        };
        let token = x.denom.toUpperCase();

        if (tokenConfig[x.denom]) {
            token = tokenConfig[x.denom].display.toUpperCase();
            available.value = Big(x.available.value).toFixed(tokenConfig[x.denom].exponent);
            available.exponent = tokenConfig[x.denom].exponent;
        } else if (ibcConfig[x.denom]) {
            token = ibcConfig[x.denom].display.toUpperCase();
            available.value = Big(x.available.value).toFixed(ibcConfig[x.denom].exponent);
            available.exponent = ibcConfig[x.denom].exponent;
        }
        return {
            token,
            commission: formatNumber(x.commission.value, x.commission.exponent),
            available: formatNumber(available.value, available.exponent),
            reward: formatNumber(x.reward.value, x.reward.exponent)
        };
    });

    return (
        <div className={clsx(className)} style={{ width: '100%' }}>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            return (
                                <TableCell key={column.key} align={column.align} style={{ width: `${column.width}%` }}>
                                    {t(column.key)}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formattedItems.map((row, i) => (
                        <TableRow key={`holders-row-${i}`}>
                            {columns.map((column) => {
                                return (
                                    <TableCell
                                        key={`holders-row-${i}-${column.key}`}
                                        align={column.align}
                                        style={{ width: `${column.width}%` }}
                                    >
                                        {row[column.key]}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Desktop;
