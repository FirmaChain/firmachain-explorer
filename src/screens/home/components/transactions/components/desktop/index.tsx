import { Result } from '@/components';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@/utils/go_to_page';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { DataTable, DataTableColumn } from '@/components/DataTable';
import { getMessageByType } from '@/components/msg/utils';

import { TransactionType } from '../../types';

const Desktop = ({ className, items }: { className?: string; items: TransactionType[] }) => {
    const { t } = useTranslation('transactions');

    const columns: DataTableColumn<TransactionType>[] = [
        {
            key: 'block',
            header: t('block'),
            minWidth: 120,
            render: (row) => (
                <Link to={BLOCK_DETAILS(row.height)}>
                    <Typography variant="body1" component="span" noWrap>
                        {numeral(row.height).format('0,0')}
                    </Typography>
                </Link>
            )
        },
        {
            key: 'type',
            header: t('type'),
            minWidth: 180,
            render: (row) => {
                const messageType = {
                    ...row.type[0],
                    type: row.type[0]['@type']
                };
                const tag = getMessageByType(messageType, true, t);

                return (
                    <Typography variant="body1" component="span" noWrap>
                        {tag.type}
                    </Typography>
                );
            }
        },
        {
            key: 'hash',
            header: t('hash'),
            minWidth: 220,
            render: (row) => (
                <Link to={TRANSACTION_DETAILS(row.hash)}>
                    <Typography variant="body1" component="span" noWrap>
                        {getMiddleEllipsis(row.hash, {
                            beginning: 15,
                            ending: 5
                        })}
                    </Typography>
                </Link>
            )
        },
        {
            key: 'result',
            header: t('result'),
            width: 100,
            align: 'right',
            render: (row) => <Result success={row.success} />
        },
        {
            key: 'time',
            header: t('time'),
            width: 120,
            align: 'right',
            render: (row) => dayjs.utc(row.timestamp).fromNow()
        }
    ];

    return (
        <Box className={clsx(className)}>
            <DataTable data={items} columns={columns} getRowId={(row) => row.hash} />
        </Box>
    );
};

export default Desktop;
