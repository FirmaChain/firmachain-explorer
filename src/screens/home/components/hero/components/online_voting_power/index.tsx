import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

import { useOnlineVotingPower } from './hooks';

const OnlineVotingPower = () => {
    const { t } = useTranslation('home');
    const { state } = useOnlineVotingPower();

    const votingPowerPercent = state.totalVotingPower === 0 ? numeral(0) : numeral((state.votingPower / state.totalVotingPower) * 100);
    const percent = votingPowerPercent.format(0);
    const itemSx = (theme: Theme) => ({
        '&:not(:last-child)': {
            marginBottom: theme.spacing(2)
        },
        '& .label': {
            marginBottom: theme.spacing(1),
            color: theme.palette.custom.fonts.fontThree
        },
        '& p.value': {
            color: theme.palette.custom.fonts.fontTwo,
            '& .positive': {
                color: theme.palette.custom.tags.one
            },
            '& .negative': {
                color: theme.palette.custom.tags.three
            }
        },
        '& a': {
            color: theme.palette.custom.fonts.highlight
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    });

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTypography-h2': {
                    mb: 2
                }
            }}
        >
            <Typography variant="h2">{t('onlineVotingPower')}</Typography>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'flex-end',
                    '& .primary__data': {
                        color: theme.palette.primary.main,
                        mr: 2,
                        fontSize: '2.5rem'
                    }
                })}
            >
                <Typography variant="h3" className="primary__data">
                    {`${votingPowerPercent.format('0,0.00', (n) => ~~n)}%`}
                </Typography>
                <Typography variant="body1">
                    {numeral(state.votingPower).format('0,0')} / {numeral(state.totalVotingPower).format('0,0')}
                </Typography>
            </Box>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    height: '11px',
                    borderRadius: `${theme.shape.borderRadius}px`,
                    background: alpha(theme.palette.primary.main, 0.2),
                    overflow: 'hidden',
                    margin: theme.spacing(2, 0)
                })}
            >
                <Box
                    sx={(theme) => ({
                        width: `${percent}%`,
                        background: theme.palette.primary.main,
                        transition: '0.3s'
                    })}
                />
            </Box>
            <Box
                sx={(theme) => ({
                    [theme.breakpoints.up('lg')]: {
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }
                })}
            >
                <Box sx={itemSx}>
                    <Typography variant="h4" className="label">
                        {t('validators')}
                    </Typography>
                    <Typography variant="body1" className="value">
                        {numeral(state.activeValidators).format('0,0')}
                    </Typography>
                </Box>
                <Box sx={itemSx}>
                    <Typography variant="h4" className="label">
                        {t('votingPowerPercent')}
                    </Typography>
                    <Typography variant="body1" className="value">
                        {`${votingPowerPercent.format('0,0.00', (n) => ~~n)}%`}
                    </Typography>
                </Box>
                <Box sx={itemSx}>
                    <Typography variant="h4" className="label">
                        {t('votingPower')}
                    </Typography>
                    <Typography variant="body1" className="value">
                        {numeral(state.votingPower).format('0,0')}
                    </Typography>
                </Box>
                <Box
                    sx={(theme) => ({
                        '& .label': {
                            mb: 1,
                            color: theme.palette.custom.fonts.fontThree
                        },
                        '& p.value': {
                            color: theme.palette.custom.fonts.fontTwo
                        },
                        '& a': {
                            color: theme.palette.custom.fonts.highlight
                        },
                        [theme.breakpoints.up('md')]: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }
                    })}
                >
                    <Typography variant="h4" className="label">
                        {t('totalVotingPower')}
                    </Typography>
                    <Typography variant="body1" className="value">
                        {numeral(state.totalVotingPower).format('0,0')}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OnlineVotingPower;
