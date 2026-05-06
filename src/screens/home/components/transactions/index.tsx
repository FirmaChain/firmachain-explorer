import { Box, NoData } from '@components';
import { useScreenSize } from '@hooks';
import { Divider, Typography } from '@mui/material';
import { TRANSACTIONS } from '@utils/go_to_page';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import Desktop from './components/desktop';
import Mobile from './components/mobile';
import { useTransactions } from './hooks';

const Transactions = ({ className }: { className?: string }) => {
    const { isDesktop } = useScreenSize();
    const { t } = useTranslation('home');
    const { state } = useTransactions();
    return (
        <Box
            className={className}
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                },
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
                <Typography variant="h2">{t('latestTransactions')}</Typography>
                <Link to={TRANSACTIONS}>
                    <Typography variant="h4" className="button">
                        {t('seeMore')}
                    </Typography>
                </Link>
            </div>
            {!state.items.length ? (
                <NoData />
            ) : (
                <>
                    {isDesktop ? <Desktop className="desktop" items={state.items} /> : <Mobile className="mobile" items={state.items} />}
                    <Divider className="mobile" />
                    <Link to={TRANSACTIONS}>
                        <Typography variant="h4" className="seeMoreFooter mobile button">
                            {t('seeMore')}
                        </Typography>
                    </Link>
                </>
            )}
        </Box>
    );
};

export default Transactions;
