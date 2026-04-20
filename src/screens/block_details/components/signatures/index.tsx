import React from 'react';
import dynamic from '@/adapters/routing/dynamic';
import { Box, NoData } from '@components';
import { useScreenSize } from '@hooks';
import { Typography } from '@mui/material';
import { useProfilesRecoil } from '@zustand/profiles';
import { useTranslation } from 'react-i18next';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Signatures: React.FC<
    ComponentDefault & {
        signatures: string[];
    }
> = ({ className, signatures }) => {
    const { isDesktop } = useScreenSize();
    const { t } = useTranslation('blocks');
    const formattedSignatures = useProfilesRecoil(signatures);

    return (
        <Box
            className={className}
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTypography-h2': {
                    pb: 2
                },
                '& .wrapper': {
                    flex: 1
                },
                '& .title': {
                    mb: 2
                },
                '& .mobile': {
                    [theme.breakpoints.up('lg')]: {
                        display: 'none'
                    }
                },
                '& .desktop': {
                    display: 'none',
                    [theme.breakpoints.up('lg')]: {
                        display: 'flex'
                    }
                }
            })}
        >
            <Typography className="title" variant="h2">
                {t('signatures')}
            </Typography>
            {!signatures.length ? (
                <NoData />
            ) : (
                <div className="wrapper">
                    {isDesktop ? (
                        <Desktop className="desktop" signatures={formattedSignatures} />
                    ) : (
                        <Mobile className="mobile" signatures={formattedSignatures} />
                    )}
                </div>
            )}
        </Box>
    );
};

export default Signatures;
