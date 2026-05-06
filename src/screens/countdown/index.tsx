import { useState } from 'react';
import { Loading } from '@components';
import { chainConfig } from '@configs';
import { useInterval } from '@hooks';
import { Box, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { readTheme, useSettingsStore } from '@zustand/settings';
import * as R from 'ramda';

const Countdown = ({ startGenesis }: { startGenesis: () => void }) => {
    const theme = useSettingsStore(readTheme);
    const [state, setState] = useState<{
        day: number;
        hour: number;
        minute: number;
        second: number;
        interval: number | null;
        loading: boolean;
    }>({
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        interval: 1000,
        loading: false
    });

    const genesisTime = dayjs.utc(chainConfig.genesis.time);
    const logoUrl = R.pathOr(chainConfig.logo.default, ['logo', theme], chainConfig);

    const intervalCallback = () => {
        const timeNow = dayjs.utc();
        const difference = genesisTime.diff(timeNow);
        if (difference > 0) {
            setState((prevState) => ({
                ...prevState,
                day: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hour: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minute: Math.floor((difference / 1000 / 60) % 60),
                second: Math.floor((difference / 1000) % 60)
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                interval: null,
                loading: true
            }));
            startGenesis();
        }
    };

    useInterval(intervalCallback, state.interval);

    return (
        <Box
            sx={(muiTheme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                background: muiTheme.palette.background.default,
                '& a': {
                    color: muiTheme.palette.custom.fonts.highlight
                }
            })}
        >
            <Box component="img" src={logoUrl} alt="logo" sx={{ width: '275px' }} />
            <Box
                sx={(muiTheme) => ({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 65px)',
                    gridGap: '8px',
                    my: 3,
                    '& .count-item': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    },
                    '& .count-item .MuiTypography-h1': {
                        width: '100%',
                        textAlign: 'center',
                        background: muiTheme.palette.background.paper,
                        p: 2,
                        mb: 2
                    }
                })}
            >
                <Box className="count-item">
                    <Typography variant="h1">{state.day}</Typography>
                    <Typography variant="h3">Day</Typography>
                </Box>
                <Box className="count-item">
                    <Typography variant="h1">{state.hour}</Typography>
                    <Typography variant="h3">Hour</Typography>
                </Box>
                <Box className="count-item">
                    <Typography variant="h1">{state.minute}</Typography>
                    <Typography variant="h3">Min</Typography>
                </Box>
                <Box className="count-item">
                    <Typography variant="h1">{state.second}</Typography>
                    <Typography variant="h3">Sec</Typography>
                </Box>
            </Box>
            <Typography variant="h2" sx={(muiTheme) => ({ color: muiTheme.palette.primary.main })}>
                {chainConfig.network}
            </Typography>
            {state.loading && <Loading />}
        </Box>
    );
};

export default Countdown;
