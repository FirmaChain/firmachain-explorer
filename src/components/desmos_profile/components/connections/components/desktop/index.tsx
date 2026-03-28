import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { readDate } from '@recoil/settings';
import dayjs, { formatDayJs } from '@utils/dayjs';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';

import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items?: ProfileConnectionType[];
}> = ({ className, items }) => {
    const dateFormat = useRecoilValue(readDate);
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
