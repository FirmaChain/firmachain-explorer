import React from 'react';
import { AvatarName, Box } from '@components';
import { getValidatorStatus } from '@utils/get_validator_status';
import clsx from 'clsx';
import numeral from 'numeral';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

import { VotingPower } from '..';
import { ItemType } from '../../types';
import { SingleValidator } from './component';

type MobileProps = {
    className?: string;
    items: ItemType[];
};

const DEFAULT_ROW_HEIGHT = 240;

const Mobile: React.FC<MobileProps> = ({ className, items }) => {
    const columns: DataTableColumn<ItemType>[] = [
        {
            key: 'validator',
            header: '',
            render: (row, context) => {
                const status = getValidatorStatus(row.status, row.jailed, row.tombstoned);
                const percentDisplay = row.status === 3 ? `${numeral(row.votingPowerPercent).format('0.[00]')}%` : '0%';
                const votingPower = numeral(row.votingPower).format('0,0');

                return (
                    <SingleValidator
                        idx={`#${context.rowIndex + 1}`}
                        validator={
                            <AvatarName address={row.validator.address} imageUrl={row.validator.imageUrl} name={row.validator.name} />
                        }
                        commission={row.commission === null ? 'N/A' : `${numeral(row.commission).format('0.[00]')}%`}
                        votingPower={
                            <VotingPower
                                percentDisplay={percentDisplay}
                                percentage={row.votingPowerPercent}
                                content={votingPower}
                                topVotingPower={row.topVotingPower}
                            />
                        }
                        status={status}
                    />
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
                '& .status.zero': { color: theme.palette.custom.tags.zero },
                padding: 0,
                borderRadius: 0
            })}
        >
            <DataTable
                data={items}
                columns={columns}
                getRowId={(row) => row.validator.address}
                height="100%"
                hideHeader
                rowHeight={DEFAULT_ROW_HEIGHT}
            />
        </Box>
    );
};

export default Mobile;
