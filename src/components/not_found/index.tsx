import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import NotFoundDark from '@assets/not-found-dark.svg?react';
import NotFoundLight from '@assets/not-found-light.svg?react';
import { Box, Typography } from '@mui/material';
import { useSettingsStore,  readTheme  } from '@zustand/settings';

const NotFound: React.FC<{
    className?: string;
}> = ({ className }) => {
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
                minHeight: '400px',
                height: '100%'
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
                <Typography variant="body1" sx={{ mt: 2, color: (muiTheme: any) => muiTheme.palette.custom.fonts.fontFour }}>
                    {t('notFound')}
                </Typography>
            </Box>
        </Box>
    );
};

export default NotFound;
