import React from 'react';
import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { AvatarName } from '@components';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { formatNumber } from '@utils/format_token';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ItemType } from '../../types';

const Desktop: React.FC<{
    className?: string;
    items: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('accounts');
    const dateFormat = useSettingsStore(readDate);

    const columns: DataTableColumn<ItemType>[] = [
        {
            key: 'from',
            header: t('from'),
            minWidth: 220,
            grow: 2,
            render: (row) => <AvatarName address={row.from.address} imageUrl={row.from.imageUrl} name={row.from.name} />
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

    return <DataTable className={clsx(className)} data={items} columns={columns} getRowId={(row) => `${row.from.address}-${row.to.address}`} rowHeight={50} />;
};

export default Desktop;
