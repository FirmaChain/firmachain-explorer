import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { NextSeo } from '@/adapters/seo/seo';
import { Layout } from '@components';

import { List } from './components';
import { useProposals } from './hooks';
import { useStyles } from './styles';

const Proposals = () => {
    const { t } = useTranslation('proposals');
    const classes = useStyles();
    const { state, loadMoreItems, itemCount, isItemLoaded } = useProposals();

    return (
        <>
            <NextSeo
                title={t('proposals')}
                openGraph={{
                    title: t('proposals')
                }}
            />
            <Layout navTitle={t('proposals')} className={classes.root}>
                <List
                    items={state.items}
                    rawDataTotal={state.rawDataTotal}
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                />
            </Layout>
        </>
    );
};

export default Proposals;
