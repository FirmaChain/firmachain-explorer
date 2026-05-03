import { Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

interface Props {
    className?: string;
    items?: ProfileConnectionType[];
}

const Desktop = ({ className, items = [] }: Props) => {
    const dateFormat = useSettingsStore(readDate);
    const { t } = useTranslation('accounts');

    const columns: DataTableColumn<ProfileConnectionType>[] = [
        {
            key: 'network',
            header: t('network'),
            width: 140,
            render: (row) => row.network.toUpperCase()
        },
        {
            key: 'identifier',
            header: t('identifier'),
            minWidth: 240,
            grow: 2,
            render: (row) => (
                <Typography variant="body1" component="span" noWrap>
                    {row.identifier}
                </Typography>
            )
        },
        {
            key: 'creationTime',
            header: t('creationTime'),
            width: 220,
            align: 'right',
            render: (row) => formatDayJs(dayjs.utc(row.creationTime), dateFormat)
        }
    ];

    return <DataTable className={clsx(className)} data={items} columns={columns} getRowId={(row) => `${row.network}-${row.identifier}`} />;
};

export default Desktop;
