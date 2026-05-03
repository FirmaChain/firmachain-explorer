import { AvatarName } from '@components';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

import { ItemType } from '../../types';
import { getVoteKey } from '../../utils';

interface Props {
    className?: string;
    items?: ItemType[];
}

const Desktop = ({ className, items }: Props) => {
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

    return <DataTable className={clsx(className)} data={items} columns={columns} getRowId={(row) => row.user.address} />;
};

export default Desktop;
