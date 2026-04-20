import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { readDate, useSettingsStore } from '@zustand/settings';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items?: ProfileConnectionType[];
}> = ({ className, items }) => {
    const dateFormat = useSettingsStore(readDate);
    const { t } = useTranslation('accounts');

    const formattedItems = items.map((x) => {
        return {
            network: x.network.toUpperCase(),
            identifier: x.identifier,
            creationTime: formatDayJs(dayjs.utc(x.creationTime), dateFormat)
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
