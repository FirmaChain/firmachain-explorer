import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { OtherTokenType } from '@/screens/account_details/types';
import { ibcConfig, tokenConfig } from '@configs';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { formatNumber } from '@utils/format_token';
import Big from 'big.js';
import classnames from 'classnames';

import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items?: OtherTokenType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('accounts');

    const formattedItems = items.map((x) => {
        let available = {
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
        <div className={classnames(className)}>
            <Table>
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
