import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { NextSeo } from '@/adapters/seo/seo';
import { BoxDetails, LoadAndExist } from '@components';
import { Box } from '@mui/material';

import { useParams } from './hooks';
import { formatDistribution, formatGov, formatMinting, formatSlashing, formatStaking } from './utils';

const Params = () => {
    const { t } = useTranslation('params');
    const { state } = useParams();

    const staking = state.staking
        ? {
              title: t('staking'),
              details: formatStaking(state.staking, t)
          }
        : null;

    const slashing = state.slashing
        ? {
              title: t('slashing'),
              details: formatSlashing(state.slashing, t)
          }
        : null;

    const minting = state.minting
        ? {
              title: t('minting'),
              details: formatMinting(state.minting, t)
          }
        : null;

    const distribution = state.distribution
        ? {
              title: t('distribution'),
              details: formatDistribution(state.distribution, t)
          }
        : null;

    const gov = state.gov
        ? {
              title: t('gov'),
              details: formatGov(state.gov, t)
          }
        : null;

    return (
        <>
            <NextSeo
                title={t('params')}
                openGraph={{
                    title: t('params')
                }}
            />
                <LoadAndExist loading={state.loading} exists={state.exists}>
                    <Box
                        sx={(theme: any) => ({
                            ...theme.mixins.layout,
                            display: 'grid',
                            gridTemplateRows: 'auto',
                            gridGap: theme.spacing(1),
                            '& a': {
                                color: theme.palette.custom.fonts.highlight
                            },
                            [theme.breakpoints.up('lg')]: {
                                gridGap: theme.spacing(2),
                                gridTemplateColumns: 'repeat(2, 1fr)'
                            }
                        })}
                    >
                        {staking && <BoxDetails {...staking} />}
                        {slashing && <BoxDetails {...slashing} />}
                        {minting && <BoxDetails {...minting} />}
                        {distribution && <BoxDetails {...distribution} />}
                        {gov && <BoxDetails {...gov} />}
                    </Box>
                </LoadAndExist>
        </>
    );
};

export default Params;
