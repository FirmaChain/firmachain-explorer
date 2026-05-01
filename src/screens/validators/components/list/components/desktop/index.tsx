import React from 'react';
import { AvatarName, ConditionExplanation } from '@components';
import { Box, Typography } from '@mui/material';
import { getValidatorConditionClass } from '@utils/get_validator_condition';
import { getValidatorStatus } from '@utils/get_validator_status';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

import { DataTable, DataTableColumn } from '@/components/DataTable';

import { Condition, VotingPower, VotingPowerExplanation } from '..';
import { ItemType } from '../../types';

type DesktopProps = {
    className?: string;
    sortDirection: 'desc' | 'asc';
    sortKey: string;
    handleSort: (key: string) => void;
    items: ItemType[];
};

const DEFAULT_ROW_HEIGHT = 50;

const Desktop: React.FC<DesktopProps> = ({ className, sortDirection, sortKey, handleSort, items }) => {
    const { t } = useTranslation('validators');
    const sortState = React.useMemo(
        () =>
            sortKey
                ? {
                      columnKey: sortKey,
                      direction: sortDirection
                  }
                : null,
        [sortDirection, sortKey]
    );

    const handleSortStateChange = React.useCallback(
        (next: { columnKey: string; direction: 'asc' | 'desc' } | null) => {
            if (!next) return;

            if (next.columnKey !== sortKey) {
                handleSort(next.columnKey);
                return;
            }

            if (next.direction !== sortDirection) {
                handleSort(next.columnKey);
            }
        },
        [handleSort, sortDirection, sortKey]
    );

    const cols: DataTableColumn<ItemType>[] = [
        {
            key: 'idx',
            header: t('idx'),
            width: 100,
            render: (_row, context) => `#${context.rowIndex + 1}`
        },
        {
            key: 'validator.name',
            header: t('validator'),
            sortable: true,
            width: '25%',
            render: (row) => <AvatarName address={row.validator.address} imageUrl={row.validator.imageUrl} name={row.validator.name} />
        },
        {
            key: 'votingPower',
            header: t('votingPower'),
            tooltip: <VotingPowerExplanation />,
            sortable: true,
            render: (row) => {
                const percentDisplay = row.status === 3 ? `${numeral(row.votingPowerPercent).format('0.[00]')}%` : '0%';
                const votingPower = numeral(row.votingPower).format('0,0');

                return (
                    <VotingPower
                        percentDisplay={percentDisplay}
                        percentage={row.votingPowerPercent}
                        content={votingPower}
                        topVotingPower={row.topVotingPower}
                    />
                );
            }
        },
        {
            key: 'commission',
            header: t('commission'),
            sortable: true,
            align: 'right',
            width: 150,
            render: (row) => (row.commission === null ? 'N/A' : `${numeral(row.commission).format('0.[00]')}%`)
        },
        {
            key: 'status',
            header: t('status'),
            tooltip: <ConditionExplanation />,
            align: 'center',
            width: 150,
            render: (row) => {
                const status = getValidatorStatus(row.status, row.jailed, row.tombstoned);
                const condition = row.status === 3 ? getValidatorConditionClass(row.condition) : undefined;
                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Condition className={condition} />
                        <Typography variant="body1" className={clsx('status', status.theme)}>
                            {t(status.status)}
                        </Typography>
                    </div>
                );
            }
        }
    ];

    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                height: '100%',
                minHeight: 0,
                color: theme.palette.custom.fonts.fontTwo,
                '& .status.one': { color: theme.palette.custom.tags.one },
                '& .status.two': { color: theme.palette.custom.tags.two },
                '& .status.three': { color: theme.palette.custom.tags.three },
                '& .status.zero': { color: theme.palette.custom.tags.zero }
            })}
        >
            <DataTable
                data={items}
                columns={cols}
                getRowId={(row) => row.validator.address}
                height="100%"
                sortState={sortState}
                onSortStateChange={handleSortStateChange}
                sortBehavior="toggle"
                virtualization={{ enabled: true }}
            />
        </Box>
    );
};

export default Desktop;
