import React from 'react';
import { AvatarName } from '@components';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { formatNumber } from '@utils/format_token';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

import { ItemType } from '../../types';

const Desktop: React.FC<{
    className?: string;
    items: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('accounts');
    const dateFormat = useSettingsStore(readDate);

    const columns: DataTableColumn<ItemType>[] = [
        {
            key: 'address',
            header: t('address'),
            minWidth: 220,
            grow: 2,
            render: (row) => <AvatarName address={row.address.address} imageUrl={row.address.imageUrl} name={row.address.name} />
        },
        {
            key: 'to',
            header: t('to'),
            minWidth: 220,
            grow: 2,
            render: (row) => <AvatarName address={row.to.address} imageUrl={row.to.imageUrl} name={row.to.name} />
        },
        {
            key: 'amount',
            header: t('amount'),
            minWidth: 180,
            align: 'right',
            render: (row) => `${formatNumber(row.amount.value, row.amount.exponent)} ${row.amount.displayDenom.toUpperCase()}`
        },
        {
            key: 'completionTime',
            header: t('completionTime'),
            minWidth: 220,
            align: 'right',
            render: (row) => formatDayJs(dayjs.utc(row.completionTime), dateFormat)
        }
    ];

    return (
        <DataTable
            className={clsx(className)}
            data={items}
            columns={columns}
            getRowId={(row) => `${row.address.address}-${row.to.address}`}
        />
    );
};

export default Desktop;
