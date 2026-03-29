import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Box, Typography } from '@mui/material';

const SingleBlockMobile: React.FC<{
    className?: string;
    height: React.ReactNode;
    hash: string;
    parentHash?: string;
    txs: string;
    time: string;
    proposer: React.ReactNode;
}> = ({ className, height, hash, parentHash, txs, time, proposer }) => {
    const { t } = useTranslation('blocks');

    return (
        <Box className={className} sx={{ my: 2 }}>
            <Box
                sx={(theme: any) => ({
                    mb: 2,
                    '& .label': {
                        mb: 1,
                        color: theme.palette.custom.fonts.fontThree
                    },
                    '& p.value': {
                        color: theme.palette.custom.fonts.fontTwo
                    },
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    }
                })}
            >
                <Typography variant="h4" className="label">
                    {t('height')}
                </Typography>
                {height}
            </Box>
            <Box
                sx={(theme: any) => ({
                    mb: 2,
                    '& .label': {
                        mb: 1,
                        color: theme.palette.custom.fonts.fontThree
                    },
                    '& p.value': {
                        color: theme.palette.custom.fonts.fontTwo
                    },
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    }
                })}
            >
                <Typography variant="h4" className="label">
                    {t('proposer')}
                </Typography>
                {proposer}
            </Box>
            <Box
                sx={(theme: any) => ({
                    mb: 2,
                    '& .label': {
                        mb: 1,
                        color: theme.palette.custom.fonts.fontThree
                    },
                    '& p.value': {
                        color: theme.palette.custom.fonts.fontTwo
                    },
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    }
                })}
            >
                <Typography variant="h4" className="label">
                    {t('hash')}
                </Typography>
                <Typography variant="body1" className="value">
                    {hash}
                </Typography>
            </Box>
            {parentHash && (
                <Box
                    sx={(theme: any) => ({
                        mb: 2,
                        '& .label': {
                            mb: 1,
                            color: theme.palette.custom.fonts.fontThree
                        },
                        '& p.value': {
                            color: theme.palette.custom.fonts.fontTwo
                        },
                        '& a': {
                            color: theme.palette.custom.fonts.highlight
                        }
                    })}
                >
                    <Typography variant="h4" className="label">
                        {t('parentHash')}
                    </Typography>
                    <Typography variant="body1" className="value">
                        {parentHash}
                    </Typography>
                </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', '& > div': { width: '50%' } }}>
                <Box
                    sx={(theme: any) => ({
                        mb: 2,
                        '& .label': {
                            mb: 1,
                            color: theme.palette.custom.fonts.fontThree
                        },
                        '& p.value': {
                            color: theme.palette.custom.fonts.fontTwo
                        },
                        '& a': {
                            color: theme.palette.custom.fonts.highlight
                        }
                    })}
                >
                    <Typography variant="h4" className="label">
                        {t('txs')}
                    </Typography>
                    <Typography variant="body1" className="value">
                        {txs}
                    </Typography>
                </Box>
                <Box
                    sx={(theme: any) => ({
                        mb: 2,
                        '& .label': {
                            mb: 1,
                            color: theme.palette.custom.fonts.fontThree
                        },
                        '& p.value': {
                            color: theme.palette.custom.fonts.fontTwo
                        },
                        '& a': {
                            color: theme.palette.custom.fonts.highlight
                        }
                    })}
                >
                    <Typography variant="h4" className="label">
                        {t('time')}
                    </Typography>
                    <Typography variant="body1" className="value">
                        {time}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SingleBlockMobile;
