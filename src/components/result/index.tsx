import React from 'react';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Result: React.FC<{
    className?: string;
    success?: boolean;
}> = ({ className, success }) => {
    const { t } = useTranslation('common');

    return (
        <Box
            className={className}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: (theme: any) => theme.palette.custom.fonts.fontTwo,
                '& svg': {
                    width: '16px',
                    height: '16px',
                    mr: 0.5
                },
                '& .MuiSvgIcon-root': {
                    fill: (theme: any) => (success ? theme.palette.custom.results.pass : theme.palette.custom.results.fail)
                }
            }}
        >
            {success ? (
                <>
                    <CheckCircle />
                    <Typography variant="body1">{t('success')}</Typography>
                </>
            ) : (
                <>
                    <Cancel />
                    <Typography variant="body1">{t('fail')}</Typography>
                </>
            )}
        </Box>
    );
};

export default Result;
