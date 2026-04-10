import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import dynamic from '@/adapters/routing/dynamic';
import { NextSeo } from '@/adapters/seo/seo';
import { Box, Layout, LoadAndExist, NoData } from '@components';
import { Box as MuiBox } from '@mui/material';
import { useScreenSize } from '@hooks';
import { useProfilesRecoil } from '@zustand/profiles';

import { useBlocks } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Blocks = () => {
    const { t } = useTranslation('blocks');
    const { isDesktop } = useScreenSize();
    const { state, loadMoreItems, itemCount, isItemLoaded } = useBlocks();

    const proposerProfiles = useProfilesRecoil(state.items.map((x) => x.proposer));
    const mergedDataWithProfiles = state.items.map((x, i) => {
        return {
            ...x,
            proposer: proposerProfiles[i]
        };
    });

    return (
        <>
            <NextSeo
                title={t('blocks')}
                openGraph={{
                    title: t('blocks')
                }}
            />
            <Layout navTitle={t('blocks')}>
                <MuiBox
                    sx={(theme: any) => ({
                        ...theme.mixins.layout,
                        '& a': {
                            color: theme.palette.custom.fonts.highlight
                        }
                    })}
                >
                    <LoadAndExist loading={state.loading} exists={state.exists}>
                        <Box
                            sx={(theme) => ({
                                minHeight: '500px',
                                height: {
                                    xs: '50vh',
                                    lg: '100%'
                                },
                                [theme.breakpoints.up('lg')]: {
                                    minHeight: '65vh'
                                }
                            })}
                        >
                            {!state.items.length ? (
                                <NoData />
                            ) : (
                                <>
                                    {isDesktop ? (
                                        <Desktop
                                            items={mergedDataWithProfiles}
                                            itemCount={itemCount}
                                            loadMoreItems={loadMoreItems}
                                            isItemLoaded={isItemLoaded}
                                        />
                                    ) : (
                                        <Mobile
                                            items={mergedDataWithProfiles}
                                            itemCount={itemCount}
                                            loadMoreItems={loadMoreItems}
                                            isItemLoaded={isItemLoaded}
                                        />
                                    )}
                                </>
                            )}
                        </Box>
                    </LoadAndExist>
                </MuiBox>
            </Layout>
        </>
    );
};

export default Blocks;
