import React from 'react';
import useTranslation from '@src/adapters/i18n/useTranslation';
import { NextSeo } from '@src/adapters/seo/seo';
import {
  Layout,
} from '@components';
import { useStyles } from './styles';
import { List } from './components';
import { useProposals } from './hooks';

const Proposals = () => {
  const { t } = useTranslation('proposals');
  const classes = useStyles();
  const {
    state,
    loadMoreItems,
    itemCount,
    isItemLoaded,
  } = useProposals();

  return (
    <>
      <NextSeo
        title={t('proposals')}
        openGraph={{
          title: t('proposals'),
        }}
      />
      <Layout
        navTitle={t('proposals')}
        className={classes.root}
      >
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
