import { ReactNode, useCallback, useState } from 'react';
import { Box, Loading } from '@components';
import { Typography } from '@mui/material';
import { PROPOSAL_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { Link } from 'react-router';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

import { ProposalType } from '../../types';
import { SingleProposal, Total } from './components';

type FormattedProposalItem = {
    description: string;
    status: ProposalType['status'];
    types: ProposalType['types'];
    title: ReactNode;
    id: string;
};

interface Props {
    className?: string;
    items: ProposalType[];
    rawDataTotal: number;
    hasNextPage: boolean;
    loadMoreItems: () => void;
}

const ProposalsList = ({ className, items, rawDataTotal, hasNextPage, loadMoreItems }: Props) => {
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const formattedItems: FormattedProposalItem[] = items.map((item) => ({
        description: item.description.length > 200 ? `${item.description.slice(0, 200)}...` : item.description,
        status: item.status,
        types: item.types,
        title: (
            <Link to={PROPOSAL_DETAILS(item.id)}>
                <Typography variant="h3" className="value" component="span">
                    {item.title}
                </Typography>
            </Link>
        ),
        id: `#${numeral(item.id).format('0,0')}`
    }));
    const columns: DataTableColumn<FormattedProposalItem>[] = [
        {
            key: 'proposal',
            header: '',
            minWidth: 0,
            render: (row) => <SingleProposal {...row} />
        }
    ];

    const handleReachEnd = useCallback(async () => {
        if (!hasNextPage || isFetchingMore) return;

        setIsFetchingMore(true);

        try {
            await Promise.resolve(loadMoreItems());
        } finally {
            setIsFetchingMore(false);
        }
    }, [hasNextPage, isFetchingMore, loadMoreItems]);

    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                minHeight: '500px',
                height: '65vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                '& .total': {
                    mb: 2,
                    color: theme.palette.custom.fonts.fontThree,
                    textAlign: 'right',
                    [theme.breakpoints.up('lg')]: {
                        color: theme.palette.custom.fonts.fontTwo,
                        textAlign: 'left'
                    }
                },
                '& .singleProposal': {
                    width: '100%'
                }
            })}
        >
            <Total className="total" total={numeral(rawDataTotal).format('0,0')} />
            <DataTable
                data={formattedItems}
                columns={columns}
                getRowId={(row) => row.id}
                hideHeader
                hasMore={hasNextPage}
                isFetchingMore={isFetchingMore}
                onReachEnd={handleReachEnd}
                fetchMoreIndicator={<Loading />}
                rowClassName={() => 'singleProposal'}
            />
        </Box>
    );
};

export default ProposalsList;
