import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { AvatarName } from '@components';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { formatNumber } from '@utils/format_token';
import classnames from 'classnames';

import { ItemType } from '../../types';
import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items?: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('accounts');
    const formattedItems = items.map((x) => {
        const amount = formatNumber(x.amount.value, x.amount.exponent);
        const reward = formatNumber(x.reward.value, x.reward.exponent);
        return {
            validator: <AvatarName name={x.validator.name} address={x.validator.address} imageUrl={x.validator.imageUrl} />,
            amount: `${amount} ${x.amount.displayDenom.toUpperCase()}`,
            reward: `${reward} ${x.reward.displayDenom.toUpperCase()}`
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
