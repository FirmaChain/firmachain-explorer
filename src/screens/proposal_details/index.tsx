import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { NextSeo } from '@/adapters/seo/seo';
import { LoadAndExist } from '@components';
import { Box } from '@mui/material';

import { Deposits, Overview, Votes, VotesGraph } from './components';
import { useProposalDetails } from './hooks';
import { shouldShowData } from './utils';

const ProposalDetails = () => {
    const { t } = useTranslation('proposals');
    const { state } = useProposalDetails();
    const { overview } = state;

    return (
        <>
            <NextSeo
                title={t('proposalDetails')}
                openGraph={{
                    title: t('proposalDetails')
                }}
            />
                <LoadAndExist exists={state.exists} loading={state.loading}>
                    <Box
                        sx={(theme: any) => ({
                            ...theme.mixins.layout,
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gridTemplateRows: 'min-content min-content auto',
                            gridGap: theme.spacing(1),
                            [theme.breakpoints.up('lg')]: {
                                gridGap: theme.spacing(2),
                                gridTemplateColumns: 'repeat(3, 1fr)'
                            }
                        })}
                    >
                        <Box sx={{ gridColumn: { lg: '1 / 4' } }}>
                            <Overview overview={overview} />
                        </Box>
                        {shouldShowData(overview.status) && (
                            <Box sx={{ gridColumn: { md: '1 / 2', lg: '1 / 4' }, height: { lg: 'auto' } }}>
                                <VotesGraph />
                            </Box>
                        )}
                        {shouldShowData(overview.status) && (
                            <Box sx={{ gridColumn: { lg: '1 / 4' } }}>
                                <Votes />
                            </Box>
                        )}
                        <Box sx={{ gridColumn: { lg: '1 / 4' } }}>
                            <Deposits />
                        </Box>
                    </Box>
                </LoadAndExist>
        </>
    );
};

export default ProposalDetails;
