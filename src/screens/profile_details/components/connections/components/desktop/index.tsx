import React from 'react';
import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { chainConfig } from '@configs';
import { Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { ACCOUNT_DETAILS } from '@utils/go_to_page';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const Desktop: React.FC<{
    className?: string;
    items?: ProfileConnectionType[];
}> = ({ className, items = [] }) => {
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
            render: (row) => {
                if (new RegExp(`^(${chainConfig.prefix.account})`).test(row.identifier)) {
                    return (
                        <Link to={ACCOUNT_DETAILS(row.identifier)}>
                            <Typography variant="body1" className="value" component="span" noWrap>
                                {row.identifier}
                            </Typography>
                        </Link>
                    );
                }

                return (
                    <Typography variant="body1" component="span" noWrap>
                        {row.identifier}
                    </Typography>
                );
            }
        },
        {
            key: 'creationTime',
            header: t('creationTime'),
            width: 220,
            align: 'right',
            render: (row) => formatDayJs(dayjs.utc(row.creationTime), dateFormat)
        }
    ];

    return <DataTable className={clsx(className)} data={items} columns={columns} getRowId={(row) => `${row.network}-${row.identifier}`} rowHeight={50} />;
};

export default Desktop;
