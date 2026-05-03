import CancelCircleIcon from '@assets/icon-cancel-circle.svg?react';
import CheckCircleIcon from '@assets/icon-check-circle.svg?react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Result = ({ className, success }: { className?: string; success?: boolean }) => {
    const { t } = useTranslation('common');

    return (
        <Box
            className={className}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: (theme) => theme.palette.custom.fonts.fontTwo,
                '& svg': {
                    width: '16px',
                    height: '16px',
                    mr: 0.5,
                    fill: (theme) => (success ? theme.palette.custom.results.pass : theme.palette.custom.results.fail)
                }
            }}
        >
            {success ? (
                <>
                    <CheckCircleIcon />
                    <Typography variant="body1">{t('success')}</Typography>
                </>
            ) : (
                <>
                    <CancelCircleIcon />
                    <Typography variant="body1">{t('fail')}</Typography>
                </>
            )}
        </Box>
    );
};

export default Result;
