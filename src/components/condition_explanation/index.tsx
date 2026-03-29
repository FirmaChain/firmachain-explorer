import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Box, Typography } from '@mui/material';

const ConditionExplanation = () => {
    const { t } = useTranslation('validators');

    const conditions = [
        {
            display: '90% - 100%',
            className: 'green'
        },
        {
            display: '70% - 90%',
            className: 'yellow'
        },
        {
            display: '1% - 70%',
            className: 'red'
        },
        {
            display: '0%',
            className: ''
        }
    ];
    return (
        <Box sx={{ flexDirection: 'column', height: '100%' }}>
            <Typography>{t('conditionExplanation')}</Typography>
            <Box sx={{ mt: 2 }}>
                {conditions.map((x) => {
                    return (
                        <Box key={x.display} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography>{x.display}</Typography>
                            <Box
                                sx={{
                                    width: '7px',
                                    height: '7px',
                                    background: (theme: any) => {
                                        if (x.className === 'green') return theme.palette.custom.condition.one;
                                        if (x.className === 'yellow') return theme.palette.custom.condition.two;
                                        if (x.className === 'red') return theme.palette.custom.condition.three;
                                        return theme.palette.custom.condition.zero;
                                    },
                                    ml: 1,
                                    borderRadius: '50%'
                                }}
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default ConditionExplanation;
