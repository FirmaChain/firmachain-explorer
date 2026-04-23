import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SingleTransactionMobile: React.FC<{
    className?: string;
    block: React.ReactNode;
    hash: React.ReactNode;
    time: string;
    messages: string;
    type: any;
    result?: React.ReactNode;
}> = ({ className, block, hash, time, messages, type, result }) => {
    const { t } = useTranslation('transactions');
    const itemSx = (theme) => ({
        mb: 2,
        '& .label': {
            mb: 1,
            display: 'block',
            color: theme.palette.custom.fonts.fontThree
        },
        '& .value': {
            display: 'block',
            color: theme.palette.custom.fonts.fontTwo
        },
        '& p.value': {
            color: theme.palette.custom.fonts.fontTwo
        },
        '& a': {
            color: theme.palette.custom.fonts.highlight
        }
    });

    return (
        <Box className={className} sx={{ mb: 2, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', '& > div': { width: '50%' } }}>
                <Box sx={itemSx}>
                    <Typography variant="h4" className="label" component="span">
                        {t('block')}
                    </Typography>
                    {block}
                </Box>
                <Box sx={itemSx}>
                    <Typography variant="h4" className="label" component="span">
                        {t('type')}
                    </Typography>
                    <Typography variant="body1" className="value" component="span">
                        {type}
                    </Typography>
                </Box>
            </Box>
            <Box sx={itemSx}>
                <Typography variant="h4" className="label" component="span">
                    {t('hash')}
                </Typography>
                <Typography variant="body1" className="value" component="span">
                    {hash}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', '& > div': { width: '50%' } }}>
                {!!messages && (
                    <Box sx={itemSx}>
                        <Typography variant="h4" className="label" component="span">
                            {t('messages')}
                        </Typography>
                        <Typography variant="body1" className="value" component="span">
                            {messages}
                        </Typography>
                    </Box>
                )}
                <Box sx={itemSx}>
                    <Typography variant="h4" className="label" component="span">
                        {t('result')}
                    </Typography>
                    {result}
                </Box>
            </Box>
            <Box sx={itemSx}>
                <Typography variant="h4" className="label" component="span">
                    {t('time')}
                </Typography>
                <Typography variant="body1" className="value" component="span">
                    {time}
                </Typography>
            </Box>
        </Box>
    );
};

export default SingleTransactionMobile;
