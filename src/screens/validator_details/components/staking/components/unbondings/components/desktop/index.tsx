import { formatNumber } from '@/utils/format_token';
import { AvatarName } from '@components';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

import { ItemType } from '../../types';

const Desktop = ({ className, items }: { className?: string; items: ItemType[] }) => {
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
            key: 'amount',
            header: t('amount'),
            minWidth: 220,
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

    return <DataTable className={clsx(className)} data={items} columns={columns} getRowId={(row) => row.address.address} rowHeight={50} />;
};

export default Desktop;
