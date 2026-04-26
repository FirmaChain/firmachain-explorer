import React from 'react';
import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { AvatarName } from '@components';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ItemType } from '../../types';
import { getVoteKey } from '../../utils';

const Desktop: React.FC<{
    className?: string;
    items?: ItemType[];
}> = ({ className, items = [] }) => {
    const { t } = useTranslation('proposals');

    const columns: DataTableColumn<ItemType>[] = [
        {
            key: 'voter',
            header: t('voter'),
            minWidth: 220,
            grow: 2,
            render: (row) => <AvatarName address={row.user.address} imageUrl={row.user.imageUrl} name={row.user.name} />
        },
        {
            key: 'vote',
            header: t('vote'),
            minWidth: 180,
            align: 'right',
            render: (row) => t(getVoteKey(row.vote))
        }
    ];

    return <DataTable className={clsx(className)} data={items} columns={columns} getRowId={(row) => row.user.address} rowHeight={50} />;
};

export default Desktop;
