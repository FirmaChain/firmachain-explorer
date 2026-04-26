import React from 'react';
import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { AvatarName } from '@components';
import { formatNumber } from '@utils/format_token';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ItemType } from '../../types';

const Desktop: React.FC<{
    className?: string;
    items?: ItemType[];
}> = ({ className, items = [] }) => {
    const { t } = useTranslation('accounts');

    const columns: DataTableColumn<ItemType>[] = [
        {
            key: 'validator',
            header: t('validator'),
            minWidth: 220,
            grow: 2,
            render: (row) => <AvatarName name={row.validator.name} address={row.validator.address} imageUrl={row.validator.imageUrl} />
        },
        {
            key: 'amount',
            header: t('amount'),
            minWidth: 180,
            align: 'right',
            render: (row) => `${formatNumber(row.amount.value, row.amount.exponent)} ${row.amount.displayDenom.toUpperCase()}`
        },
        {
            key: 'reward',
            header: t('reward'),
            minWidth: 180,
            align: 'right',
            render: (row) => `${formatNumber(row.reward.value, row.reward.exponent)} ${row.reward.displayDenom.toUpperCase()}`
        }
    ];

    return <DataTable className={clsx(className)} data={items} columns={columns} getRowId={(row) => row.validator.address} rowHeight={50} />;
};

export default Desktop;
