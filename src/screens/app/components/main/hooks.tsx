import { useState } from 'react';
import { chainConfig } from '@configs';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import dayjs from '@utils/dayjs';
import { getThemeTemplate, readTheme, useSettingsStore } from '@zustand/settings';

export const useTheme = () => {
    const theme = useSettingsStore(readTheme);

    return {
        muiTheme: createMuiTheme(getThemeTemplate(theme))
    };
};

export const useGenesis = () => {
    const utcTimeNow = dayjs.utc().format('YYYY-MM-DDTHH:mm:ss');
    const [genesisStarted, setGenesis] = useState(chainConfig.genesis.time < utcTimeNow);

    const startGenesis = () => {
        setTimeout(() => {
            setGenesis(true);
        }, 10000);
    };

    return {
        genesisStarted,
        startGenesis
    };
};
