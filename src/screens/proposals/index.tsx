import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { NextSeo } from '@/adapters/seo/seo';
import { Layout } from '@components';
import { Box } from '@mui/material';

import { List } from './components';
import { useProposals } from './hooks';

const Proposals = () => {
    const { t } = useTranslation('proposals');
    const { state, loadMoreItems, itemCount, isItemLoaded } = useProposals();

    return (
        <>
            <NextSeo
                title={t('proposals')}
                openGraph={{
                    title: t('proposals')
                }}
            />
            <Layout navTitle={t('proposals')}>
                <Box
                    sx={(theme: any) => ({
                        ...theme.mixins.layout,
                        '& a': {
                            color: theme.palette.custom.fonts.highlight
                        }
                    })}
                >
                    <List
                        items={state.items}
                        rawDataTotal={state.rawDataTotal}
                        isItemLoaded={isItemLoaded}
                        itemCount={itemCount}
                        loadMoreItems={loadMoreItems}
                    />
                </Box>
            </Layout>
        </>
    );
};

export default Proposals;
