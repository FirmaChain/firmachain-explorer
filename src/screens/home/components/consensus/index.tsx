import { AvatarName, Box } from '@components';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useProfileRecoil } from '@zustand/profiles';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

import { ConsensusRing } from './consensusRing';
import { useConsensus } from './hooks';
import { useWrappedProgress } from './useWrappedProgress';

const Consensus = ({ className }: { className?: string }) => {
    const theme = useTheme();
    const { state } = useConsensus();
    const { t } = useTranslation('home');

    const circleSize = 200;
    const ringWidth = 10;
    const proposerProfile = useProfileRecoil(state.proposer);

    const displayRoundCompletion = useWrappedProgress(state.roundCompletion, {
        wrapDelay: 120
    });

    return (
        <Box
            className={clsx(className)}
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                overflow: 'auto',
                '& .content': {
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column'
                },
                '& .info': {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    color: theme.palette.custom.fonts.fontTwo,
                    '& > *': {
                        display: 'flex',
                        alignItems: 'center',
                        '& > *': {
                            width: '50%'
                        }
                    },
                    [theme.breakpoints.up('lg')]: {
                        marginBottom: 0
                    }
                }
            }}
        >
            <Typography variant="h2" sx={{ mb: 2 }}>
                {t('consensus')}
            </Typography>

            <div className="info">
                <div>
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{
                            color: theme.palette.custom.fonts.fontThree,
                            mb: 0.5
                        }}
                    >
                        {t('height')}
                    </Typography>
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{
                            color: theme.palette.custom.fonts.fontThree,
                            mb: 0.5
                        }}
                    >
                        {t('proposer')}
                    </Typography>
                </div>

                <div>
                    <Typography variant="h4">{numeral(state.height).format('0,0')}</Typography>

                    {state.proposer ? (
                        <AvatarName address={proposerProfile.address} imageUrl={proposerProfile.imageUrl} name={proposerProfile.name} />
                    ) : (
                        '-'
                    )}
                </div>
            </div>

            <div className="content">
                <ConsensusRing size={circleSize} strokeWidth={ringWidth} value={displayRoundCompletion}>
                    <Typography
                        component="div"
                        sx={{
                            fontSize: '2rem',
                            color: theme.palette.custom.fonts.fontOne,
                            lineHeight: 1.2
                        }}
                    >
                        {t('step', {
                            step: numeral(state.step).format('0,0')
                        })}
                    </Typography>
                </ConsensusRing>
            </div>
        </Box>
    );
};

export default Consensus;
