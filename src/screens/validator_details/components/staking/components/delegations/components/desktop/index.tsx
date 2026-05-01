import React from 'react';
import { AvatarName } from '@components';
import { formatNumber } from '@utils/format_token';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

import { ItemType } from '../../types';

const Desktop: React.FC<{
    className?: string;
    items?: ItemType[];
}> = ({ className, items = [] }) => {
    const { t } = useTranslation('accounts');

    const columns: DataTableColumn<ItemType>[] = [
        {
            key: 'address',
            header: t('address'),
            minWidth: 220,
            grow: 2,
            render: (row) => <AvatarName name={row.address.name} address={row.address.address} imageUrl={row.address.imageUrl} />
        },
        {
            key: 'amount',
            header: t('amount'),
            minWidth: 180,
            align: 'right',
            render: (row) => `${formatNumber(row.amount.value, row.amount.exponent)} ${row.amount.displayDenom.toUpperCase()}`
        }
    ];

    return <DataTable className={clsx(className)} data={items} columns={columns} getRowId={(row) => row.address.address} />;
};

export default Desktop;
