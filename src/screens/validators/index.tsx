import React from 'react';
import useTranslation from '@src/adapters/i18n/useTranslation';
import { NextSeo } from '@src/adapters/seo/seo';
import {
  Layout,
} from '@components';
import { useStyles } from './styles';
import { List } from './components';

const Validators = () => {
  const { t } = useTranslation('validators');
  const classes = useStyles();
  return (
    <>
      <NextSeo
        title={t('validators')}
        openGraph={{
          title: t('validators'),
        }}
      />
      <Layout
        navTitle={t('validators')}
        className={classes.root}
      >
        <List />
      </Layout>
    </>
  );
};

export default Validators;
