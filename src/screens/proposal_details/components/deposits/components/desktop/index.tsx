import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { AvatarName } from '@components';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useSettingsStore,  readDate  } from '@zustand/settings';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { formatNumber } from '@utils/format_token';
import classnames from 'classnames';

import { ItemType } from '../../types';
import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items?: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('proposals');
    const dateFormat = useSettingsStore(readDate);

    const formattedItems = items.map((x) => {
        return {
            depositor: (
                <>{x.user.address ? <AvatarName address={x.user.address} imageUrl={x.user.imageUrl} name={x.user.name} /> : <>-</>}</>
            ),
            amount: `${formatNumber(x.amount.value, x.amount.exponent)} ${x.amount.displayDenom.toUpperCase()}`,
            time: formatDayJs(dayjs.utc(x.timestamp), dateFormat)
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
