import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { formatNumber } from '@/utils/format_token';
import { AvatarName } from '@components';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { readDate } from '@recoil/settings';
import dayjs, { formatDayJs } from '@utils/dayjs';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';

import { ItemType } from '../../types';
import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('accounts');
    const dateFormat = useRecoilValue(readDate);
    const formattedItems = items.map((x) => {
        return {
            validator: <AvatarName address={x.validator.address} imageUrl={x.validator.imageUrl} name={x.validator.name} />,
            amount: `${formatNumber(x.amount.value, x.amount.exponent)} ${x.amount.displayDenom.toUpperCase()}`,
            completionTime: formatDayJs(dayjs.utc(x.completionTime), dateFormat)
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
                                const selected = row[column.key];
                                return (
                                    <TableCell
                                        key={`holders-row-${i}-${column.key}`}
                                        align={column.align}
                                        style={{ width: `${column.width}%` }}
                                    >
                                        {selected}
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
