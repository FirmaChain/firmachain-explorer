import dynamic from '@/adapters/routing/dynamic';
import { Box, NoData } from '@components';
import { useScreenSize } from '@hooks';
import { Typography } from '@mui/material';
import { useProfilesRecoil } from '@zustand/profiles';
import { useTranslation } from 'react-i18next';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

interface Props extends ComponentDefault {
    signatures: string[];
}

const Signatures = ({ className, signatures }: Props) => {
    const { isDesktop } = useScreenSize();
    const { t } = useTranslation('blocks');
    const formattedSignatures = useProfilesRecoil(signatures);

    return (
        <Box
            className={className}
            sx={(theme) => ({
                minHeight: '350px',
                height: {
                    xs: '50vh',
                    lg: '450px'
                },
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                '& .MuiTypography-h2': {
                    pb: 2
                },
                '& .wrapper': {
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column'
                },
                '& .mobile': {
                    flex: 1,
                    minHeight: 0,
                    [theme.breakpoints.up('lg')]: {
                        display: 'none'
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
