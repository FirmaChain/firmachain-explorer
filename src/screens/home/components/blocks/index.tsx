import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import dynamic from '@/adapters/routing/dynamic';
import Link from '@/adapters/routing/link';
import { Box, NoData } from '@components';
import { useScreenSize } from '@hooks';
import { Divider, Typography } from '@mui/material';
import { useProfilesRecoil } from '@zustand/profiles';
import { BLOCKS } from '@utils/go_to_page';

import { useBlocks } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Blocks: React.FC<{
    className?: string;
}> = ({ className }) => {
    const { isDesktop } = useScreenSize();
    const { t } = useTranslation('home');
    const { state } = useBlocks();

    const proposerProfiles = useProfilesRecoil(state.items.map((x) => x.proposer));
    const mergedDataWithProfiles = state.items.map((x, i) => {
        return {
            ...x,
            proposer: proposerProfiles[i]
        };
    });

    return (
        <Box
            className={className}
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                '& .button': {
                    color: theme.palette.custom.fonts.fontTwo,
                    '&:hover': {
                        cursor: 'pointer'
                    }
                },
                '& .label': {
                    marginBottom: theme.spacing(2),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                },
                '& .seeMoreFooter': {
                    paddingTop: theme.spacing(2),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                '& .mobile': {
                    [theme.breakpoints.up('lg')]: {
                        display: 'none'
                    }
                },
                '& .desktop': {
                    display: 'none',
                    [theme.breakpoints.up('lg')]: {
                        display: 'block'
                    }
                }
            })}
        >
            <div className="label">
                <Typography variant="h2">{t('latestBlocks')}</Typography>
                <Link href={BLOCKS} passHref>
                    <Typography variant="h4" className="button" component="a">
                        {t('seeMore')}
                    </Typography>
                </Link>
            </div>
            {!state.items.length ? (
                <NoData />
            ) : (
                <>
                    {isDesktop ? (
                        <Desktop className="desktop" items={mergedDataWithProfiles} />
                    ) : (
                        <Mobile className="mobile" items={mergedDataWithProfiles} />
                    )}
                    <Divider className="mobile" />
                    <Link href={BLOCKS} passHref>
                        <Typography variant="h4" component="a" className="seeMoreFooter mobile button">
                            {t('seeMore')}
                        </Typography>
                    </Link>
                </>
            )}
        </Box>
    );
};

export default Blocks;
