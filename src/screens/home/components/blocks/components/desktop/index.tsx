import { AvatarName } from '@components';
import { Box, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

import { ItemType } from '../../types';

const Desktop = ({ className, items }: { className?: string; items: ItemType[] }) => {
    const { t } = useTranslation('blocks');

    const columns: DataTableColumn<ItemType>[] = [
        {
            key: 'height',
            header: t('height'),
            width: 150,
            render: (row) => (
                <Link to={BLOCK_DETAILS(row.height)}>
                    <Typography variant="body1" className="value" component="span" noWrap>
                        {numeral(row.height).format('0,0')}
                    </Typography>
                </Link>
            )
        },
        {
            key: 'proposer',
            header: t('proposer'),
            minWidth: 180,
            render: (row) => <AvatarName address={row.proposer.address} imageUrl={row.proposer.imageUrl} name={row.proposer.name} />
        },
        {
            key: 'hash',
            header: t('hash'),
            minWidth: 180,
            grow: 2,
            render: (row) => (
                <Typography variant="body1" component="span" noWrap>
                    {getMiddleEllipsis(row.hash, {
                        beginning: 6,
                        ending: 5
                    })}
                </Typography>
            )
        },
        {
            key: 'txs',
            header: t('txs'),
            width: 110,
            align: 'right',
            render: (row) => numeral(row.txs).format('0,0')
        },
        {
            key: 'time',
            header: t('time'),
            width: 140,
            align: 'right',
            render: (row) => dayjs.utc(row.timestamp).fromNow()
        }
    ];

    return (
        <Box className={clsx(className)}>
            <DataTable data={items} columns={columns} getRowId={(row) => row.height} />
        </Box>
    );
};

export default Desktop;
