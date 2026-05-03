import { AvatarName } from '@components';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { formatNumber } from '@utils/format_token';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

import { ItemType } from '../../types';

const Desktop = ({ className, items = [] }: { className?: string; items?: ItemType[] }) => {
    const { t } = useTranslation('proposals');
    const dateFormat = useSettingsStore(readDate);

    const columns: DataTableColumn<ItemType>[] = [
        {
            key: 'depositor',
            header: t('depositor'),
            minWidth: 220,
            grow: 2,
            render: (row) =>
                row.user.address ? <AvatarName address={row.user.address} imageUrl={row.user.imageUrl} name={row.user.name} /> : '-'
        },
        {
            key: 'amount',
            header: t('amount'),
            minWidth: 180,
            align: 'right',
            render: (row) => `${formatNumber(row.amount.value, row.amount.exponent)} ${row.amount.displayDenom.toUpperCase()}`
        },
        {
            key: 'time',
            header: t('time'),
            minWidth: 220,
            align: 'right',
            render: (row) => formatDayJs(dayjs.utc(row.timestamp), dateFormat)
        }
    ];

    return (
        <DataTable
            className={clsx(className)}
            data={items}
            columns={columns}
            getRowId={(row) => `${row.user.address || 'unknown'}-${row.timestamp}`}
        />
    );
};

export default Desktop;
