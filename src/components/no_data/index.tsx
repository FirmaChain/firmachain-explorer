import NotFoundDark from '@assets/not-found-dark.svg?react';
import NotFoundLight from '@assets/not-found-light.svg?react';
import { Box, Typography } from '@mui/material';
import { readTheme, useSettingsStore } from '@zustand/settings';
import { useTranslation } from 'react-i18next';

const NoData = ({ className }: { className?: string }) => {
    const { t } = useTranslation('common');
    const theme = useSettingsStore(readTheme);

    return (
        <Box
            className={className}
            sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 2
                }}
            >
                {theme === 'light' ? <NotFoundLight /> : <NotFoundDark />}
                <Typography variant="body1" sx={{ mt: 2, color: (muiTheme) => muiTheme.palette.custom.fonts.fontFour }}>
                    {t('nothingToShow')}
                </Typography>
            </Box>
        </Box>
    );
};

export default NoData;
